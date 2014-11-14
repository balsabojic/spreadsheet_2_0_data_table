package models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class CollectionInstance extends Collection {

    public CollectionInstance() {
        super("Instance");
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
            for (HashMap<String, Object> hash_attribute: instance.getAttributes()) {
                if (hash_attribute.get("value") != null && hash_attribute.get("value") instanceof HashMap) {
                    HashMap<String, Object> temp = (HashMap<String, Object>) hash_attribute.get("value");
                    hash_attribute.put("value", temp.get("$oid"));
                    attributes.add(hash_attribute);
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
}
