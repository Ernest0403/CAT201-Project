package Class;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

public class Cart {
    private String username;
    private int client_id;
    private ArrayList<String> product_list = new ArrayList<>();
    private ArrayList<Integer> quantity_list = new ArrayList<>();
    private static String externalCsvPath;
    private static ArrayList<String> selectedItems = new ArrayList<>();
    private float assemblyFee = 30;
    private String shippingType;
    private float shippingFee = 20;
    private int SSTpercent = 6;

    //Constructor
    public Cart() {

    }

//    public Cart(int client_id) {
//        this.client_id = client_id;
//    }

    public Cart(String username) {
        this.username = username;
    }

    public static void setExternalCsvPath(String realPath) {
        externalCsvPath = realPath;
    }

    public void setCart(Cart cart) {
        this.username = cart.username;
        this.product_list = cart.product_list;
        this.quantity_list = cart.quantity_list;
    }

    public String getUsername() {
        return username;
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

    public void setShippingType(String shippingType) {
        this.shippingType = shippingType;
        if(shippingType.equals("fast"))
            shippingFee = 20;
        else
            shippingFee = 10;
    }

    public float getShippingFee() {
        return shippingFee;
    }

    //add changes to cart
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
            if(product_list.get(i).equals(product_id)){
                product_list.remove(i);
                quantity_list.remove(i);
            }
        }
    }


    //Update cart if add and subtract are handled in frontend
    public void updateCart(String product_id, int newQuantity, ArrayList<Cart> carts, Cart client_cart) {
        System.out.println("Update product_id" + product_id);
        System.out.println("New quantity from JSON" + newQuantity);

        for (int i = 0; i < client_cart.product_list.size(); i++) {
            System.out.println("Looping product_id" + client_cart.product_list.get(i));
            //This if not executed
            if (Objects.equals(client_cart.product_list.get(i), product_id)) {
                int quantityDiff = newQuantity - client_cart.quantity_list.get(i) ;
                client_cart.addCart(product_list.get(i), quantityDiff);

                if (newQuantity == 0) {
                    removeCart(product_id);
                    selectedItems.remove(product_id);
                }
                break;
            }
        }

        updateCartCSV(carts, client_cart);
    }

    public void addToCart(String product_id, int addQuantity, ArrayList<Cart> carts, Cart client_cart) {
        System.out.println("Update product_id" + product_id);
        System.out.println("New quantity from JSON" + addQuantity);

        for (int i = 0; i < client_cart.product_list.size(); i++) {
            System.out.println("Looping product_id" + client_cart.product_list.get(i));
            //This if not executed
            if (Objects.equals(client_cart.product_list.get(i), product_id)) {
                client_cart.addCart(product_list.get(i), addQuantity);
                break;
            }
        }

        updateCartCSV(carts, client_cart);
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

    public void updateSelected(String product_id){
        if(selectedItems.contains(product_id)){
            selectedItems.remove(product_id);
        }
        else {
            selectedItems.add(product_id);
        }
        System.out.println(selectedItems);
    }

    public int getSelectedItemSize(){
        int size = 0;
        int i = 0;
        for(String product_id : selectedItems){
            for(String productSKU : product_list){
                if(productSKU.equals(product_id)){
                    size += getQuantity(i);
                    break;
                }
                i++;
            }
            i = 0;
        }
        return size;
    }

    public ArrayList<String> getSelectedArray(){
        return selectedItems;
    }

    public float getSubPrice(ArrayList<Product> ProductList){
        float SubPrice = 0;
        int i = 0;
        for(String product_id : selectedItems){
            for(Product product : ProductList){
                if(product.getProduct_sku().equals(product_id) && (i < product_list.size())){
                    SubPrice += product.getProduct_discountedPrice() * getQuantity(i);
                }
            }
            i++;
        }
        return SubPrice;
    }

    public float getAssemblyFee(){
        if(selectedItems.isEmpty())
            return 0;
        else{
            return assemblyFee;
        }
    }

    public float getSubTotal(ArrayList<Product> ProductList){
        float subTotal = 0;
        subTotal += getSubPrice(ProductList);
        subTotal += getAssemblyFee();
        return subTotal;
    }

    public float getTaxFee(ArrayList<Product> ProductList){
        float taxFee = 0;
        taxFee += getSubTotal(ProductList);
        taxFee += shippingFee;
        taxFee = (float) (taxFee * 0.06);
        return (float) (Math.round(taxFee * 100.0) / 100.0);
    }

    public float getTaxTotal(ArrayList<Product> ProductList){
        float taxTotal = 0;
        taxTotal += getSubTotal(ProductList);
        taxTotal += shippingFee;
        taxTotal = (float) (taxTotal * 1.06);
        return (float) (Math.round(taxTotal * 100.0) / 100.0);
    }

    //Load Cart.csv that contains all the clients' cart data
    public static void loadCart(ArrayList<Product> products,
                                ArrayList<Cart> carts,
                                Cart client_cart,
                                ArrayList<Product> cart_products,
                                String username) throws IOException, CsvValidationException {
        carts.clear();
        client_cart.setCart(new Cart());
        cart_products.clear();

        CSVReader reader;
        try {
            reader = new CSVReader(
                    new FileReader(externalCsvPath)
            );
            System.out.println("File found"); //Found
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        String[] line;
        reader.readNext();
        System.out.println("Reader read");

        while ((line = reader.readNext()) != null) {
            System.out.println(Arrays.toString(line));
            if (line.length == 3) {
                String client = line[0].trim();
                String sku = line[1].trim();
                int quantity = Integer.parseInt(line[2].trim());

                boolean found = false;
                for (int i = 0; i < carts.size(); i++) {
                    if (carts.get(i).getUsername().equals(client)) {
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
            if (carts.get(i).getUsername().equals(username)) {
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

    //Need to refresh the cart once its quantity is zero
    public void updateCartCSV(ArrayList<Cart> carts, Cart client_cart){
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(
                        externalCsvPath, false)
            )
        ) {
            writer.write("\"client_id\",\"sku\",\"quantity\"");
            writer.newLine();
            writer.flush();

            System.out.println(carts.get(1).getUsername());
            for (Cart cart : carts) {
                System.out.println("Total of client carts");
                if (cart.getUsername().equals(client_cart.getUsername())) {
                    cart.setCart(client_cart);
                    int i = 0;
                    for(String product_id : cart.getProduct_id()){
                        writer.write(String.join(",",
                                new String[]{
                                String.valueOf(cart.getUsername()),
                                product_id,
                                String.valueOf(cart.getQuantity(i))
                            })

                        );
                        writer.newLine();
                        writer.flush();
                        System.out.println("Current login client carts");
                        i++;
                    }
                }
                else{
                    int i = 0;
                    for(String product_id : cart.getProduct_id()){
                        writer.write(String.join(",",
                                new String[]{
                                        String.valueOf(cart.getUsername()),
                                        product_id,
                                        String.valueOf(cart.getQuantity(i))
                                }
                        ));
                        writer.newLine();
                        writer.flush();
                        System.out.println("Other client carts");
                        i++;
                    }
                }
            }
            System.out.println("CSV file written successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
