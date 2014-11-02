package models;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import play.Play;

import java.net.UnknownHostException;
import java.util.Arrays;

public class DB {
    private static DB instance = null;

    private static final String connUri = Play.application().configuration().getString("mongodb.host");
    private static final String defaultDB = Play.application().configuration().getString("mongodb.default");

    private MongoClient mongoClient;
    private com.mongodb.DB mongoDB;

    private DB() {
        if (mongoClient == null) {
            MongoClientURI uri = new MongoClientURI(connUri);
            try {
                mongoClient = new MongoClient(uri);
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }
        if (mongoDB == null) {
            mongoDB = mongoClient.getDB(defaultDB);
        }
        if (!mongoDB.collectionExists("Type")) {
            initializeDB();
        }
    }

    public static DB getInstance() {
        if (instance == null) {
            instance = new DB();
        }
        return instance;
    }

    /**
     * Initialize fake data in mongodb.
     * This function will be called whenever the app sees now collections in
     * the default mongodb database. When this function changed, please manually
     * drop your mongodb so the data will be re-generated again.
     *
     * To drop a database in mongodb, type following command in mongodb:
     * > use spreadsheet
     * > db.dropDatabase()
     */
    private void initializeDB() {
        System.out.println("Initialize test data");
        DBCollection types = mongoDB.getCollection("Type");
        BasicDBObject courseType = new BasicDBObject("name", "Course");
        BasicDBObject personType = new BasicDBObject("name", "Person");
        types.insert(courseType);
        types.insert(personType);

        DBCollection instances = mongoDB.getCollection("Instance");
        instances.insert(new BasicDBObject("type", courseType.get("_id"))
                .append("attributes",
                        Arrays.asList(
                                new BasicDBObject("title", "Practical Course Software Engineering for Business Information Systems"),
                                new BasicDBObject("content", "In this course, students realize in small teams an innovative web application of medium complexity in Java."))
                ));
        instances.insert(new BasicDBObject("type", courseType.get("_id")));
    }

    protected com.mongodb.DB getMongoDB() {
        return mongoDB;
    }
}
