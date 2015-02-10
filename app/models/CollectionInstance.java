package models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.mongodb.*;
import models.beans.Instance;
import models.beans.UndoData;
import org.bson.types.ObjectId;
import play.libs.Json;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class CollectionInstance extends Collection {

    private DBCollection instances;

    public CollectionInstance() {
        super("Instance");
        instances = db.getMongoDB().getCollection(name);
    }

    @Override
    public String parseJSON(String json) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayList<Instance> list = new ArrayList<Instance>();
        try {
            list = mapper.readValue(json, new TypeReference<ArrayList<Instance>>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

        String new_json = "";

        ArrayList<Instance> new_list = new ArrayList<Instance>();
        for (Instance instance: list) {
            HashMap<String, String> hash_id = (HashMap<String, String>) instance.get_id();
            String id_value = hash_id.get("$oid");

            HashMap<String, String> hash_type = (HashMap<String, String>) instance.getType();
            String type_value = hash_type.get("$oid");

            ArrayList<HashMap<String, Object>> attributes = new ArrayList<HashMap<String, Object>>();
            HashMap<String, Object> reference_data = new HashMap<String, Object>();
            for (HashMap<String, Object> hash_attribute: instance.getAttributes()) {
                if (hash_attribute.get("value") != null && hash_attribute.get("value") instanceof HashMap) {
                    HashMap<String, Object> temp = (HashMap<String, Object>) hash_attribute.get("value");
                    reference_data.put("ref_id", temp.get("$oid"));
                }
                if (hash_attribute.get("display") != null) {
                    String display_name = (String) hash_attribute.get("display");
                    reference_data.put("display", display_name);
                    hash_attribute.put("value", reference_data);
                    attributes.add(hash_attribute);
                    reference_data = new HashMap<String, Object>();
                }
                else {
                    attributes.add(hash_attribute);
                }
            }

            Instance new_instance = new Instance();
            new_instance.set_id(id_value);
            new_instance.setType(type_value);
            new_instance.setAttributes(attributes);

            new_list.add(new_instance);
        }

        try {
            new_json = mapper.writeValueAsString(new_list);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return new_json;
    }

    public String getInstances(String type_id, int from, int limit, String orderBy, int asc, String filter_value) {
        ObjectId id = new ObjectId(type_id);
        BasicDBObject query = new BasicDBObject("type", id);
        DBCursor cursor = instances.find(query);
        ArrayNode result = new ArrayNode(JsonNodeFactory.instance);
        String json = "";
        ArrayList<DBObject> objects = new ArrayList<DBObject>();
        while (cursor.hasNext()) {
            DBObject object_temp = cursor.next();
            if (filter_value != "") {
                if (isFiltered(object_temp, orderBy, filter_value)) {
                    objects.add(object_temp);
                }
            }
            else {
                objects.add(object_temp);
            }
        }
        if (!"".equals(orderBy)) {
            for (int i = 1; i < objects.size(); i++) {
                for (int j = 0; j < objects.size() - 1; j++) {
                    DBObject obj1 = objects.get(i);
                    DBObject obj2 = objects.get(j);
                    String value1 = getValue(obj1, orderBy);
                    String value2 = getValue(obj2, orderBy);
                    if (asc == 1) {
                        if (value1.compareTo(value2) < 0) {
                            objects.set(i, obj2);
                            objects.set(j, obj1);
                        }
                    } else if (asc == 0) {
                        if (value1.compareTo(value2) > 0) {
                            objects.set(i, obj2);
                            objects.set(j, obj1);
                        }
                    }

                }
            }
            if (from == 0 && limit == 0) {
                for (DBObject obj : objects) {
                    result.add(Json.parse(obj.toString()));
                }
            } else {
                int counter = 1;
                for (DBObject obj : objects) {
                    if (counter >= from && limit != 0) {
                        result.add(Json.parse(obj.toString()));
                    }
                    if (counter == (from + limit - 1) || limit == 0) break;
                    counter++;
                }
            }
        }
        else {
            if (from == 0 && limit == 0) {
                for (DBObject obj : objects) {
                    result.add(Json.parse(obj.toString()));
                }
            } else {
                int counter = 1;
                for (DBObject obj : objects) {
                    if (counter >= from && limit != 0) {
                        result.add(Json.parse(obj.toString()));
                    }
                    if (counter == (from + limit - 1) || limit == 0) break;
                    counter++;
                }
            }
        }

        json = parseJSON(result.toString());
        return json;
    }

    private boolean isFiltered(DBObject object, String filter_name, String filter_value) {
        BasicDBList attributes = (BasicDBList) object.get("attributes");
        String value = "";
        if (attributes != null) {
            for (Object attribute : attributes) {
                if (attribute != null) {
                    HashMap<String, Object> attribute_hash_map = (HashMap<String, Object>) attribute;
                    if (attribute_hash_map != null && attribute_hash_map.get("name").equals(filter_name)) {
                        value = attribute_hash_map.get("value").toString();
                        if (value.equals(filter_value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
        }
        return false;
    }

    private String getValue(DBObject obj1, String orderBy) {
        BasicDBList attributes = (BasicDBList) obj1.get("attributes");
        String value = "";
        if (attributes != null) {
            for (Object attribute : attributes) {
                if (attribute != null) {
                    HashMap<String, Object> attribute_hash_map = (HashMap<String, Object>) attribute;
                    if (attribute_hash_map != null && attribute_hash_map.get("name").equals(orderBy)) {
                        value = attribute_hash_map.get("value").toString();
                    }
                }
            }
        }
        return value;
    }

    public void updateInstanceAttribute(String instance_id, String attribute_name, String value) {
        ObjectId id = new ObjectId(instance_id);
        BasicDBObject query = new BasicDBObject("_id", id);
        DBCursor cursor = db.getMongoDB().getCollection("Instance").find(query);
        ArrayNode result = new ArrayNode(JsonNodeFactory.instance);
        while (cursor.hasNext()) {
            DBObject instance = cursor.next();
            BasicDBList attributes = (BasicDBList) instance.get("attributes");
            int i = 0;
            boolean found = false;
            if (attributes != null) {
                for (Object attribute: attributes) {
                    if (attribute != null) {
                        HashMap<String, Object> attribute_hash_map = (HashMap<String, Object>) attribute;
                        if (attribute_hash_map != null && attribute_hash_map.get("name").equals(attribute_name)) {
                            if (isReferenceAttribute(instance_id, attribute_name)) {
                                String name = findReferenceNameById(value);
                                attribute_hash_map.put("value", new ObjectId(value));
                                attribute_hash_map.put("display", name);
                            }
                            else {
                                attribute_hash_map.put("value", value);
                            }
                            attributes.put(i, attribute_hash_map);
                            instance.put("attributes", attributes);
                            instances.save(instance);
                            found = true;
                        }
                    }
                    i++;
                }
                if (found == false) {
                    HashMap<String, Object> attribute_hash_map = new HashMap<String, Object>();
                    if (isReferenceAttribute(instance_id, attribute_name)) {
                        attribute_hash_map.put("name", attribute_name);
                        String name = findReferenceNameById(value);
                        attribute_hash_map.put("value", new ObjectId(value));
                        attribute_hash_map.put("display", name);
                    }
                    else {
                        attribute_hash_map.put("name", attribute_name);
                        attribute_hash_map.put("value", value);
                    }
                    attributes.put(i, attribute_hash_map);
                    instance.put("attributes", attributes);
                    instances.save(instance);
                }
            }
        }
    }

    public boolean isReferenceAttribute(String instance_id, String attribute_name) {
        BasicDBObject query_type = new BasicDBObject("_id", new ObjectId(instance_id));
        DBCursor cursor_type = db.getMongoDB().getCollection("Instance").find(query_type);
        ObjectId typeId = null;
        if (cursor_type.hasNext()) {
            DBObject instance = cursor_type.next();
            typeId = (ObjectId) instance.get("type");
        }
        if (typeId != null) {
            BasicDBObject query = new BasicDBObject("_id", typeId);
            DBCursor cursor = db.getMongoDB().getCollection("Type").find(query);
            while (cursor.hasNext()) {
                DBObject instance = cursor.next();
                BasicDBList attributes = (BasicDBList) instance.get("attributes");
                if (attributes != null) {
                    for (Object attribute : attributes) {
                        if (attribute != null) {
                            HashMap<String, Object> attribute_hash_map = (HashMap<String, Object>) attribute;
                            if (attribute_hash_map != null && attribute_hash_map.get("type").equals("reference") && attribute_hash_map.get("name").equals(attribute_name)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    private String findReferenceNameById(String ref_id) {
        ObjectId id = new ObjectId(ref_id);
        BasicDBObject query = new BasicDBObject("_id", id);
        DBCursor cursor = db.getMongoDB().getCollection("Instance").find(query);
        while (cursor.hasNext()) {
            DBObject instance = cursor.next();
            BasicDBList attributes = (BasicDBList) instance.get("attributes");
            String value = "";
            if (attributes != null) {
                for (Object attribute : attributes) {
                    if (attribute != null) {
                        HashMap<String, Object> attribute_hash_map = (HashMap<String, Object>) attribute;
                        if (attribute_hash_map != null && attribute_hash_map.get("name").equals("name")) {
                            value = attribute_hash_map.get("value").toString();
                        }
                    }
                }
            }
            return value;
        }
        return "";
    }

    public String filter(String type_id, String filter_name, String filter_value) {
        return "";
    }

    public void addNewInstance(String type_id, String attribute_name, String value) {
        HashMap<String, String> attribute = new HashMap<String, String>();
        attribute.put("name", attribute_name);
        attribute.put("value", value);
        BasicDBObject instance = new BasicDBObject();
        instance.append("type", new ObjectId(type_id))
                .append("attributes",
                        Arrays.asList(
                                new BasicDBObject(attribute)
                        ));
        instances.insert(instance);
    }

    public void deleteInstance(String instance_id) {
        ObjectId id = new ObjectId(instance_id);
        BasicDBObject query = new BasicDBObject("_id", id);
        instances.remove(query);
    }

    public String getReferenceData(String type_id, String attribute_name) {
        ObjectId id = new ObjectId(type_id);
        BasicDBObject query = new BasicDBObject("type", id);
        DBCursor cursor = db.getMongoDB().getCollection("Instance").find(query);
        ArrayNode result = new ArrayNode(JsonNodeFactory.instance);
        ArrayList<DBObject> objects = new ArrayList<DBObject>();
        while (cursor.hasNext()) {
            DBObject instance = cursor.next();
            BasicDBObject temp = new BasicDBObject();
            ObjectId id_obj = (ObjectId) instance.get("_id");
            String id_str = id_obj.toString();
            temp.append("id", id_str);
            BasicDBList attributes = (BasicDBList) instance.get("attributes");
            if (attributes != null) {
                for (Object attribute : attributes) {
                    if (attribute != null) {
                        HashMap<String, Object> attribute_hash_map = (HashMap<String, Object>) attribute;
                        if (attribute_hash_map != null && attribute_hash_map.get("name").equals(attribute_name)) {
                            temp.append(attribute_name, attribute_hash_map.get("value"));
                        }
                    }
                }
            }
            objects.add(temp);
        }
        for (DBObject obj : objects) {
            result.add(Json.parse(obj.toString()));
        }
        return result.toString();
    }
}
