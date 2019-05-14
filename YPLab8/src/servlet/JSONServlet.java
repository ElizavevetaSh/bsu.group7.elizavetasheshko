package servlet;

        import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/check")
public class JSONServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            JSONObject object = new JSONObject();
            object.put("success", "true");
            String str = object.toString();
            resp.getWriter().write(str);
        } catch ( org.json.JSONException e) {
            e.printStackTrace();
        }
    }
}