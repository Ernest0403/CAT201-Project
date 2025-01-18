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

import Class.*;

@WebServlet(name = "UserOrdersServlet", value = "/UserOrders-servlet")
public class UserOrdersServlet extends HttpServlet {
    private String loginUser;
    private static Map<Integer, Order> orderMap = new HashMap<>();
    private String FILE_PATH;

    @Override
    public void init() throws ServletException {
        super.init();
        loginUser = Global.LoginUser;
        FILE_PATH = getServletContext().getRealPath("Database/order.csv");
        System.out.println("CSV File Path: " + FILE_PATH);
    }

    public Map<Integer, Order> importOrders() {
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            reader.readLine();
            while ((line = reader.readLine()) != null) {
                List<String> values = parseCsvLine(line);
                System.out.println(values);
                if (values.size() == 21) {
                    Order order = new Order(values);
                    if (order.getOrder_customer().getUsername().equals(loginUser)) {
                        orderMap.put(order.getOrder_id(), order);
                    }
                }
            }
            if (orderMap.isEmpty()) {
                System.out.println("No orders found in the CSV file.");
            }
        } catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
        }
        return orderMap;
    }

    public void exportOrders(Map<Integer, Order> orders) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH))) {
            writer.write("id,orderNumber,customer_username,customer_contactNumber,customer_address,productSkus,quantities,totalItems,productPrice,deliveryFee,assemblyFee,sst,total,paymentType,paymentStatus,cancellationReason,cancellationDate,status,orderDate,comment,arrivingDate\n");

            // iterate through the orders map and write each order's data to the file
            for (Order order : orders.values()) {
                // handle productSkus and quantities are stored as lists or arrays in the order object
                String productSku = String.join("|", order.getOrder_products().stream()
                        .map(product -> String.valueOf(product.getProductSku()))
                        .toArray(String[]::new));

                String quantities = String.join("|", order.getOrder_products().stream()
                        .map(product -> String.valueOf(product.getQuantity()))
                        .toArray(String[]::new));

                writer.write(String.format("\"%d\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%d\",\"%f\",\"%f\",\"%f\",\"%f\",\"%f\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                        order.getOrder_id(),
                        escapeForCSV(order.getOrder_orderNumber()),
                        escapeForCSV(order.getOrder_customer().getUsername()),
                        escapeForCSV(order.getOrder_customer().getContactNumber()),
                        escapeForCSV(order.getOrder_customer().getAddress()),
                        productSku,
                        quantities,
                        order.getOrder_orderDetails().getTotalItems(),
                        order.getOrder_orderDetails().getProductPrice(),
                        order.getOrder_orderDetails().getDeliveryFee(),
                        order.getOrder_orderDetails().getAssemblyFee(),
                        order.getOrder_orderDetails().getSst(),
                        order.getOrder_orderDetails().getTotal(),
                        order.getOrder_paymentDetails().getPaymentType(),
                        order.getOrder_paymentDetails().getPaymentStatus(),
                        escapeForCSV(order.getOrder_cancellationDetails().getCancellationReason()),
                        order.getOrder_cancellationDetails().getCancellationDate(),
                        order.getOrder_status(),
                        order.getOrder_orderDate(),
                        escapeForCSV(order.getOrder_comment()),
                        order.getOrder_arrivingDate()
                ));
            }
        } catch (IOException e) {
            System.out.println("Error writing to the file: " + e.getMessage());
        }
    }

    private static String escapeForCSV(String data) {
        if (data == null) {
            return "";
        }
        return data.replace("\"", "\"\"");
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
        // add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<Integer, Order> orders = importOrders();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        String jsonResponse = objectMapper.writeValueAsString(orders.values());

        // send JSON response to the frontend
        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json"); // Set the response content type as JSON

        try {
            // read JSON from request
            BufferedReader reader = request.getReader();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            // parse incoming JSON with originalId and updatedOrder
            Map<Integer, Object> incomingData = objectMapper.readValue(reader, Map.class);
            Integer originalId = (Integer) incomingData.get("originalId");
            Order updatedOrder = objectMapper.convertValue(incomingData.get("updatedOrder"), Order.class);

            if (originalId == null || updatedOrder == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Missing originalId or updatedOrder.\"}");
                return;
            }

            // check if the oder exists
            if (!orderMap.containsKey(originalId)) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Product with SKU " + originalId + " not found.\"}");
                return;
            }

            // update the order in the map
            orderMap.put(updatedOrder.getOrder_id(), updatedOrder);
            exportOrders(orderMap);

            System.out.println("Incoming Data: " + incomingData);
            System.out.println("Original ID: " + originalId);
            System.out.println("Updated Order: " + updatedOrder);


            // return success
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Product updated successfully.\"}");
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Add CORS headers for preflight requests
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
