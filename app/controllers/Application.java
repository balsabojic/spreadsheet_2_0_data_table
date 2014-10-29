package controllers;

import play.api.mvc.Action;
import play.api.mvc.AnyContent;
import play.mvc.Controller;

public class Application extends Controller {

    public static Action<AnyContent> index(String any) {
        return Assets.at("/public", "index.html", false);
    }

}
