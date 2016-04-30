package servlet;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@WebServlet(name = "GetPostItServlet", urlPatterns = { "/postIt" })
public class GetPostItServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 3952657122240696821L;

	@SuppressWarnings("unchecked")
	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		try {
			Statement stmt = connection.createStatement();
			ResultSet resultSet = stmt.executeQuery("SELECT * FROM POSTIT");
			JSONArray ja = new JSONArray();
			while (resultSet.next()) {
				int id = resultSet.getInt("ID");
				String title = resultSet.getString("TITLE");
				String content = resultSet.getString("CONTENT");
				JSONObject jo = new JSONObject();
				jo.put("id", id);
				jo.put("title", title);
				jo.put("content", content);
				ja.add(jo);
			}
			JSONObject mainObj = new JSONObject();
			mainObj.put("postits", ja);
			out.write(mainObj.toJSONString());
			resultSet.close();
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write("Error while retrieving data from the database. " + e.getMessage());
		}
		out.flush();
	}

}
