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
        
        BasicDBObject instance_organizer1 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer1.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Thomas"),
                new BasicDBObject("name", "address").append("value", "Example street")
        ));
        instances.insert(instance_organizer1);
        
        BasicDBObject instance_course1 = new BasicDBObject("type", type_course.get("_id"));
        instance_course1.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Software Engineering"),
                new BasicDBObject("name", "content").append("value", "Softwaring Engineering"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer1.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "29-11-2014"),
                new BasicDBObject("name", "num_students").append("value", "200"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course1);
        
        BasicDBObject instance_organizer2 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer2.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Millber"),
                new BasicDBObject("name", "address").append("value", "Example street")
        ));
        instances.insert(instance_organizer2);
        
        BasicDBObject instance_course2 = new BasicDBObject("type", type_course.get("_id"));
        instance_course2.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Software Architecture"),
                new BasicDBObject("name", "content").append("value", "Softwaring Architecture"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer2.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "19-11-2014"),
                new BasicDBObject("name", "num_students").append("value", "200"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course2);
        
        BasicDBObject instance_organizer3 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer3.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Armstrong"),
                new BasicDBObject("name", "address").append("value", "Example street")
        ));
        instances.insert(instance_organizer3);
        
        BasicDBObject instance_course3 = new BasicDBObject("type", type_course.get("_id"));
        instance_course3.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Design Pattern"),
                new BasicDBObject("name", "content").append("value", "Basic Object Oriented Design Pattern"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer3.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "19-11-2014"),
                new BasicDBObject("name", "num_students").append("value", "200"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course3);
        
        BasicDBObject instance_organizer4 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer4.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Muller"),
                new BasicDBObject("name", "address").append("value", "Example street")
        ));
        instances.insert(instance_organizer4);
        
        BasicDBObject instance_course4 = new BasicDBObject("type", type_course.get("_id"));
        instance_course4.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Computer Networks"),
                new BasicDBObject("name", "content").append("value", "Basic Computer Networks"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer4.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "09-12-2014"),
                new BasicDBObject("name", "num_students").append("value", "200"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course4);
        
        
        BasicDBObject instance_organizer5 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer5.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Arohnson"),
                new BasicDBObject("name", "address").append("value", "Example street 5")
        ));
        instances.insert(instance_organizer5);
        
        BasicDBObject instance_course5 = new BasicDBObject("type", type_course.get("_id"));
        instance_course5.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Game Theory"),
                new BasicDBObject("name", "content").append("value", "Basic Game Theory"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer5.get("_id")),
                new BasicDBObject("name", "category").append("value", "Praktikum"),
                new BasicDBObject("name", "date_start").append("value", "09-04-2014"),
                new BasicDBObject("name", "num_students").append("value", "20"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course5);
        
        BasicDBObject instance_organizer6 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer6.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Johnson"),
                new BasicDBObject("name", "address").append("value", "Example street 6")
        ));
        instances.insert(instance_organizer6);
        
        BasicDBObject instance_course6 = new BasicDBObject("type", type_course.get("_id"));
        instance_course6.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Computer Vision"),
                new BasicDBObject("name", "content").append("value", "Computer Vision"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer6.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "09-04-2014"),
                new BasicDBObject("name", "num_students").append("value", "20"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course6);
        
        BasicDBObject instance_organizer7 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer7.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Rooney"),
                new BasicDBObject("name", "address").append("value", "Example street 7")
        ));
        instances.insert(instance_organizer7);
        
        BasicDBObject instance_course7 = new BasicDBObject("type", type_course.get("_id"));
        instance_course7.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Neural Networks"),
                new BasicDBObject("name", "content").append("value", "Neural Networks"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer7.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "09-04-2014"),
                new BasicDBObject("name", "num_students").append("value", "20"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course7);
        
        BasicDBObject instance_organizer8 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer8.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Rooney"),
                new BasicDBObject("name", "address").append("value", "Example street 7")
        ));
        instances.insert(instance_organizer8);
        
        BasicDBObject instance_course8 = new BasicDBObject("type", type_course.get("_id"));
        instance_course8.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Artificial Intelligence"),
                new BasicDBObject("name", "content").append("value", "Artificial Intelligence"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer8.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "09-04-2014"),
                new BasicDBObject("name", "num_students").append("value", "20"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course8);
        
        BasicDBObject instance_organizer9 = new BasicDBObject("type", type_organizer.get("_id"));
        instance_organizer9.append("attributes", Arrays.asList(
                new BasicDBObject("name", "name").append("value", "Prof. Rooney"),
                new BasicDBObject("name", "address").append("value", "Example street 7")
        ));
        instances.insert(instance_organizer9);
        
        BasicDBObject instance_course9 = new BasicDBObject("type", type_course.get("_id"));
        instance_course9.append("attributes", Arrays.asList(
        		new BasicDBObject("name", "title").append("value", "Security Engineering"),
                new BasicDBObject("name", "content").append("value", "Security Engineering"),
                new BasicDBObject("name", "organizer").append("value", instance_organizer9.get("_id")),
                new BasicDBObject("name", "category").append("value", "Lecture"),
                new BasicDBObject("name", "date_start").append("value", "09-04-2014"),
                new BasicDBObject("name", "num_students").append("value", "20"),
                new BasicDBObject("name", "hasLab").append("value", "true")
        ));
        instances.insert(instance_course9);
        
    }

    protected com.mongodb.DB getMongoDB() {
        return mongoDB;
    }
}
