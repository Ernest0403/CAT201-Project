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
    private static ArrayList<Product> ProductList = new ArrayList<Product>();
    private static final String FILE_PATH = Global.class.getClassLoader().getResource("catProjectDataset.csv").getPath();

    public static ArrayList<Product> getProductList() {

        try (CSVReader reader = new CSVReader(new FileReader(FILE_PATH))) {
            String[] line;
            reader.readNext();

            while ((line = reader.readNext()) != null) {
                if (line.length == 16) {
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

                    Product product = new Product(sku, name, imageURL, roomCategory, itemCategory, brand, dimension, weight, colour, material, manufacturingCountry, arrivalDate, quantity, price, discount, warranty);
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

    //Currently using bufferedreader from java.io library
    //Load Cart.csv that contains all the clients' cart data
    public static void loadCart(ArrayList<Product> products,
                                ArrayList<Cart> carts,
                                Cart client_cart,
                                ArrayList<Product> cart_products,
                                int client_id) throws IOException, CsvValidationException {
        CSVReader reader;
        try {
            reader = new CSVReader(
                    new FileReader(
                            Global.class.getClassLoader().getResource("Cart.csv").getPath()
                    )
            );
            System.out.println("File found"); //Found
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        carts.clear();
        String[] line;
        reader.readNext();
        System.out.println("Reader read");

        while ((line = reader.readNext()) != null) {
            System.out.println(Arrays.toString(line));
            if (line.length == 3) {
                int client = Integer.parseInt(line[0].trim());
                String sku = line[1].trim();
                int quantity = Integer.parseInt(line[2].trim());

                boolean found = false;
                for (int i = 0; i < carts.size(); i++) {
                    if (carts.get(i).getClient_id() == client) {
                        carts.get(i).addCart(sku, quantity);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    carts.add(new Cart(client));
                    carts.get(carts.size() - 1).addCart(sku, quantity);
                }
                System.out.println(sku + "" + quantity);
            }
        }
            System.out.println("End of file reached.");

            for (int i = 0; i < carts.size() - 1; i++) {
                if (carts.get(i).getClient_id() == client_id) {
                    client_cart.setCart(carts.get(i));
                    System.out.println("client_cart added." + client_cart.getProduct_id());
                    break;
                }
            }

            //for each cart product in the list
            for (int i = 0; i < client_cart.getProduct_id().size(); i++) {
                //Search for the respective products in the products
                System.out.println("client_product list looped." + client_cart.getProduct_id(i));
                for (int k = 0; k < products.size(); k++) {
                    System.out.println("product list looped." + products.get(k).getProduct_sku());
                    if (client_cart.getProduct_id(i).equals(products.get(k).getProduct_sku())) {
                        cart_products.add(products.get(k));
                        System.out.println("client_product list added." + cart_products);
                        break;
                    }
                }
            }
        System.out.println("client_cart list shown." + client_cart);
        }
    }