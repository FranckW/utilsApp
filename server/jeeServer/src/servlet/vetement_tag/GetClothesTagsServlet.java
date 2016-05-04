package servlet.vetement_tag;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "GetClothesTagsServlet", urlPatterns = { "/clothestags" })
public class GetClothesTagsServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -5297096215606673562L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		try {
			super.getClothesTags();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while retrieving clothes and tag from the database. " + e.getMessage());
		}
		out.flush();
	}

}
