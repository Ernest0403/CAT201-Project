package com.app.cat201project;

import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import Class.CustomerService;
import java.io.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/CustomerServiceServlet")
public class CustomerServiceServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(CustomerServiceServlet.class.getName());
    private final List<CustomerService> inquiries = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void init() throws ServletException {
        super.init();
        String filePath = getServletContext().getRealPath("Database/customerService.csv");
        LOGGER.info("Initializing CustomerServiceServlet. CSV file path: " + filePath);

        File file = new File(filePath);
        if (!file.exists()) {
            try {
                if (!file.getParentFile().exists() && !file.getParentFile().mkdirs()) {
                    LOGGER.log(Level.SEVERE, "Failed to create directories for the file: " + file.getAbsolutePath());
                    throw new IOException("Failed to create necessary directories.");
                }

                try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
                    writer.write("id,title,description,username,status,reply");
                    writer.newLine();
                }
                LOGGER.info("Created new customerService.csv file at: " + filePath);
            } catch (IOException e) {
                LOGGER.log(Level.SEVERE, "Failed to create customerService.csv file", e);
                throw new ServletException("Could not initialize inquiries file", e);
            }
        }

        try {
            inquiries.addAll(readInquiriesFromCsv(filePath));
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error loading inquiries from CSV", e);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");

        try (PrintWriter out = response.getWriter()) {
            synchronized (inquiries) {
                Gson gson = new Gson();
                out.write(gson.toJson(inquiries));
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error during GET request handling", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Failed to fetch inquiries.\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");

        try (PrintWriter out = response.getWriter()) {
            BufferedReader reader = request.getReader();
            StringBuilder jsonBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }
            String jsonString = jsonBuilder.toString();
            LOGGER.info("Received JSON: " + jsonString);

            Gson gson = new Gson();
            CustomerService inquiry = gson.fromJson(jsonString, CustomerService.class);

            if (inquiry.getId() == 0 || inquiry.getReply() == null || inquiry.getReply().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.write("{\"status\":\"error\",\"message\":\"Inquiry ID and Reply are required!\"}");
                return;
            }

            synchronized (inquiries) {
                boolean found = false;

                // Search for the inquiry to update
                for (CustomerService existingInquiry : inquiries) {
                    if (existingInquiry.getId() == inquiry.getId()) {
                        existingInquiry.setReply(inquiry.getReply());
                        existingInquiry.setStatus("Replied");
                        LOGGER.info("Updated inquiry with ID: " + inquiry.getId());
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.write("{\"status\":\"error\",\"message\":\"Inquiry not found!\"}");
                    return;
                }
            }

            try {
                // Write the updated inquiries list to the CSV file
                writeInquiriesToCsv(getServletContext().getRealPath("Database/customerService.csv"), inquiries);
                out.write("{\"status\":\"success\",\"message\":\"Inquiry updated successfully!\"}");
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error saving inquiries to CSV", e);
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.write("{\"status\":\"error\",\"message\":\"Failed to save inquiry to file.\"}");
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error updating inquiry", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Failed to update inquiry.\"}");
        }
    }

    private List<CustomerService> readInquiriesFromCsv(String filePath) throws IOException {
        List<CustomerService> inquiries = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Skip header row
                    continue;
                }
                String[] values = line.split(",");
                CustomerService inquiry = new CustomerService(
                        Integer.parseInt(values[0]),
                        values[1],
                        values[2],
                        values[3],
                        values[4],
                        values.length > 5 ? values[5] : ""
                );
                inquiries.add(inquiry);
            }
        }
        return inquiries;
    }

    private void writeInquiriesToCsv(String filePath, List<CustomerService> inquiries) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath))) {
            bw.write("id,title,description,username,status,reply"); // Header
            bw.newLine();
            for (CustomerService inquiry : inquiries) {
                bw.write(inquiry.getId() + "," + inquiry.getTitle() + "," + inquiry.getDescription() + "," + inquiry.getUsername() + "," + inquiry.getStatus() + "," + (inquiry.getReply() == null ? "" : inquiry.getReply()));
                bw.newLine();
            }
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
}







