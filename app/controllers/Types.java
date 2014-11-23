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
}
