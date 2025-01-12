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

import Class.Cart;
import Class.Product;
import Class.Global;

@WebServlet(name = "CartServlet", value = "/Cart-servlet")
public class CartServlet extends HttpServlet{

    private int client_id = 1;                                      //Temporarily set the client id to 1, will connect with log in client id
    ArrayList<Cart> carts = new ArrayList<Cart>();                  //Stores data from Cart list
    Cart client_cart = new Cart();                                        //Stores data of the logged in client
    ArrayList<Product> products;          //Stores Products data of the system
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
                jsonObject.put("image", product.getProduct_src());
                jsonObject.put("product", product.getProduct_name());

                jsonObject.put("tag", product.getProduct_itemCategory());
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

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        //read request and store in temporary string
        BufferedReader reader = request.getReader();
        StringBuilder json = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        try {
            JSONObject jsonObject = new JSONObject(json.toString());
            String action = jsonObject.getString("action").trim(); // Get the action identifier
            System.out.println("Received JSON: " + jsonObject);
            switch (action) {
                case "updateQuantity":
                    client_cart.updateCart(
                            jsonObject.getString("productId").trim(),
                            jsonObject.getInt("quantity"),
                            carts,
                            client_cart
                    );
                    System.out.println("Quantity updated");
                    break;

                default:
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("Invalid action!");
                    break;
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Error processing request!");
        }

    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Allow CORS from localhost:3001
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // Respond with status OK for preflight request
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public void destroy() {

    }
}
