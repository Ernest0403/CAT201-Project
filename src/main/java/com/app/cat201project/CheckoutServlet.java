package com.app.cat201project;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

@WebServlet(name = "CheckoutServlet", value = "/Checkout-servlet")
public class CheckoutServlet extends HttpServlet {
    private String loginUser;
    private int client_id = 1;                                //Temporarily set the client id to 1, will connect with log in client id
    ArrayList<Cart> carts = new ArrayList<Cart>();               //Stores data from Cart list
    Cart client_cart = new Cart();                            //Stores data of the logged in client
    ArrayList<Product> products;                              //Stores Products data of the system
    ArrayList<Product> cart_products = new ArrayList<Product>();    //Stores Products that is within the logged in client's cart
    String realPath;

    public void init() throws ServletException {
        super.init();

        loginUser = Global.LoginUser;

        String productRealPath = getServletContext().getRealPath("Database/catProjectDataset.csv");
        products = Global.getProductList(productRealPath);
        realPath = getServletContext().getRealPath("Database/Cart.csv");
        Cart.setExternalCsvPath(realPath);
        System.out.println("Resolved File Path: " + realPath);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setStatus(HttpServletResponse.SC_OK);
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
        try {
            Cart.loadCart(products, carts, client_cart, cart_products, loginUser);
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
                for (String selectedSKU : client_cart.getSelectedArray()){
                    if(selectedSKU.equals(product.getProduct_sku().trim())){
                        // create JSON object for each item
                        JSONObject jsonObject = new JSONObject();

                        jsonObject.put("productID", product.getProduct_sku().trim());
                        jsonObject.put("product", product.getProduct_name());
                        jsonObject.put("price", product.getProduct_discountedPrice());
                        jsonObject.put("quantity", client_cart.getQuantity(i));
                        jsonArray.put(jsonObject);

                    }
                }
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

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
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
        try{
            JSONObject jsonObject = new JSONObject(json.toString());
            String action = jsonObject.getString("action").trim(); // Get the action identifier
            System.out.println("Received JSON: " + jsonObject);
            switch (action) {
                case "createOrder":
                    String orderPath = getServletContext().getRealPath("Database/order.csv");
                    Order.setExternalCsvPath(orderPath);
                    String orderRecord = "";
                    orderRecord += String.valueOf(Order.getOrdersCount()); orderRecord += ',';
                    orderRecord += jsonObject.getString("ShippingRecipientName").trim(); orderRecord += ',';
                    orderRecord += jsonObject.getString("ShippingContactNumber").trim(); orderRecord += ',';
                    orderRecord += jsonObject.getString("ShippingAddress").trim(); orderRecord += ',';

                    //Get the productSKU into a string
                    JSONArray itemsArray = jsonObject.getJSONArray("items");
                    StringBuilder quantityBuilder = new StringBuilder();
                    StringBuilder skuBuilder = new StringBuilder();
                    int quantity = 0;
                    for (int i = 0; i < itemsArray.length(); i++) {
                        JSONObject item = itemsArray.getJSONObject(i);
                        if (!skuBuilder.isEmpty()) {
                            skuBuilder.append("|");
                            quantityBuilder.append("|");
                        }
                        skuBuilder.append(item.getString("productSKU"));
                        quantityBuilder.append(item.getInt("productQuantity"));

                        String SKU = item.getString("productSKU");
                        System.out.println(SKU);
                        for(int j = 0; j < cart_products.size(); j++){
                            if(SKU.equals(cart_products.get(j).getProduct_sku())){
                                cart_products.remove(j);
                                client_cart.removeCart(SKU);
                                for (Cart cart: carts){
                                    if(cart.getUsername().equals(loginUser)){
                                        cart.setCart(client_cart);
                                    }
                                }
                            }
                        }
                    }

                    orderRecord += skuBuilder.toString(); orderRecord += ',';
                    orderRecord += quantityBuilder.toString(); orderRecord += ',';
                    orderRecord += jsonObject.getInt("quantity"); orderRecord += ',';
                    orderRecord += jsonObject.getFloat("productPrice"); orderRecord += ',';
                    orderRecord += jsonObject.getFloat("deliveryFee"); orderRecord += ',';
                    orderRecord += jsonObject.getFloat("assemblyFee"); orderRecord += ',';
                    orderRecord += jsonObject.getFloat("sst"); orderRecord += ',';
                    orderRecord += jsonObject.getFloat("TotalPayment"); orderRecord += ',';
                    orderRecord += jsonObject.getString("PaymentType").trim(); orderRecord += ',';
                    orderRecord += "Completed"; orderRecord += ',';
                    orderRecord += ',';orderRecord += ',';orderRecord += ',';
                    orderRecord += String.valueOf(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                    System.out.println(orderRecord);

                    //more details to be added
                    try (BufferedWriter writer = new BufferedWriter(new FileWriter( getServletContext().getRealPath("Database/order.csv"), true))){
                        writer.newLine();
                        writer.write(orderRecord);
                    } catch (IOException e) {
                        e.printStackTrace(); // Log the error
                    }

                    client_cart.updateCartCSV(carts, client_cart);
                    break;

                default:
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("Invalid action!");
                    break;
            }
        } catch(Exception e)

        {
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
}
