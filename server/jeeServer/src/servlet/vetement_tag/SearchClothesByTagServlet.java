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

@WebServlet(name = "SearchClothesByTagServlet", urlPatterns = { "/searchByTags" })
public class SearchClothesByTagServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = -7583655711925769178L;

	@SuppressWarnings("unchecked")
	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		String[] tagIds = request.getParameterValues("tagId");
		if (tagIds.length == 0) {
			super.getClothes();
		} else {
			String param = "" + tagIds[0];
			String paramNumber = "" + tagIds.length;
			for (int i = 1; i < tagIds.length; i++)
				param += "," + tagIds[i];
			String query = "select * from clothes where id in ("
					+ "SELECT clothes_id FROM clothes_tag WHERE tag_id IN (" + param
					+ ") GROUP BY clothes_id HAVING COUNT(1) = " + paramNumber + ")";
			try {
				Statement stmt = connection.createStatement();
				ResultSet resultSet = stmt.executeQuery(query);
				JSONArray ja = new JSONArray();
				while (resultSet.next()) {
					int clothes_id = resultSet.getInt("id");
					String path = resultSet.getString("path");
					JSONObject jo = new JSONObject();
					jo.put("id", clothes_id);
					jo.put("path", path);
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
			out.flush();
		}
	}
}
