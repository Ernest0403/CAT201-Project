package Class;

import java.util.ArrayList;

public class Product {
    private int product_sku;
    private String product_name;
    private int product_price;
    private int product_quantity;
    private String product_src;
    private ArrayList<String> product_tags;

    public Product() {

    }

    public Product(int product_id, String product_name,
                   int product_price,
                   int product_quantity,
                   String product_src,
                   ArrayList<String> product_tags) {
        this.product_sku = product_id;
        this.product_name = product_name;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_src = product_src;
        this.product_tags = product_tags;
    }

    public int getProduct_sku() {
        return product_sku;
    }

    public void setProduct_sku(int product_sku) {
        this.product_sku = product_sku;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public int getProduct_price() {
        return product_price;
    }

    public void setProduct_price(int product_price) {
        this.product_price = product_price;
    }

    public int getProduct_quantity() {
        return product_quantity;
    }

    public void setProduct_quantity(int product_quantity) {
        this.product_quantity = product_quantity;
    }

    public String getProduct_src() {
        return product_src;
    }

    public void setProduct_src(String product_src) {
        this.product_src = product_src;
    }

    public ArrayList<String> getProduct_tags() {
        return product_tags;
    }

    public void addProduct_tag(String product_tag) {
        if (product_tags == null) {
            product_tags = new ArrayList<>();
        }
        product_tags.add(product_tag);
    }
}

