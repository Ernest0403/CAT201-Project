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
    private String loginUser;
    ArrayList<Cart> carts = new ArrayList<Cart>();               //Stores data from Cart list
    Cart client_cart = new Cart();                            //Stores data of the logged in client
    ArrayList<Product> products;                              //Stores Products data of the system
    ArrayList<Product> cart_products = new ArrayList<Product>();    //Stores Products that is within the logged in client's cart
    String realPath;

    public void init() throws ServletException {
        super.init();
        //Get the login username
        loginUser = Global.LoginUser;
        String productRealPath = getServletContext().getRealPath("Database/catProjectDataset.csv");
        products = Global.getProductList(productRealPath);
        realPath = getServletContext().getRealPath("Database/Cart.csv");
        Cart.setExternalCsvPath(realPath);
        System.out.println("Resolved File Path: " + realPath);

        try {
            Cart.loadCart(products, carts, client_cart, cart_products, loginUser);
        } catch (CsvValidationException | IOException e) {
            throw new RuntimeException(e);
        }

    }

    //Return logged in client Cart details
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        loginUser = Global.LoginUser;
        try {
            Cart.loadCart(products, carts, client_cart, cart_products, loginUser);
        } catch (CsvValidationException | IOException e) {
            throw new RuntimeException(e);
        }

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
                jsonObject.put("price", product.getProduct_discountedPrice());

                if (i < client_cart.getProductListSize()) {
                    jsonObject.put("quantity", client_cart.getQuantity(i));
                    System.out.println(i);
                }

                // append it to your JSON array.
                jsonArray.put(jsonObject);
                i++;
            }

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("SelectedQuantity", client_cart.getSelectedItemSize());
            jsonObject.put("SubPrice", client_cart.getSubPrice(products));
            jsonObject.put("AssemblyFee", client_cart.getAssemblyFee());
            jsonObject.put("Subtotal", client_cart.getSubTotal(products));

            // Write JSON to response
            jsonResponse.put("cartProducts", jsonArray);
            jsonResponse.put("Summary", jsonObject);
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

        System.out.println(loginUser);
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
                case "addToCart":
                    client_cart.addToCart(
                            jsonObject.getString("productId").trim(),
                            jsonObject.getInt("quantity"),
                            carts,
                            client_cart);
                    System.out.println("Cart added");
                    break;

                case "updateQuantity":
                    System.out.println(client_cart.getProduct_id());
                    client_cart.updateCart(
                            jsonObject.getString("productId").trim(),
                            jsonObject.getInt("quantity"),
                            carts,
                            client_cart
                    );

                    //Update cart_product
                    boolean found = false;
                    for (int i = 0; i < cart_products.size() ; i++) {
                        found = false;
                        for (String productSKU : client_cart.getProduct_id())
                        {
                            if(cart_products.get(i).getProduct_sku().trim().equals(productSKU.trim()))
                            {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            cart_products.remove(i);
                            break;
                        }
                    }

                    System.out.println("Quantity updated");
                    break;

                case "updateSelected":
                    client_cart.updateSelected(jsonObject.getString("productId").trim());
                    System.out.println("Selected Item updated");
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

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // Respond with status OK for preflight request
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public void destroy() {

    }
}
