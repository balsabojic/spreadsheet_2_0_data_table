import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import models.DB;
import play.Application;
import play.GlobalSettings;

import java.util.Arrays;

public class Global extends GlobalSettings {
    @Override
    public void onStart(Application app) {
        // So far I think that this function is not needed
        // but it can be of use, if we want to use this class to increase the performance. For example if we want to load all the data before the app is started
    }
}
