package servlet.tag;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "GetTagsServlet", urlPatterns = { "/tags" })
public class GetTagsServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 6788192002005071508L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		try {
			super.getTags();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while retrieving post its from the database. " + e.getMessage());
		}
		out.flush();
	}

}
