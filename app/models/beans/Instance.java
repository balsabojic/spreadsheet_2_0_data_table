package models.beans;

import java.util.ArrayList;
import java.util.HashMap;

public class Instance {

    private Object _id;
    private Object type;
    private ArrayList<HashMap<String, Object>>attributes;

    public Object get_id() {
        return _id;
    }

    public void set_id(Object _id) {
        this._id = _id;
    }

    public Object getType() {
        return type;
    }

    public void setType(Object type) {
        this.type = type;
    }

    public ArrayList<HashMap<String, Object>> getAttributes() {
        return attributes;
    }

    public void setAttributes(ArrayList<HashMap<String, Object>> attributes) {
        this.attributes = attributes;
    }

    public String toString() {
        return _id + " " + type + " " + attributes;
    }
}
