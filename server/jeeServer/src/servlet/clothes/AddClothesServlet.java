package servlet.clothes;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Enumeration;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;

import servlet.abstractServlet.GetPostHttpRequestServlet;

@WebServlet(name = "AddClothesServlet", urlPatterns = { "/addClothes" })
public class AddClothesServlet extends GetPostHttpRequestServlet {
	private static final long serialVersionUID = 1999534269051022225L;

	@SuppressWarnings("rawtypes")
	@Override
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		super.doRequest(request, response);
		MultipartRequest multi = new MultipartRequest(request,
				"C:/Users/franc/Documents/NetBeansProjects/utilsApp/app/img/clothes");
		out.println("Files:");
		Enumeration files = multi.getFileNames();
		Statement stmt = null;
		while (files.hasMoreElements()) {
			String name = (String) files.nextElement();
			// File file = multi.getFile(name);
			String filename = multi.getFilesystemName(name);
			// String type = multi.getContentType(name);

			try {
				stmt = connection.createStatement();
				stmt.executeUpdate("INSERT INTO CLOTHES (PATH) VALUES (\"" + filename + "\")");
			} catch (SQLException e) {
				out.write("Error while adding clothes to the database. " + e.getMessage());
			}
		}
		super.getClothes();
		try {
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			out.write(e.getMessage());
		}
		response.sendRedirect("http://localhost:9000/");
		out.flush();
	}

}
