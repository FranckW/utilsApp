package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "AddPostItServlet", urlPatterns = { "/addPostIt" })
public class AddPostItServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -9069061598206535352L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("INSERT INTO POSTIT (TITLE, CONTENT) VALUES (\"" + title + "\",\"" + content + "\")");
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while adding post it to the database. " + e.getMessage());
		}
		out.flush();
	}

}
