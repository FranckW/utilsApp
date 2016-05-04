package servlet.abstractServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import utils.CrossDomainHandler;
import utils.DatabaseConnector;

public abstract class GetPostHttpRequestServlet extends HttpServlet {
	private static final long serialVersionUID = -4588214667155336647L;
	public PrintWriter out;
	public Connection connection;

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doRequest(request, response);
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doRequest(request, response);
	}

	@SuppressWarnings("unchecked")
	public void getPostIts() {
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
		} catch (SQLException e) {
			out.write("Error while getting posts it from the database. " + e.getMessage());
		}
	}

	@SuppressWarnings("unchecked")
	public void getClothes() {
		try {
			Statement stmt = connection.createStatement();
			ResultSet resultSet = stmt.executeQuery("SELECT * FROM CLOTHES");
			JSONArray ja = new JSONArray();
			while (resultSet.next()) {
				int id = resultSet.getInt("ID");
				String path = resultSet.getString("PATH");
				JSONObject jo = new JSONObject();
				jo.put("id", id);
				jo.put("path", path);
				ja.add(jo);
			}
			JSONObject mainObj = new JSONObject();
			mainObj.put("clothes", ja);
			out.write(mainObj.toJSONString());
			resultSet.close();
		} catch (SQLException e) {
			out.write("Error while getting clothes from the database. " + e.getMessage());
		}
	}

	@SuppressWarnings("unchecked")
	public void getTags() {
		try {
			Statement stmt = connection.createStatement();
			ResultSet resultSet = stmt.executeQuery("SELECT * FROM TAG");
			JSONArray ja = new JSONArray();
			while (resultSet.next()) {
				int id = resultSet.getInt("ID");
				String name = resultSet.getString("NAME");
				JSONObject jo = new JSONObject();
				jo.put("id", id);
				jo.put("name", name);
				ja.add(jo);
			}
			JSONObject mainObj = new JSONObject();
			mainObj.put("tags", ja);
			out.write(mainObj.toJSONString());
			resultSet.close();
		} catch (SQLException e) {
			out.write("Error while getting tags from the database. " + e.getMessage());
		}
	}

	@SuppressWarnings("unchecked")
	public void getClothesTags() {
		try {
			Statement stmt = connection.createStatement();
			ResultSet resultSet = stmt.executeQuery("SELECT * FROM CLOTHES_TAG");
			JSONArray ja = new JSONArray();
			while (resultSet.next()) {
				int clothes_id = resultSet.getInt("CLOTHES_ID");
				int tag_id = resultSet.getInt("TAG_ID");
				JSONObject jo = new JSONObject();
				jo.put("clothes_id", clothes_id);
				jo.put("tag_id", tag_id);
				ja.add(jo);
			}
			JSONObject mainObj = new JSONObject();
			mainObj.put("clothes_tag", ja);
			out.write(mainObj.toJSONString());
			resultSet.close();
		} catch (SQLException e) {
			out.write("Error while getting clothes_tag couples from the database. " + e.getMessage());
		}
	}

	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		CrossDomainHandler.handle(request, response, getServletContext());
		out = response.getWriter();
		DatabaseConnector db = new DatabaseConnector();
		connection = db.getConnection();
	}

}
