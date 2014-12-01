package models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.*;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class CollectionType extends Collection {

    private DBCollection types;

    public CollectionType() {
        super("Type");
        types = db.getMongoDB().getCollection(name);
    }

    @Override
    public String parseJSON(String json) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayList<Type> list = new ArrayList<Type>();
        try {
            list = mapper.readValue(json, new TypeReference<ArrayList<Type>>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

        String new_json = "";

        ArrayList<Type> new_list = new ArrayList<Type>();
        for (Type type : list) {
            HashMap<String, String> hash_id = (HashMap<String, String>) type.get_id();
            String id_value = hash_id.get("$oid");

            Object type_name = type.getName();

            ArrayList<HashMap<String, String>> attributes = new ArrayList<HashMap<String, String>>();
            for (HashMap<String, String> hash_attribute : type.getAttributes()) {
                attributes.add(hash_attribute);
            }

            Type new_type = new Type();
            new_type.set_id(id_value);
            new_type.setName(type_name);
            new_type.setAttributes(attributes);

            new_list.add(new_type);
        }

        try {
            new_json = mapper.writeValueAsString(new_list);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return new_json;
    }

    public void addTypeAttribute(String type_id, String attribute_name, String attribute_type) {
        DBCollection types = db.getMongoDB().getCollection("Type");
        ObjectId id = new ObjectId(type_id);
        BasicDBObject query = new BasicDBObject("_id", id);
        DBCursor cursor = types.find(query);
        if (cursor.hasNext()) {
            DBObject type = cursor.next();
            BasicDBList attributes = (BasicDBList) type.get("attributes");
            HashMap<String, String> attribute = new HashMap<String, String>();
            attribute.put("name", attribute_name);
            attribute.put("type", attribute_type);
            attributes.add(attribute);
            type.put("attributes", attributes);
            types.save(type);
        }
    }
}
