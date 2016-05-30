package servlet.vetement_tag;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "SearchTagsByClothesServlet", urlPatterns = { "/searchByClothes" })
public class SearchTagsByClothesServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -608220286731571231L;

	@SuppressWarnings("unchecked")
	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String clothesId = request.getParameter("clothes_id");
		String query = "select * from tag where id in (SELECT tag_id FROM clothes_tag WHERE clothes_id = " + clothesId
				+ ")";
		try {
			Statement stmt = connection.createStatement();
			ResultSet resultSet = stmt.executeQuery(query);
			JSONArray ja = new JSONArray();
			while (resultSet.next()) {
				int tag_id = resultSet.getInt("id");
				String name = resultSet.getString("name");
				JSONObject jo = new JSONObject();
				jo.put("id", tag_id);
				jo.put("name", name);
				ja.add(jo);
			}
			JSONObject mainObj = new JSONObject();
			mainObj.put("clothesTag", ja);
			out.write(mainObj.toJSONString());
			resultSet.close();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while searching clothes by tag to the database. " + e.getMessage());
		}
	}
}
