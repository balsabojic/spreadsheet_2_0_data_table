package controllers;

import models.Collection;
import models.CollectionType;
import play.mvc.Controller;
import play.mvc.Result;

public class Types extends Controller {

    public static Result index() {
        Collection collectionType = new CollectionType();
        return ok(collectionType.getJSON().toString());
    }
}
