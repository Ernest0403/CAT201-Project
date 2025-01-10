package com.app.cat201project;

import Class.User;  // <-- Adjust the package name if necessary (wherever your User class is)
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

@WebServlet("/ForgetPasswordServlet")
public class ForgetPasswordServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(ForgetPasswordServlet.class.getName());

    @Override
    public void init() throws ServletException {
        super.init();

        // If your CSV is physically located in src/main/webapp/resources/users.csv,
        // Tomcat will expand it into a local file. We get the absolute path:
        String realPath = getServletContext().getRealPath("Database/users.csv");
        LOGGER.info("ForgetPasswordServlet init. CSV real path: " + realPath);

        // Set the CSV path in your singleton so we can read/write that file
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

        // Grab parameters
        String usernameOrEmail = request.getParameter("usernameOrEmail");
        String newPassword = request.getParameter("newPassword");

        // Validate
        if (usernameOrEmail == null || usernameOrEmail.isEmpty() ||
                newPassword == null || newPassword.isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\",\"message\":\"All fields are required!\"}");
            return;
        }

        // Access the singleton user manager
        User userManager = User.getInstance();

        // Attempt to update the password in the in-memory list
        boolean updated = userManager.updatePassword(usernameOrEmail, newPassword);

        if (updated) {
            // Persist changes to the CSV file (if setExternalCsvPath(...) was used)
            userManager.saveData();

            out.write("{\"status\":\"success\",\"message\":\"Password reset successfully!\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.write("{\"status\":\"error\",\"message\":\"User not found!\"}");
        }
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




