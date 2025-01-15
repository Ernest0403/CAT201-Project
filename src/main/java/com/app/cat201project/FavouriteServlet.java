package com.app.cat201project;

import com.opencsv.exceptions.CsvValidationException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import Class.*;

@WebServlet(name = "FavouriteServlet", value = "/Favourite-servlet")
public class FavouriteServlet extends HttpServlet {
    private int client_id = 1;
    ArrayList<Favourite> favouriteList = new ArrayList<Favourite>();                  //Stores data from Cart list
    Favourite client_fav = new Favourite();                                        //Stores data of the logged in client
    ArrayList<Product> products;          //Stores Products data of the system
    ArrayList<Product> fav_products = new ArrayList<Product>();//Temporarily set the client id to 1, will connect with log in client id
    String realPath;

    public void init() throws ServletException {
        super.init();
        String productRealPath = getServletContext().getRealPath("Database/catProjectDataset.csv");
        products = Global.getProductList(productRealPath);
        realPath = getServletContext().getRealPath("Database/Favourite.csv");
        Favourite.setExternalCsvPath(realPath);
        //Create a cart for a client, should be modified into reading from csv
        try {
            Favourite.loadFav(products, favouriteList, client_fav, fav_products, client_id);
        } catch (CsvValidationException | IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println("client_fav list shown." + client_fav.getProduct_list());
        System.out.println("fav_product list added." + fav_products);
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

        // Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        try {
            int i = 0;
            for (Product product : fav_products) {
                // create JSON object for each item
                JSONObject jsonObject = new JSONObject();

                jsonObject.put("productID", product.getProduct_sku().trim());
                jsonObject.put("image", product.getProduct_src());
                jsonObject.put("product", product.getProduct_name());

                jsonObject.put("tag", product.getProduct_itemCategory());
                jsonObject.put("price", product.getProduct_price());

                // append it to your JSON array.
                jsonArray.put(jsonObject);
                i++;
            }

            // Write JSON to response
            jsonResponse.put("favProducts", jsonArray);
            System.out.println(jsonResponse);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Internal server error occurred.\"}");
        }

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        response.setContentType("application/json");

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
                case "addToFav":
                    client_fav.addFavCSV(jsonObject.getString("productId").trim());
                    break;

                case "removeFav":
                    Favourite.removeFavCSV(favouriteList,
                            client_fav,
                            jsonObject.getString("productId").trim());
                    System.out.println("Favourite removed");
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
