package com.app.cat201project;

import java.io.*;
import java.util.ArrayList;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Class.Cart;
import Class.Product;
import Class.Global;

@WebServlet(name = "CartServlet", value = "/Cart-servlet")
public class CartServlet extends HttpServlet{
    private int client_id = 1;
    ArrayList<Cart> carts = new ArrayList<Cart>();
    Cart client_cart = null;
    ArrayList<Product> products = Global.getProductList();
    ArrayList<Product> cart_products = new ArrayList<Product>();

    public void loadCart() throws IOException {
        String filePath = getServletContext().getRealPath("/Database/Cart.csv");
        FileReader fr = new FileReader(filePath);
        BufferedReader reader = new BufferedReader(fr);
        carts.clear();
        String line;

        reader.readLine();

        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(",", -1); // Handle empty trailing fields
            if (parts.length < 3) {
                System.out.println("Skipping invalid line: " + line);
                continue;
            }

            int client = Integer.parseInt(parts[0].trim());
            int sku = Integer.parseInt(parts[1].trim());
            int quantity = Integer.parseInt(parts[2].trim());

            if(carts.size() == 0) {
                carts.add(new Cart(client));
                carts.get(0).addCart(sku,quantity);
                System.out.println("Added new 0 cart " + client + " " + sku + " " + quantity);
                System.out.println(carts.get(0).getClient_id()+" "+carts.get(0).getProduct_id());
            }
            else{
                boolean found = false;
                for(int i = 0; i < carts.size(); i++) {
                    if(carts.get(i).getClient_id() == client){
                        System.out.println("Added cart " + client + " " + sku + " " + quantity);
                        carts.get(i).addCart(sku,quantity);
                        found = true;
                        System.out.println(carts.get(0).getClient_id()+" "+carts.get(0).getProduct_id());
                        break;
                    }
                }
                if(!found) {
                    carts.add(new Cart(client));
                    carts.get(carts.size()-1).addCart(sku,quantity);
                    System.out.println("Added new cart " + client + " " + sku + " " + quantity);
                    System.out.println(carts.get(0).getClient_id()+" "+carts.get(0).getProduct_id());
                }
            }
        }

        for (int i = 0; i < carts.size()-1 ; i++){
            if(carts.get(i).getClient_id() == client_id){
                client_cart = carts.get(i);
                System.out.println(client_cart.getClient_id());
                break;
            }
        }

        //for each cart product in the list
        for (int i = 0; i <= client_cart.getProduct_id().size()-1; i++){
            //Search for the respective products in the products
            for (int k = 0; k <= products.size() -1;k++) {
                if(client_cart.getProduct_id(i) == products.get(k).getProduct_sku()){
                    Product tempProduct = products.get(k);
                    cart_products.add(tempProduct);
                }
            }
        }
    }

    public void destroyCart(){
        // Need to clear the content so it wont stack on the next request
        carts = new ArrayList<Cart>();
        client_cart = null;
        cart_products = new ArrayList<Product>();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //Create a cart for a client, should be modified into reading from csv
        loadCart();

        // Enable CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);

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
