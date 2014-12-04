package controllers;

import models.CollectionInstance;
import play.mvc.Controller;

public class Instances extends Controller{

    public static void updateInstanceAttribute(String id, String name, String value) {
        CollectionInstance instance = new CollectionInstance();
        instance.updateInstanceAttribute(id, name, value);
    }

    public static void addNewInstance(String typeId, String attributeName, String attributeValue) {
        CollectionInstance instance = new CollectionInstance();
        instance.addNewInstance(typeId, attributeName, attributeValue);
    }

    public static void deleteInstance(String instance_id) {
        CollectionInstance instance = new CollectionInstance();
        instance.deleteInstance(instance_id);
    }
 }
