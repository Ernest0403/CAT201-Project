package Class;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class Global {
    private static final String FILE_PATH = Global.class.getClassLoader().getResource("catProjectDataset.csv").getPath();

    public static ArrayList<Product> getProductList() {
        ArrayList<Product> ProductList = new ArrayList<Product>();

        try (CSVReader reader = new CSVReader(new FileReader(FILE_PATH))) {
            String[] line;
            reader.readNext();

            while ((line = reader.readNext()) != null) {
                if (line.length == 17) {
                    String sku = line[0];
                    String name = line[1];
                    String imageURL = line[2];
                    String roomCategory = line[3];
                    String itemCategory = line[4];
                    String brand = line[5];
                    String dimension = line[6];
                    String weight = line[7];
                    String colour = line[8];
                    String material = line[9];
                    String manufacturingCountry = line[10];
                    String arrivalDate = line[11];
                    int quantity = Integer.parseInt(line[12]);
                    float price = Float.parseFloat(line[13].replace("RM", "").trim());
                    float discount = parseDiscount(line[14]);
                    String warranty = line[15];
                    int orderVolume = Integer.parseInt(line[16]);

                    Product product = new Product(sku, name, imageURL, roomCategory, itemCategory, brand, dimension, weight, colour, material, manufacturingCountry, arrivalDate, quantity, price, discount, warranty, orderVolume);
                    ProductList.add(product);
                }
            }
        } catch (Exception e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        return ProductList;
    }

    private static float parseDiscount(String discountStr) {
        discountStr = discountStr.replace("%", "").trim();
        float discount = Float.parseFloat(discountStr);

        if (discount >= 1) {
            discount = discount / 100;
        }
        return discount;
    }
    }

