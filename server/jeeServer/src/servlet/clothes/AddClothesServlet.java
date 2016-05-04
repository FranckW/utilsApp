package servlet.clothes;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "AddClothesServlet", urlPatterns = { "/addClothes" })
public class AddClothesServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 1999534269051022225L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String path = request.getParameter("path");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("INSERT INTO CLOTHES (PATH) VALUES (\"" + path + "\")");
			super.getClothes();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while adding clothes to the database. " + e.getMessage());
		}
		out.flush();
	}

}
