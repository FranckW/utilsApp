package servlet.postit;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "GetPostItServlet", urlPatterns = { "/postIt" })
public class GetPostItServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 3952657122240696821L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		try {
			super.getPostIts();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while retrieving post its from the database. " + e.getMessage());
		}
		out.flush();
	}

}
