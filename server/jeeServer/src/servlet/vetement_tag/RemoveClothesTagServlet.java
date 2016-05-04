package servlet.vetement_tag;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "RemoveClothesTagServlet", urlPatterns = { "/removeClothesTag" })
public class RemoveClothesTagServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -8793155010957804329L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String id = request.getParameter("id");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("DELETE FROM CLOTHES_TAG WHERE id = " + id);
			super.getPostIts();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while removing a couple clothes/tag from the database. " + e.getMessage());
		}
		out.flush();
	}

}
