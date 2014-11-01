package controllers;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.mongodb.DBCursor;
import models.DB;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class Types extends Controller {
    public static Result index() {
        DBCursor cursor = DB.collection("Type").find();
        ArrayNode result = new ArrayNode(JsonNodeFactory.instance);
        while (cursor.hasNext()) {
            result.add(Json.parse(cursor.next().toString()));
        }
        return ok(result);
    }
}
