package com.app.cat201project;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(name = "AccountDetailsServlet", value = "/AccountDetailsServlet")
public class AccountDetailsServlet extends HttpServlet {
    private static Map<Integer, Map<String, String>> userMap = new HashMap<>();
    private String FILE_PATH;

    @Override
    public void init() throws ServletException {
        super.init();
        FILE_PATH = getServletContext().getRealPath("Database/user1.csv");
        System.out.println("CSV File Path: " + FILE_PATH);
    }

    public Map<Integer, Map<String, String>> importUsers() {
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            reader.readLine(); // Skip header
            int id = 1;
            while ((line = reader.readLine()) != null) {
                List<String> values = parseCsvLine(line);
                if (values.size() == 3) {
                    Map<String, String> userDetails = new HashMap<>();
                    userDetails.put("firstName", values.get(0));
                    userDetails.put("lastName", values.get(1));
                    userDetails.put("displayName", values.get(2));
                    userMap.put(id++, userDetails);
                }
            }
            if (userMap.isEmpty()) {
                System.out.println("No user details found in the CSV file.");
            }
        } catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
        }
        return userMap;
    }

    public void exportUsers(Map<Integer, Map<String, String>> users) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH))) {
            writer.write("firstName,lastName,displayName\n");

            for (Map<String, String> userDetails : users.values()) {
                writer.write(String.format("%s,%s,%s\n",
                        escapeForCSV(userDetails.get("firstName")),
                        escapeForCSV(userDetails.get("lastName")),
                        escapeForCSV(userDetails.get("displayName"))));
            }
        } catch (IOException e) {
            System.out.println("Error writing to the file: " + e.getMessage());
        }
    }

    private static String escapeForCSV(String data) {
        if (data == null) {
            return "";
        }
        return data.contains(",") ? "\"" + data.replace("\"", "\"\"") + "\"" : data;
    }

    private static List<String> parseCsvLine(String line) {
        boolean inQuotes = false;
        List<String> data = new ArrayList<>();
        StringBuilder currentField = new StringBuilder();
        for (char c : line.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                data.add(currentField.toString().trim());
                currentField.setLength(0);
            } else {
                currentField.append(c);
            }
        }
        if (!currentField.isEmpty()) {
            data.add(currentField.toString().trim());
        }
        return data;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<Integer, Map<String, String>> users = importUsers();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(users.values());

        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String displayName = request.getParameter("displayName");

        if (firstName == null || lastName == null || displayName == null ||
                firstName.isEmpty() || lastName.isEmpty() || displayName.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Invalid input.\"}");
            return;
        }

        // Clear the map and add the new user
        userMap.clear();
        Map<String, String> newUser = new HashMap<>();
        newUser.put("firstName", firstName);
        newUser.put("lastName", lastName);
        newUser.put("displayName", displayName);
        userMap.put(1, newUser); // Overwrite with only the new user

        // Export the new map to CSV
        exportUsers(userMap);

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"status\":\"success\",\"message\":\"Data saved successfully.\"}");
    }


    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}












