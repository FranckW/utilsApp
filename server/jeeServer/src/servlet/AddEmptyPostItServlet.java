package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "AddEmptyPostItServlet", urlPatterns = { "/addEmptyPostIt" })
public class AddEmptyPostItServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 1447729599431979329L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("INSERT INTO POSTIT (TITLE, CONTENT) VALUES (\"Titre\",\"Contenu\")");
			super.getPostIts();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while adding an empty post it to the database. " + e.getMessage());
		}
		out.flush();
	}

}
