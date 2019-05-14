
package servlet;

        import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/get")
public class NameServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");
        PrintWriter writer = resp.getWriter();
        String name = req.getParameter("name");
        if (name.length() <= 100) {
            try {
                writer.println("<h2>Name is " + name + "</h2>");
            } finally {
                writer.close();
            }

        }
    }
}