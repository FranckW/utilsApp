package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {
	protected Connection connection;

	public DatabaseConnector() {
		String user = "franck";
		String password = "azeqsdwxc";
		String url = "jdbc:mysql://localhost:3306/myDB?autoReconnect=true&useSSL=false";
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Cannot find the driver in the classpath");
		}
		try {
			connection = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			System.out.println("Database connection error. " + e.getMessage());
		}
	}

	public Connection getConnection() {
		return connection;
	}

}
