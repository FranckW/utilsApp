package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.CrossDomainHandler;
import utils.DatabaseConnector;

public abstract class GetPostHttpRequestServlet extends HttpServlet {
	private static final long serialVersionUID = -4588214667155336647L;
	PrintWriter out;
	Connection connection;

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doRequest(request, response);
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doRequest(request, response);
	}

	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		CrossDomainHandler.handle(request, response, getServletContext());
		out = response.getWriter();
		DatabaseConnector db = new DatabaseConnector();
		connection = db.getConnection();
	}

}
