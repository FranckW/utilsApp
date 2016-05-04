package servlet.vetement_tag;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "AddClothesTagServlet", urlPatterns = { "/addClothesTag" })
public class AddClothesTagServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -9214619217233237899L;

	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String clothes_id = request.getParameter("clothes_id");
		String tag_id = request.getParameter("tag_id");
		try {
			Statement stmt = connection.createStatement();
			stmt.executeUpdate(
					"INSERT INTO CLOTHES_TAG (CLOTHES_ID, TAG_ID) VALUES (\"" + clothes_id + "\",\"" + tag_id + "\")");
			super.getClothesTags();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while adding a couple clothes/tag to the database. " + e.getMessage());
		}
		out.flush();
	}
}
