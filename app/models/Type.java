package models;

import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.HashMap;

public class Type {

    private Object _id;
    private Object name;
    private ArrayList<HashMap<String, String>> attributes;

    public Object get_id() {
        return _id;
    }

    public void set_id(Object _id) {
        this._id = _id;
    }

    public Object getName() {
        return name;
    }

    public void setName(Object name) {
        this.name = name;
    }

    public ArrayList<HashMap<String, String>> getAttributes() {
        return attributes;
    }

    public void setAttributes(ArrayList<HashMap<String, String>> attributes) {
        this.attributes = attributes;
    }

    public String toString() {
        return _id + " " + name + " " + attributes;
    }
}
