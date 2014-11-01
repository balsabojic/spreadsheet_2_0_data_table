package models;

import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import play.Play;

import java.net.UnknownHostException;

public class DB {
    protected static MongoClient _mongoClient;
    protected static com.mongodb.DB _db;

    public static MongoClient mongoClient() {
        if (_mongoClient == null) {
            String connUri = Play.application().configuration().getString("mongodb.host");
            MongoClientURI uri = new MongoClientURI(connUri);
            try {
                _mongoClient = new MongoClient(uri);
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }

        return _mongoClient;
    }

    public static com.mongodb.DB db() {
        if (_db == null) {
            String defaultDB = Play.application().configuration().getString("mongodb.default");
            _db = mongoClient().getDB(defaultDB);
        }

        return _db;
    }

    public static DBCollection collection(String name) {
        return db().getCollection(name);
    }
}
