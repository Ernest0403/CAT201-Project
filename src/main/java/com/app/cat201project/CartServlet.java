package com.app.cat201project;

import java.io.*;
import java.util.ArrayList;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.json.JSONArray;
import org.json.JSONObject;

import Class.Cart;
import Class.Product;
import Class.Global;

@WebServlet(name = "CartServlet", value = "/Cart-servlet")
public class CartServlet extends HttpServlet{
    private int client_id = 1;
    ArrayList<Cart> carts = new ArrayList<Cart>();
    Cart client_cart;
    ArrayList<Product> products = Global.getProductList();
    ArrayList<Product> cart_products = new ArrayList<Product>();

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //Create a cart for a client, should be modified into reading from csv
        for (int i = 0; i <= 7 ; i++){
            carts.add(new Cart(client_id));
            carts.get(i).addCart(i,i);
        }

        for (int i = 0; i <= 7 ; i++){
            if(carts.get(i).getClient_id() == client_id){
                client_cart = carts.get(i);
            }
        }

        for (int i = 1; i <= carts.size() -1; i++){
            //Search for cliend if first
            if(carts.get(i).getClient_id() == client_id){
                //Search for the respective products in the person cart
                for (int k = 1; k <= carts.get(i).getProductListSize() -1;k++) {
                    for (int j = 1; j <= carts.size(); j++) {
                        if (carts.get(i).getProduct_id(k) == products.get(i).getProduct_sku()) {
                            Product tempProduct = products.get(i);
                            cart_products.add(tempProduct);
                        }
                    }
                }
            }
        }

        // Enable CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        int i = 0;
        for (Product product : cart_products) {
            // create JSON object for each item
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("image", product.getProduct_src());
            jsonObject.put("product", product.getProduct_name());
            jsonObject.put("tag", "None"); //use single string first
            jsonObject.put("price", product.getProduct_price());
            jsonObject.put("quantity", client_cart.getQuantity(i));

            // append it to your JSON array.
            jsonArray.put(jsonObject);
            i++;
        }

        // Write JSON to response
        jsonResponse.put("cartProducts", jsonArray);
        response.getWriter().write(jsonResponse.toString());
    }

    public void destroy() {

    }
}
