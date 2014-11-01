import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import models.DB;
import play.Application;
import play.GlobalSettings;

import java.util.Arrays;

public class Global extends GlobalSettings {
    @Override
    public void onStart(Application app) {
        // To re-initialize the fake data you have to drop the mongodb database
        // In mongo shell type the following command:
        // > use spreadsheet
        // > db.dropDatabase()
        if (!DB.db().collectionExists("Type")) {
            initializeDB();
        }
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
        DBCollection types = DB.collection("Type");
        BasicDBObject courseType = new BasicDBObject("name", "Course");
        BasicDBObject personType = new BasicDBObject("name", "Person");
        types.insert(courseType);
        types.insert(personType);

        DBCollection instances = DB.collection("Instance");
        instances.insert(new BasicDBObject("type", courseType.get("_id"))
                .append("attributes",
                        Arrays.asList(
                                new BasicDBObject("title", "Practical Course Software Engineering for Business Information Systems"),
                                new BasicDBObject("content", "In this course, students realize in small teams an innovative web application of medium complexity in Java."))
                ));
        instances.insert(new BasicDBObject("type", courseType.get("_id")));
    }
}
