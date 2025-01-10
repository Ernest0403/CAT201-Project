package com.app.cat201project;

import Class.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(LoginServlet.class.getName());

    @Override
    public void init() throws ServletException {
        super.init();

        // If your CSV is physically located in src/main/webapp/resources/users.csv,
        // Tomcat will expand it into a local file, so we use getRealPath:
        String realPath = getServletContext().getRealPath("Database/users.csv");
        LOGGER.info("LoginServlet init. CSV real path: " + realPath);

        // Instruct the User singleton to read/write from this path if needed
        User.setExternalCsvPath(realPath);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Retrieve parameters
        String usernameOrEmail = request.getParameter("usernameOrEmail");
        String password = request.getParameter("password");
        String userTypeRequested = request.getParameter("userType");

        // Basic validation
        if (usernameOrEmail == null || usernameOrEmail.isEmpty() ||
                password == null || password.isEmpty() ||
                userTypeRequested == null || userTypeRequested.isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\",\"message\":\"All fields are required!\"}");
            return;
        }

        // Obtain the User singleton and get the in-memory list
        User userManager = User.getInstance();
        List<String[]> allUsers = userManager.getAllUsers();

        if (allUsers.isEmpty()) {
            LOGGER.warning("No users found in CSV (empty or read error)." );
        }

        boolean validUser = false;
        String matchedUserType = null;
        String matchedUsername = null;

        // Check each record for a match
        for (String[] userData : allUsers) {
            // Expect at least 4 columns: [0]=userType, [1]=username, [2]=email, [3]=password
            if (userData.length < 4) {
                continue;
            }

            String csvUserType = userData[0].trim();
            String csvUsername = userData[1].trim();
            String csvEmail    = userData[2].trim();
            String csvPassword = userData[3].trim();

            // Compare credentials
            boolean userMatch =
                    (csvUsername.equalsIgnoreCase(usernameOrEmail) || csvEmail.equalsIgnoreCase(usernameOrEmail))
                            && csvPassword.equals(password);

            if (userMatch) {
                // Check user type
                if (csvUserType.equalsIgnoreCase(userTypeRequested)) {
                    validUser = true;
                    matchedUserType = csvUserType;
                    matchedUsername = csvUsername;
                }
                // Break once we find a matching user
                break;
            }
        }

        if (validUser) {
            // Optionally, create an HTTP session
            HttpSession session = request.getSession();
            session.setAttribute("username", matchedUsername);
            session.setAttribute("userType", matchedUserType);

            LOGGER.info("User successfully logged in: " + matchedUsername + ", Type: " + matchedUserType);
            out.write("{\"status\":\"success\",\"message\":\"Login successful!\"}");
        } else {
            LOGGER.warning("Invalid login attempt for usernameOrEmail: " + usernameOrEmail);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"status\":\"error\",\"message\":\"Invalid credentials or incorrect user type!\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("text/plain");
        response.getWriter().write("GET method is not supported for login. Please use POST.");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Handle CORS preflight
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
















