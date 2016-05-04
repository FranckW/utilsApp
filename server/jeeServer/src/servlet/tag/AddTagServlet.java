package servlet.tag;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "AddTagServlet", urlPatterns = { "/addTag" })
public class AddTagServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -6712775764595927637L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String name = request.getParameter("name");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("INSERT INTO TAG (NAME) VALUES (\"" + name + "\")");
			super.getTags();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while adding a tag to the database. " + e.getMessage());
		}
		out.flush();
	}

}
