package servlet.postit;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "UpdatePostItTitleServlet", urlPatterns = { "/updatePostItTitle" })
public class UpdatePostItTitleServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -8998618045287511326L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("UPDATE POSTIT SET title = \"" + title + "\" WHERE id = " + id);
			super.getPostIts();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while updating post it title in the database. " + e.getMessage());
		}
		out.flush();
	}

}
