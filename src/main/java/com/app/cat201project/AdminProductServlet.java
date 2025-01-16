package com.app.cat201project;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            reader.readLine();
            while ((line = reader.readLine()) != null) {

                List<String> values = parseCsvLine(line);
                System.out.println(values);
                if (values.size() == 17) {

                    Product product = new Product(values);
                    productMap.put(product.getProduct_sku(), product);
                }
            }
            if (productMap.isEmpty()) {
                System.out.println("No products found in the CSV file.");
            }
        } catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
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

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Product> products = importProducts(); // Call importProducts directly

        // convert it to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());  // Register JavaTimeModule
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);  // Disable writing dates as timestamps
        String jsonResponse = objectMapper.writeValueAsString(products.values());

        // send the JSON response to the frontend
        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");

        try {
            // read JSON from request
            BufferedReader reader = request.getReader();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule()); // Supports LocalDate

            // parse incoming JSON with originalSku and updatedProduct
            Map<String, Object> incomingData = objectMapper.readValue(reader, Map.class);
            String originalSku = (String) incomingData.get("originalSku");
            Product updatedProduct = objectMapper.convertValue(incomingData.get("updatedProduct"), Product.class);

            // check if the product exists
            if (!productMap.containsKey(originalSku)) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Product with SKU " + originalSku + " not found.\"}");
                return;
            }

            // if SKU is changed, remove the old product and add the new one
            if (!originalSku.equals(updatedProduct.getProduct_sku())) {
                productMap.remove(originalSku);  // Remove the product with the original SKU
            }

            //  update the product in the map
            productMap.put(updatedProduct.getProduct_sku(), updatedProduct);
            exportProducts(productMap); // Save changes to CSV

            // return success response
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
            // read JSON from request
            BufferedReader reader = request.getReader();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            Product newProduct = objectMapper.readValue(reader, Product.class);

            // update the product in the map
            productMap.put(newProduct.getProduct_sku(), newProduct);
            exportProducts(productMap); // Save changes to CSV

            // return success response
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
        // add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json"); // Set the response content type as JSON

        try {
            String sku = request.getParameter("product_sku");

            if (sku == null || sku.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"SKU parameter is required\"}");
                return;
            }

            Product removedProduct = productMap.remove(sku);

            if (removedProduct == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Product not found\"}");
            } else {
                System.out.println(removedProduct.getProduct_sku());
                System.out.println(productMap);
                exportProducts(productMap);

                // send a success response
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
        // add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

}