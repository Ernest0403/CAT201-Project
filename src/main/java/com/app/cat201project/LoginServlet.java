package com.app.cat201project;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    private static final String CSV_RESOURCE = "/users.csv";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Add CORS headers to allow cross-origin requests
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String usernameOrEmail = request.getParameter("usernameOrEmail");
        String password = request.getParameter("password");
        String userTypeRequested = request.getParameter("userType");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Validation for missing parameters
        if (usernameOrEmail == null || usernameOrEmail.isEmpty() || password == null || password.isEmpty() || userTypeRequested == null || userTypeRequested.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{" + "\"status\":\"error\",\"message\":\"All fields are required!\"}");
            return;
        }

        List<String[]> allUsers = readUsersFromCSV();
        boolean validUser = false;
        String userType = null;
        String username = null;

        for (String[] userData : allUsers) {
            String type = userData[0];
            String uname = userData[1];
            String email = userData[2];
            String pass = userData[3];

            if ((uname.equalsIgnoreCase(usernameOrEmail) || email.equalsIgnoreCase(usernameOrEmail)) && pass.equals(password)) {
                if (type.equalsIgnoreCase(userTypeRequested)) { // Ensure user type matches
                    validUser = true;
                    userType = type;
                    username = uname;
                }
                break;
            }
        }

        if (validUser) {
            HttpSession session = request.getSession();
            session.setAttribute("username", username);
            session.setAttribute("userType", userType);
            out.write("{" + "\"status\":\"success\",\"message\":\"Login successful!\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{" + "\"status\":\"error\",\"message\":\"Invalid credentials or incorrect user type!\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Add CORS headers to allow cross-origin requests
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("text/plain");
        response.getWriter().write("GET method is not supported for login. Please use POST.");
    }

    private List<String[]> readUsersFromCSV() {
        List<String[]> result = new ArrayList<>();

        // Sample data to simulate CSV content
        result.add(new String[] {"admin", "admin", "admin@example.com", "admin123"});
        result.add(new String[] {"user", "john", "john@example.com", "john123"});
        result.add(new String[] {"user", "jane", "jane@example.com", "jane456"});

        return result;
    }
}









