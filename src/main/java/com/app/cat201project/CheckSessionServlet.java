package com.app.cat201project;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/CheckSessionServlet")
public class CheckSessionServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        HttpSession session = request.getSession(false);
        PrintWriter out = response.getWriter();

        if (session == null || session.getAttribute("username") == null) {
            out.write("{\"status\":\"error\",\"message\":\"User not logged in.\"}");
        } else {
            String username = (String) session.getAttribute("username");
            out.write("{\"status\":\"success\",\"username\":\"" + username + "\"}");
        }
    }
}



