package controllers;

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

    public static Result getInstaceByType(String typeId) {
        CollectionInstance instances = new CollectionInstance();
        String data = instances.findInstanceByType(typeId);
        return ok(data);
    }

    public static Result findInstanceByTypeWithLimit(String typeId, String from, String limit) {
        CollectionInstance instance = new CollectionInstance();
        try {
            int from_num = Integer.parseInt(from);
            int limit_num = Integer.parseInt(limit);
            String data = instance.findInstanceByTypeWithLimit(typeId, from_num, limit_num);
            return ok(data);
        } catch (NumberFormatException e) {
            return ok("Error in integer parsing, please try again");
        }
    }

    public static void addTypeAttribute() {
        CollectionType type = new CollectionType();
        type.addTypeAttribute("547ba3d14a711799aa325e4e", "room", "integer");
    }
}
