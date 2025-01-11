package com.app.cat201project;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;

import Class.Product;


@WebServlet(name = "AdminProductServlet", value = "/AdminProduct-servlet")

public class AdminProductServlet  extends HttpServlet {
    private static Map<String, Product> productMap = new HashMap<>();
    private String FILE_PATH;

    @Override
    public void init() throws ServletException {
        super.init();
        FILE_PATH = getServletContext().getRealPath("Database/catProjectDataset.csv");
        System.out.println("CSV File Path: " + FILE_PATH);
    }

    public Map<String, Product> importProducts() {

        try {

            // Read the file using BufferedReader
            BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH));
            String line;

            reader.readLine();

            while ((line = reader.readLine()) != null) {
                List<String> values = parseCsvLine(line);

                if (values.size() == 17) {
                    String sku = values.get(0);
                    String name = values.get(1);
                    String imageURL = values.get(2);
                    String roomCategory = values.get(3);
                    String itemCategory = values.get(4);
                    String brand = values.get(5);
                    String dimension = values.get(6);
                    String weight = values.get(7);
                    String colour = values.get(8);
                    String material = values.get(9);
                    String manufacturer = values.get(10);
                    String arrivalDate = values.get(11);
                    int quantity = Integer.parseInt(values.get(12));
                    float price = Float.parseFloat(values.get(13).replace("RM", "").trim());
                    float discount = Float.parseFloat(values.get(14));
                    String warranty = values.get(15);
                    int orderVolume = Integer.parseInt(values.get(16));

                    productMap.put(sku, new Product(sku, name, imageURL, roomCategory, itemCategory, brand, dimension, weight, colour, material, manufacturer, arrivalDate, quantity, price, discount, warranty,orderVolume));
                }
            }
            if (productMap.isEmpty()) {
                System.out.println("No products found in the CSV file.");
            }
        } catch (IOException e) {
            System.out.println("Error reading the file");
        }
        return productMap;
    }

    public void exportProducts(Map<String, Product> products) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH))) {
            writer.write("sku,name,imageURL,roomCategory,itemCategory,brand,dimension,weight,colour,material,manufacturer,arrivalDate,quantity,price,discount,warranty,orderVolume\n");
            for (Product product : products.values()) {
                writer.write(String.format("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                        escapeForCSV(product.getProduct_sku()),
                        escapeForCSV(product.getProduct_name()),
                        escapeForCSV(product.getProduct_src()),
                        escapeForCSV(product.getProduct_roomCategory()),
                        escapeForCSV(product.getProduct_itemCategory()),
                        escapeForCSV(product.getProduct_brand()),
                        escapeForCSV(product.getProduct_dimension()),
                        escapeForCSV(product.getProduct_weight()),
                        escapeForCSV(product.getProduct_colour()),
                        escapeForCSV(product.getProduct_material()),
                        escapeForCSV(product.getProduct_manufacturer()),
                        product.getProduct_arrivalDate(),
                        product.getProduct_quantity(),
                        product.getProduct_price(),
                        product.getProduct_discount(),
                        escapeForCSV(product.getProduct_warranty()),
                        product.getProduct_orderVolume()
                ));
            }
            System.out.println("Current working directory: " + System.getProperty("user.dir"));


        } catch (IOException e) {
            System.out.println("Error writing to the file");
            System.out.println("Current working directory: " + System.getProperty("user.dir"));
        }
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

    private static String escapeForCSV(String data) {
        if (data == null) {
            return "";
        }
        return data.replace("\"", "\"\"");
    }

    private static LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty() || dateStr.equals("-")) {
            return null;
        }
        try {
            return LocalDate.parse(dateStr);
        } catch (DateTimeParseException e) {
            System.out.println("Invalid date format: ");
            return null;
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Product> products = importProducts(); // Call importProducts directly

        // Convert it to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());  // Register JavaTimeModule
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);  // Disable writing dates as timestamps
        String jsonResponse = objectMapper.writeValueAsString(products.values());

        // Send the JSON response to the frontend of the project
        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json"); // Set the response content type as JSON

        try {
            // Read JSON from request body
            BufferedReader reader = request.getReader();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule()); // Supports LocalDate

            // Parse incoming JSON with originalSku and updatedProduct
            Map<String, Object> incomingData = objectMapper.readValue(reader, Map.class);
            String originalSku = (String) incomingData.get("originalSku");
            Product updatedProduct = objectMapper.convertValue(incomingData.get("updatedProduct"), Product.class);

            // Check if the product exists
            if (!productMap.containsKey(originalSku)) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Product with SKU " + originalSku + " not found.\"}");
                return;
            }

            // If SKU is changed, remove the old product and add the new one
            if (!originalSku.equals(updatedProduct.getProduct_sku())) {
                productMap.remove(originalSku);  // Remove the product with the original SKU
            }

            // Insert or update the product in the map
            productMap.put(updatedProduct.getProduct_sku(), updatedProduct);
            exportProducts(productMap); // Save changes to CSV

            // Return success response
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Product updated successfully.\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json"); // Set the response content type as JSON

        try {
            // Read JSON from request body
            BufferedReader reader = request.getReader();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            Product newProduct = objectMapper.readValue(reader, Product.class);

            // Insert or update the product in the map
            productMap.put(newProduct.getProduct_sku(), newProduct);
            exportProducts(productMap); // Save changes to CSV

            // Return success response
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Product added successfully.\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json"); // Set the response content type as JSON

        try {
            // Extract the SKU from the request URL (e.g., /AdminProduct-servlet?sku=12345)
            String sku = request.getParameter("product_sku");

            if (sku == null || sku.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"SKU parameter is required\"}");
                return;
            }

            // Find and remove the product from the map or database
            Product removedProduct = productMap.remove(sku);

            if (removedProduct == null) {
                // If the product was not found
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Product not found\"}");
            } else {
                System.out.println(removedProduct.getProduct_sku());
                System.out.println(productMap);
                exportProducts(productMap);

                // Send a success response
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"message\": \"Product deleted successfully\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Allow cross-origin preflight requests
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK); // Status OK for preflight request
    }

}