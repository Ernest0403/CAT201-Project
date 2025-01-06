package com.app.cat201project;

import java.io.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.json.JSONObject;

import Class.Cart;

@WebServlet(name = "CartServlet", value = "/Cart-servlet")
public class CartServlet extends HttpServlet{
    int client_id = 111;
    Cart cart = new Cart(client_id);
    //Init function just to test the class functionality
    public void init() {
        cart.addCart(1,2);
        cart.addCart(2,3);
        cart.addCart(3,4);
        cart.addCart(4,5);

        cart.getPro_Quantity(1);
        cart.getPro_Quantity(2);
        cart.getPro_Quantity(3);
        cart.getPro_Quantity(4);
        cart.getPro_Quantity(5);

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Enable CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("clientId", cart.getClient_id());

        // Write JSON to response
        response.getWriter().write(jsonResponse.toString());
    }

    public void destroy() {

    }
}
