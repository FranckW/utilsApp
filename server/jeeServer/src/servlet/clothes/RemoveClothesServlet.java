package servlet.clothes;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "RemoveClothesServlet", urlPatterns = { "/removeClothes" })
public class RemoveClothesServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 7666377796437230821L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String id = request.getParameter("id");
		String path = request.getParameter("path");
		new File("C:/Users/franc/Documents/NetBeansProjects/utilsApp/app/img/clothes/" + path).delete();
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("DELETE FROM CLOTHES WHERE id = " + id);
			super.getClothes();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while removing clothes from the database. " + e.getMessage());
		}
		out.flush();
	}

}
