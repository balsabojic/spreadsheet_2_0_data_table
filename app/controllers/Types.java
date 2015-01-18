package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Collection;
import models.CollectionInstance;
import models.CollectionType;
import org.bson.types.ObjectId;
import play.mvc.Controller;
import play.mvc.Result;

public class Types extends Controller {

    public static Result list() {
        Collection collectionType = new CollectionType();
        return ok(collectionType.getJSON().toString());
    }

    public static Result index(String id) {
        Collection typeCol = new CollectionType();
        return ok(typeCol.findOne(new ObjectId(id)));
    }


    public static Result getInstances(String typeId, String from, String limit, String orderBy, String asc) {
        CollectionInstance instance = new CollectionInstance();
        try {
            int from_num = Integer.parseInt(from);
            int limit_num = Integer.parseInt(limit);
            int asc_num = Integer.parseInt(asc);
            String data = instance.getInstances(typeId, from_num, limit_num, orderBy, asc_num);
            return ok(data);
        } catch (NumberFormatException e) {
            return ok("Error in integer parsing, please try again");
        }
    }

    public static Result addTypeAttribute() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String id = json.findPath("type_id").asText();
            String name = json.findPath("attribute_name").asText();
            String value = json.findPath("attribute_type").asText();
            if(id == null || name == null || value == null) {
                return badRequest("Missing one of the parameters");
            } else {
                CollectionType type = new CollectionType();
                type.addTypeAttribute(id, name, value);
                return ok("Success " + id + " " + name + " " + value);
            }
        }
    }
}
