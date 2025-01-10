package com.app.cat201project;

import java.io.*;
import java.util.ArrayList;

import com.opencsv.exceptions.CsvValidationException;
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
    private int client_id = 1;                                      //Temporarily set the client id to 1, will connect with log in client id
    ArrayList<Cart> carts = new ArrayList<Cart>();                  //Stores data from Cart list
    Cart client_cart = new Cart();                                        //Stores data of the logged in client
    ArrayList<Product> products = Global.getProductList();          //Stores Products data of the system
    ArrayList<Product> cart_products = new ArrayList<Product>();    //Stores Products that is within the logged in client's cart

    //Destroy the carts to prevent stacking of data in repeating request
    public void destroyCart(){
        // Need to clear the content so it wont stack on the next request
        carts = new ArrayList<Cart>();
        client_cart = new Cart();
        cart_products = new ArrayList<Product>();
    }

    //Return logged in client Cart details
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Enable CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);

        //Create a cart for a client, should be modified into reading from csv
        try {
            Global.loadCart(products, carts, client_cart, cart_products, client_id);
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        System.out.println("client_cart list shown." + client_cart.getProduct_id());
        System.out.println("client_product list added." + cart_products);

        // Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        try {
            int i = 0;
            for (Product product : cart_products) {

                // create JSON object for each item
                JSONObject jsonObject = new JSONObject();
                JSONArray tagArray = new JSONArray();

                jsonObject.put("image", product.getProduct_src());
                jsonObject.put("product", product.getProduct_name());

                for(String tag: product.getProduct_tags())
                    tagArray.put(tag);

                jsonObject.put("tag", tagArray);
                jsonObject.put("price", product.getProduct_price());

                if (i < client_cart.getProductListSize()) {
                    jsonObject.put("quantity", client_cart.getQuantity(i));
                }

                // append it to your JSON array.
                jsonArray.put(jsonObject);
                i++;
            }

            // Write JSON to response
            jsonResponse.put("cartProducts", jsonArray);
            System.out.println(jsonResponse.toString());
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Internal server error occurred.\"}");
        }

        destroyCart();
    }

    public void destroy() {

    }
}
