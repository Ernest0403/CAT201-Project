package com.app.cat201project;

import java.io.*;
import java.util.ArrayList;

import com.opencsv.exceptions.CsvValidationException;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.json.JSONArray;
import org.json.JSONObject;

import Class.*;

@WebServlet(name = "CheckoutServlet", value = "/Checkout-servlet")
public class CheckoutServlet extends HttpServlet {

    private int client_id = 1;                                //Temporarily set the client id to 1, will connect with log in client id
    ArrayList<Cart> carts = new ArrayList<Cart>();               //Stores data from Cart list
    Cart client_cart = new Cart();                            //Stores data of the logged in client
    ArrayList<Product> products;                              //Stores Products data of the system
    ArrayList<Product> cart_products = new ArrayList<Product>();    //Stores Products that is within the logged in client's cart
    String realPath;

    public void init() throws ServletException {
        super.init();
        String productRealPath = getServletContext().getRealPath("Database/catProjectDataset.csv");
        products = Global.getProductList(productRealPath);
        realPath = getServletContext().getRealPath("Database/Cart.csv");
        Cart.setExternalCsvPath(realPath);
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
        try {
            Cart.loadCart(products, carts, client_cart, cart_products, client_id, realPath);
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

                jsonObject.put("productID", product.getProduct_sku().trim());
                jsonObject.put("product", product.getProduct_name());
                jsonObject.put("price", product.getProduct_discountedPrice());
                // append it to your JSON array.
                jsonArray.put(jsonObject);
                i++;
            }

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("SelectedQuantity", client_cart.getSelectedItemSize());
            jsonObject.put("SubPrice", client_cart.getSubPrice(products));
            jsonObject.put("AssemblyFee", client_cart.getAssemblyFee());
            jsonObject.put("Subtotal", client_cart.getSubTotal(products));
            jsonObject.put("Delivery", 10); //Temporary fixed value
            jsonObject.put("SST", client_cart.getTaxFee(products)); //Temporary fixed value
            jsonObject.put("Total", client_cart.getTaxTotal(products));

            // Write JSON to response
            jsonResponse.put("cartProducts", jsonArray);
            jsonResponse.put("fullSummary", jsonObject);
            System.out.println(jsonResponse.toString());
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Internal server error occurred.\"}");
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }
}
