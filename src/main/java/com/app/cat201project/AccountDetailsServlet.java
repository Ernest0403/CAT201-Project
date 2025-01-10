package com.app.cat201project;

import Class.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

@WebServlet("/AccountDetailsServlet")
public class AccountDetailsServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(AccountDetailsServlet.class.getName());

    @Override
    public void init() throws ServletException {
        super.init();
        String realPath = getServletContext().getRealPath("Database/users.csv");
        User.setExternalCsvPath(realPath);
        LOGGER.info("AccountDetailsServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Validate session
        HttpSession session = request.getSession(false);
        if (session == null) {
            LOGGER.warning("No session found.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"status\":\"error\",\"message\":\"Not logged in.\"}");
            return;
        }

        String sessionUsername = (String) session.getAttribute("username");
        if (sessionUsername == null || sessionUsername.isEmpty()) {
            LOGGER.warning("Session found but no username set.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"status\":\"error\",\"message\":\"Session invalid or expired.\"}");
            return;
        }

        // Retrieve user data
        User userManager = User.getInstance();
        String[] userData = userManager.findUserByUsernameOrEmail(sessionUsername);

        if (userData == null) {
            LOGGER.warning("User not found: " + sessionUsername);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.write("{\"status\":\"error\",\"message\":\"User not found.\"}");
            return;
        }

        // CSV columns: [4]=firstName, [5]=lastName, [6]=displayName
        String firstName = userData.length > 4 ? userData[4] : "";
        String lastName = userData.length > 5 ? userData[5] : "";
        String displayName = userData.length > 6 ? userData[6] : "";

        // Handle null or "null" values
        if ("null".equalsIgnoreCase(firstName)) firstName = "";
        if ("null".equalsIgnoreCase(lastName)) lastName = "";
        if ("null".equalsIgnoreCase(displayName)) displayName = "";

        // Respond with user details
        String jsonResponse = String.format(
                "{" +
                        "\"status\":\"success\"," +
                        "\"firstName\":\"%s\"," +
                        "\"lastName\":\"%s\"," +
                        "\"displayName\":\"%s\"" +
                        "}",
                escapeJson(firstName),
                escapeJson(lastName),
                escapeJson(displayName)
        );

        LOGGER.info("User details fetched successfully for: " + sessionUsername);
        out.write(jsonResponse);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        if (session == null) {
            LOGGER.warning("No session found during POST.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"status\":\"error\",\"message\":\"Not logged in.\"}");
            return;
        }

        String sessionUsername = (String) session.getAttribute("username");
        if (sessionUsername == null || sessionUsername.isEmpty()) {
            LOGGER.warning("Session found but no username set during POST.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"status\":\"error\",\"message\":\"Session invalid or expired.\"}");
            return;
        }

        // Collect new user details
        String newFirstName = request.getParameter("firstName");
        String newLastName = request.getParameter("lastName");
        String newDisplayName = request.getParameter("displayName");

        // Validate inputs and set default values
        if (newFirstName == null || newFirstName.trim().isEmpty()) newFirstName = "null";
        if (newLastName == null || newLastName.trim().isEmpty()) newLastName = "null";
        if (newDisplayName == null || newDisplayName.trim().isEmpty()) newDisplayName = "null";

        User userManager = User.getInstance();
        String[] userData = userManager.findUserByUsernameOrEmail(sessionUsername);

        if (userData == null) {
            LOGGER.warning("User not found during POST: " + sessionUsername);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.write("{\"status\":\"error\",\"message\":\"User not found.\"}");
            return;
        }

        // Update user details
        if (userData.length > 4) userData[4] = newFirstName;
        if (userData.length > 5) userData[5] = newLastName;
        if (userData.length > 6) userData[6] = newDisplayName;

        // Save changes
        userManager.saveData();

        LOGGER.info("User details updated successfully for: " + sessionUsername);
        out.write("{\"status\":\"success\",\"message\":\"Account details updated!\"}");
    }

    private String escapeJson(String text) {
        if (text == null) return "";
        return text.replace("\"", "\\\"");
    }
}






