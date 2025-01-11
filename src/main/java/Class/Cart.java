package Class;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class Cart {
    private int client_id;
    private ArrayList<String> product_list = new ArrayList<>();
    private ArrayList<Integer> quantity_list = new ArrayList<>();

    //Constructor
    public Cart() {

    }

    public Cart(int client_id) {
        this.client_id = client_id;
    }

    public void setCart(Cart cart) {
        this.client_id = cart.client_id;
        this.product_list = cart.product_list;
        this.quantity_list = cart.quantity_list;
    }

    public int getClient_id() {
        return client_id;
    }

    public void getPro_Quantity(String product_id) {
        for (int i = 0; i < product_list.size(); i++) {
            if (product_list.get(i) == product_id) {
                System.out.println("Product_id: " + product_list.get(i));
                System.out.println("Quantity: " + quantity_list.get(i));
            }
            else{
                System.out.println("Item not found in cart");
            }
        }
    }

    //Add to cart
    public void addCart(String product_id, int quantity) {
        if(product_list.size() == 0){
            product_list.add(product_id);
            quantity_list.add(quantity);
        }
        else {
            boolean found = false;
            for(int i = 0; i < product_list.size(); i++)
            {
                if(product_list.get(i) == product_id){
                    quantity_list.set(i, quantity_list.get(i) + quantity);
                    found = true;
                }
            }
            if(!found){
                product_list.add(product_id);
                quantity_list.add(quantity);
            }
        }
    }

    //Remove from cart
    public void removeCart(String product_id) {
        for(int i = 0; i < product_list.size(); i++)
        {
            product_list.remove(i);
            quantity_list.remove(i);
        }
    }

    //Subtract from cart
    public void subtractCart(String product_id, int quantity) {
        for (int i = 0; i < product_list.size(); i++) {
            if (product_list.get(i) == product_id) {
                quantity_list.set(i, quantity_list.get(i) - quantity);
            }
            if (quantity_list.get(i) == 0) {
                removeCart(product_id);
            }
        }
    }

    //Update cart if add and subtract are handled in frontend
    public void updateCart(String product_id, int newQuantity, ArrayList<Cart> carts, Cart client_cart, String realPath) {
        for (int i = 0; i < product_list.size(); i++) {
            if (product_list.get(i) == product_id) {
                quantity_list.set(i, newQuantity);
            }
            if (quantity_list.get(i) == 0) {
                removeCart(product_id);
            }
        }
        updateCartCSV(carts, client_cart, realPath);
    }

    public ArrayList<String> getProduct_id(){
        return product_list;
    }

    public String getProduct_id(int index){
        return product_list.get(index);
    }

    public int getProductListSize(){
        return product_list.size();
    }

    public int getQuantity(int index){
        return quantity_list.get(index);
    }

    //Load Cart.csv that contains all the clients' cart data
    public static void loadCart(ArrayList<Product> products,
                                ArrayList<Cart> carts,
                                Cart client_cart,
                                ArrayList<Product> cart_products,
                                int client_id,
                                String realPath) throws IOException, CsvValidationException {
        CSVReader reader;
        try {
            reader = new CSVReader(
                    new FileReader(realPath)
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

    public void updateCartCSV(ArrayList<Cart> carts, Cart client_cart, String realPath){
        try (CSVWriter writer = new CSVWriter(
                new FileWriter(
                        realPath, false)
            )
        ) {
            writer.writeNext(new String[]{"client_id", "sku", "quantity"});
            for (Cart cart : carts) {
                if (cart.getClient_id() == client_cart.getClient_id()) {
                    cart.setCart(client_cart);
                    int i = 0;
                    for(String product_id : cart.getProduct_id()){
                        writer.writeNext(new String[]{
                                String.valueOf(client_cart.getClient_id()),
                                "\"" + product_id + "\"",
                                String.valueOf(client_cart.getQuantity(0))
                            }
                        );
                    }
                }
                else{
                    for(String product_id : cart.getProduct_id()){
                        writer.writeNext(new String[]{
                                        String.valueOf(client_cart.getClient_id()),
                                        "\"" + product_id + "\"",
                                        String.valueOf(client_cart.getQuantity(0))
                                }
                        );
                    }
                }
            }
            System.out.println("CSV file written successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
