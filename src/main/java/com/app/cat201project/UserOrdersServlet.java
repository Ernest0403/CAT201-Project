package com.app.cat201project;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.opencsv.exceptions.CsvValidationException;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.json.JSONArray;
import org.json.JSONObject;

import Class.*;

@WebServlet(name = "UserOrdersServlet", value = "/UserOrders-servlet")
public class UserOrdersServlet extends HttpServlet{
    private static Map<Integer, Order> orderMap = new HashMap<>();  //Stores Products that is within the logged in client's cart
    String realPath;

    public void init() throws ServletException {
        super.init();
        realPath = getServletContext().getRealPath("Database/order.csv");
        Order.setExternalCsvPath(realPath);
        System.out.println("Resolved File Path: " + realPath);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Enable CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        //Create a cart for a client, should be modified into reading from csv
        orderMap = Order.importOrders();

        // Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        JSONArray jsonArray = new JSONArray();


    }
}
