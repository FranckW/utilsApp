package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "UpdatePostItServlet", urlPatterns = { "/updatePostIt" })
public class UpdatePostItServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 8721688441980199538L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate(
					"UPDATE POSTIT SET title = \"" + title + "\", content = \"" + content + "\" WHERE id = " + id);
			super.getPostIts();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while updating post it in the database. " + e.getMessage());
		}
		out.flush();
	}

}
