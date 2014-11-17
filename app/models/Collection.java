package models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import org.bson.types.ObjectId;
import play.libs.Json;

public abstract class Collection {

    private String name;
    private DB db;

    public Collection(String name) {
        this.name = name;
        db = DB.getInstance();
    }

    public ArrayNode getJSON() {
        DBCursor cursor = db.getMongoDB().getCollection(this.name).find();
        ArrayNode result = new ArrayNode(JsonNodeFactory.instance);
        while (cursor.hasNext()) {
            result.add(Json.parse(cursor.next().toString()));
        }
        return result;
    }

    public abstract String parseJSON(String json);

    public JsonNode findOne(ObjectId id) {
        BasicDBObject query = new BasicDBObject("_id", id);
        try (DBCursor cursor = db.getMongoDB().getCollection(this.name).find(query)) {
            if (cursor.hasNext()) {
                return Json.parse(cursor.next().toString());
            }
        }
        return null;
    }
}
