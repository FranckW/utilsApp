package servlet.clothes;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "GetClothesServlet", urlPatterns = { "/clothes" })
public class GetClothesServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -2304758321448767327L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		try {
			super.getClothes();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while retrieving clothes from the database. " + e.getMessage());
		}
		out.flush();
	}

}
