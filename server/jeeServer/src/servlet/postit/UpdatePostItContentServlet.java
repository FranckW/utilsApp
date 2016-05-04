package servlet.postit;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "UpdatePostItContentServlet", urlPatterns = { "/updatePostItContent" })
public class UpdatePostItContentServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 6892698166075576528L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String id = request.getParameter("id");
		String content = request.getParameter("content");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("UPDATE POSTIT SET content = \"" + content + "\" WHERE id = " + id);
			super.getPostIts();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while updating post it content in the database. " + e.getMessage());
		}
		out.flush();
	}

}
