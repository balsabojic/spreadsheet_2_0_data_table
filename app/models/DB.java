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
        DBCollection types = mongoDB.getCollection("Type");
        DBCollection instances = mongoDB.getCollection("Instance");

        // Types
        BasicDBObject type_organizer = new BasicDBObject("name", "organizer");
        type_organizer.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("type", "string"),
                new BasicDBObject("name", "address").append("type", "string")
        ));
        types.insert(type_organizer);

        BasicDBObject type_course = new BasicDBObject("name", "course");
        type_course.append("attributes", Arrays.asList(
                new BasicDBObject("name", "title").append("type", "string"),
                new BasicDBObject("name", "content").append("type", "string"),
                new BasicDBObject("name", "organizer").append("type", "reference"),
                new BasicDBObject("name", "category").append("type", "string"),
                new BasicDBObject("name", "date_start").append("type", "date"),
                new BasicDBObject("name", "num_students").append("type", "string"),
                new BasicDBObject("name", "has_lab").append("type", "boolean")
        ));
        types.insert(type_course);

        // Instances
        BasicDBObject instance_organizer = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Matthes"),
                new BasicDBObject("name", "address").append("value", "Example street")
        ));
        instances.insert(instance_organizer);

        BasicDBObject instance_course = new BasicDBObject("type", type_course.get("_id"));
        instance_course.append("attributes", Arrays.asList(
                new BasicDBObject("name", "title").append("value", "Practical Course Software Engineering for Business Information Systems"),
                new BasicDBObject("name", "content").append("value", "In this course, students realize in small teams an innovative web application of medium complexity in Java."),
                new BasicDBObject("name", "organizer").append("value", instance_organizer.get("_id")),
                new BasicDBObject("name", "category").append("value", "Practical course"),
                new BasicDBObject("name", "date_start").append("value", "25-10-2014"),
                new BasicDBObject("name", "num_students").append("value", "40"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course);
    }

    protected com.mongodb.DB getMongoDB() {
        return mongoDB;
    }
}
