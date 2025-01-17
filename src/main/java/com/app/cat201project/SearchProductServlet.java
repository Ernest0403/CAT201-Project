package com.app.cat201project;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;

import Class.Product;
import Class.Global;

@WebServlet(name = "SearchProductServlet", value = "/Search-product-servlet")
public class SearchProductServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String query = request.getParameter("id");

        if (query == null || query.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Search query is required\"}");
            return;
        }

        ArrayList<Product> products = Global.getProductList(getServletContext());

        ArrayList<Product> filteredResults = new ArrayList<>();
        for (Product item : products) {
            String lowerQuery = query.toLowerCase();

            if (item.getProduct_name().toLowerCase().contains(lowerQuery) ||
                    item.getProduct_brand().toLowerCase().contains(lowerQuery) ||
                    item.getProduct_colour().toLowerCase().contains(lowerQuery) ||
                    item.getProduct_manufacturer().toLowerCase().contains(lowerQuery) ||
                    item.getProduct_material().toLowerCase().contains(lowerQuery) ||
                    item.getProduct_dimension().toLowerCase().contains(lowerQuery) ||
                    item.getProduct_weight().toLowerCase().contains(lowerQuery))
            {
                filteredResults.add(item);
            };
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        String json = gson.toJson(filteredResults);
        response.getWriter().write(json);
    }
}

