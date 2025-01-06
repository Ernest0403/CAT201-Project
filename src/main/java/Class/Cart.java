package Class;

import java.util.ArrayList;

public class Cart {
    private int client_id;
    private ArrayList<Integer> product_list = new ArrayList<>();
    private ArrayList<Integer> quantity_list = new ArrayList<>();

    //Constructor
    public Cart(int client_id) {
        this.client_id = client_id;
    }

    //Getter
    public int getClient_id() {
        return client_id;
    }

    public void getPro_Quantity(int product_id) {
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
    public void addCart(int product_id, int quantity) {
        for(int i = 0; i < product_list.size(); i++)
        {
            if(product_list.get(i) == product_id){
                quantity_list.set(i, quantity_list.get(i) + quantity);
            }
            else{
                product_list.add(product_id);
                quantity_list.add(quantity);
            }
        }
    }

    //Remove from cart
    public void removeCart(int product_id) {
        for(int i = 0; i < product_list.size(); i++)
        {
            product_list.remove(i);
            quantity_list.remove(i);
        }
    }

    //Subtract from cart
    public void subtractCart(int product_id, int quantity) {
        for (int i = 0; i < product_list.size(); i++) {
            if (product_list.get(i) == product_id) {
                quantity_list.set(i, quantity_list.get(i) - quantity);
            }
            if (quantity_list.get(i) == 0) {
                removeCart(product_id);
            }
        }
    }
}
