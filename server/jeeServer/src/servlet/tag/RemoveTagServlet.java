package servlet.tag;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "RemoveTagServlet", urlPatterns = { "/removeTag" })
public class RemoveTagServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 8838812029714906693L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String id = request.getParameter("id");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("DELETE FROM TAG WHERE id = " + id);
			super.getPostIts();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while removing a tag from the database. " + e.getMessage());
		}
		out.flush();
	}

}
