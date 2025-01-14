package com.app.cat201project;

import Class.Promotion;
import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/PromotionServlet")
public class PromotionServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(PromotionServlet.class.getName());
    private final List<Promotion> promotions = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void init() throws ServletException {
        super.init();
        String filePath = getServletContext().getRealPath("Database/promotion.csv");
        LOGGER.info("Initializing PromotionServlet. CSV file path: " + filePath);

        File file = new File(filePath);
        if (!file.exists()) {
            try {
                if (!file.getParentFile().exists() && !file.getParentFile().mkdirs()) {
                    LOGGER.log(Level.SEVERE, "Failed to create directories for the file: " + file.getAbsolutePath());
                    throw new IOException("Failed to create necessary directories.");
                }

                try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
                    writer.write("id,title,description,code,expiryDate");
                    writer.newLine();
                }
                LOGGER.info("Created new promotion.csv file at: " + filePath);
            } catch (IOException e) {
                LOGGER.log(Level.SEVERE, "Failed to create promotion.csv file", e);
                throw new ServletException("Could not initialize promotions file", e);
            }
        }

        try {
            promotions.addAll(Promotion.loadFromCsv(filePath));
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error loading promotions from CSV", e);
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
            synchronized (promotions) {
                Gson gson = new Gson();
                out.write(gson.toJson(promotions));
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error during GET request handling", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Failed to fetch promotions.\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
            Promotion promotion = gson.fromJson(jsonString, Promotion.class);

            if (promotion.getTitle() == null || promotion.getTitle().isEmpty() ||
                    promotion.getCode() == null || promotion.getCode().isEmpty() ||
                    promotion.getExpiryDate() == null || promotion.getExpiryDate().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.write("{\"status\":\"error\",\"message\":\"All fields are required!\"}");
                return;
            }

            synchronized (promotions) {
                boolean updated = false;

                for (Promotion existingPromotion : promotions) {
                    if (existingPromotion.getId().equals(promotion.getId())) {
                        existingPromotion.setTitle(promotion.getTitle());
                        existingPromotion.setDescription(promotion.getDescription());
                        existingPromotion.setCode(promotion.getCode());
                        existingPromotion.setExpiryDate(promotion.getExpiryDate());
                        updated = true;
                        LOGGER.info("Updated existing promotion with ID: " + promotion.getId());
                        break;
                    }
                }

                if (!updated) {
                    String newId = promotion.getId() != null && !promotion.getId().isEmpty() ? promotion.getId() : UUID.randomUUID().toString();
                    promotion.setId(newId);
                    promotions.add(promotion);
                    LOGGER.info("Added new promotion with ID: " + newId);
                }
            }

            try {
                Promotion.saveToCsv(getServletContext().getRealPath("Database/promotion.csv"), promotions);
                out.write("{\"status\":\"success\",\"message\":\"Promotion saved successfully!\"}");
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error saving promotions to CSV", e);
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.write("{\"status\":\"error\",\"message\":\"Failed to save promotions to file.\"}");
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error saving promotion", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Failed to save promotion.\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");

        try (PrintWriter out = response.getWriter()) {
            String id = request.getParameter("id");

            if (id == null || id.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.write("{\"status\":\"error\",\"message\":\"Promotion ID is required!\"}");
                return;
            }

            synchronized (promotions) {
                Promotion toRemove = promotions.stream()
                        .filter(promotion -> promotion.getId().equals(id))
                        .findFirst()
                        .orElse(null);

                if (toRemove != null) {
                    promotions.remove(toRemove);
                    LOGGER.info("Removed promotion with ID: " + id);
                    try {
                        Promotion.saveToCsv(getServletContext().getRealPath("Database/promotion.csv"), promotions);
                        out.write("{\"status\":\"success\",\"message\":\"Promotion removed successfully!\"}");
                    } catch (Exception e) {
                        LOGGER.log(Level.SEVERE, "Error saving promotions after deletion", e);
                        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                        out.write("{\"status\":\"error\",\"message\":\"Failed to save promotions after deletion.\"}");
                    }
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.write("{\"status\":\"error\",\"message\":\"Promotion not found!\"}");
                }
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error deleting promotion", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Failed to delete promotion.\"}");
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
}














