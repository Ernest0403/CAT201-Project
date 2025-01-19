package com.app.cat201project;

import Class.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(RegisterServlet.class.getName());

    @Override
    public void init() throws ServletException {
        super.init();


        String realPath = getServletContext().getRealPath("Database/users.csv");
        LOGGER.info("RegisterServlet init. CSV real path: " + realPath);


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

        // === 1) Retrieve registration fields ===
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        // For demonstration, assume new users are "user" type:
        String userType = "user";

        // === 2) Basic validation ===
        if (email == null || email.trim().isEmpty() ||
                username == null || username.trim().isEmpty() ||
                password == null || password.trim().isEmpty() ||
                confirmPassword == null || confirmPassword.trim().isEmpty()) {

            LOGGER.warning("Registration failed: one or more fields are empty.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\",\"message\":\"All fields are required!\"}");
            return;
        }

        if (!password.equals(confirmPassword)) {
            LOGGER.warning("Registration failed: passwords do not match.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\",\"message\":\"Passwords do not match!\"}");
            return;
        }

        // === 3) Get the User instance and read current user list
        User userManager = User.getInstance();  // the singleton
        List<String[]> allUsers = userManager.getAllUsers();
        LOGGER.info("Loaded users: " + allUsers.size());

        // === 4) Check if email or username already exist ===
        boolean userExists = false;
        for (String[] userData : allUsers) {
            // We expect at least 4 columns (userType, username, email, password)
            if (userData.length < 4) {
                LOGGER.warning("Skipping malformed user record: " + Arrays.toString(userData));
                continue;
            }

            String csvUserType = userData[0].trim();
            String csvUsername = userData[1].trim();
            String csvEmail    = userData[2].trim();

            // Compare ignoring case (for user/email)
            if (csvUsername.equalsIgnoreCase(username) || csvEmail.equalsIgnoreCase(email)) {
                userExists = true;
                break;
            }
        }

        if (userExists) {
            LOGGER.warning("Registration failed: username/email already in use.");
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            out.write("{\"status\":\"error\",\"message\":\"Username or email already in use!\"}");
            return;
        }


        String[] newUser = new String[] {
                userType,
                username.trim(),
                email.trim(),
                password.trim(),
                "",  // firstName
                "",  // lastName
                "",  // displayName
                "",  // billingAddress
                ""   // shippingAddress
        };

        // === 6) Add it to the in-memory list
        userManager.addUser(newUser);
        LOGGER.info("Added new user: " + Arrays.toString(newUser));

        // === 7) Write updated list back to CSV (persist changes)
        userManager.saveData();
        LOGGER.info("Successfully wrote updated user list to CSV. Total users: " + userManager.getAllUsers().size());

        // === 8) Respond with success ===
        out.write("{\"status\":\"success\",\"message\":\"Registration successful!\"}");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // We typically don't handle registration with GET
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("text/plain");
        response.getWriter().write("GET method is not supported for registration. Please use POST.");
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





