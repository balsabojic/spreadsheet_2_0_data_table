package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.CollectionInstance;
import play.mvc.Controller;
import play.mvc.Result;

public class Instances extends Controller{

    public static Result addInstace() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String type = json.findPath("type_id").asText();
            String name = json.findPath("attribute_name").asText();
            String value = json.findPath("attribute_value").asText();
            if(type == null || name == null || value == null) {
                return badRequest("Missing one of the parameters");
            } else {
                CollectionInstance instance = new CollectionInstance();
                instance.addNewInstance(type, name, value);
                return ok("Success " + type + " " + name + " " + value);
            }
        }
    }

    public static Result updateInstance() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String id = json.findPath("instance_id").asText();
            String name = json.findPath("attribute_name").asText();
            String value = json.findPath("attribute_value").asText();
            if(id == null || name == null || value == null) {
                return badRequest("Missing one of the parameters");
            } else {
                CollectionInstance instance = new CollectionInstance();
                instance.updateInstanceAttribute(id, name, value);
                return ok("Success " + id + " " + name + " " + value);
            }
        }
    }

    public static void deleteInstance(String instance_id) {
        CollectionInstance instance = new CollectionInstance();
        instance.deleteInstance(instance_id);
    }

    public static Result undo() {
        CollectionInstance instance = new CollectionInstance();
        instance.undo();
        return ok("Success");
    }

    public static Result redo() {
        CollectionInstance instance = new CollectionInstance();
        instance.redo();
        return ok("Success");
    }
 }
