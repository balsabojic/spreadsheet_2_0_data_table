package controllers;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.mongodb.DBCursor;
import models.Collection;
import models.CollectionType;
import models.DB;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class Types extends Controller {

    public static Result index() {
        Collection collectionType = new CollectionType();
        return ok(collectionType.getJSON().toString());
    }
}
