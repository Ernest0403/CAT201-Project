package Class;

import java.util.ArrayList;

public class Product {
    private String product_sku;
    private String product_name;
    private String product_src;
    private String product_roomCategory;
    private String product_itemCategory;
    private String product_brand;
    private String product_dimension;
    private String product_weight;
    private String product_colour;
    private String product_material;
    private String product_manufacturer;
    private String product_arrivalDate;
    private int product_quantity;
    private float product_price;
    private float product_discount;
    private String product_warranty;
    private ArrayList<String> product_tags = new ArrayList<>();
    private float product_discountedPrice;
    private int product_orderVolume;

    public Product(String sku, String name, String imageURL, String roomCategory, String itemCategory, String brand, String dimension, String weight, String colour, String material, String manufacturer, String arrivalDate, int quantity, float price, float discount, String warranty, int orderVolume) {
        this.product_sku = sku;
        this.product_name = name;
        this.product_src = imageURL;
        this.product_roomCategory= roomCategory;
        this.product_itemCategory = itemCategory;
        this.product_brand = brand;
        this.product_dimension = dimension;
        this.product_weight = weight;
        this.product_colour = colour;
        this.product_material = material;
        this.product_manufacturer = manufacturer;
        this.product_arrivalDate = arrivalDate;
        this.product_quantity = quantity;
        this.product_price = price;
        this.product_discount = discount;
        this.product_warranty = warranty;
        this.product_discountedPrice = Float.parseFloat(String.format("%.2f", price * (1 - discount)));
        this.product_orderVolume = orderVolume;
    }

    public Product(String product_id, String product_name,
                   float product_price,
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

    public String getProduct_sku() { return product_sku; }
    public void setProduct_sku(String product_sku) { this.product_sku = product_sku; }

    public String getProduct_name() { return product_name; }
    public void setProduct_name(String product_name) { this.product_name = product_name; }

    public String getProduct_src() { return product_src; }
    public void setProduct_src(String product_src) { this.product_src = product_src; }

    public String getProduct_roomCategory() { return product_roomCategory; }
    public void setProduct_roomCategory(String product_roomCategory) { this.product_roomCategory = product_roomCategory; }

    public String getProduct_itemCategory() { return product_itemCategory; }
    public void setProduct_itemCategory(String product_itemCategory) { this.product_itemCategory = product_itemCategory; }

    public String getProduct_brand() { return product_brand; }
    public void setProduct_brand(String product_brand) { this.product_brand = product_brand; }

    public String getProduct_dimension() { return product_dimension; }
    public void setProduct_dimension(String product_dimension) { this.product_dimension = product_dimension; }

    public String getProduct_weight() { return product_weight; }
    public void setProduct_weight(String product_weight) { this.product_weight = product_weight; }

    public String getProduct_colour() { return product_colour; }
    public void setProduct_colour(String product_colour) { this.product_colour = product_colour; }

    public String getProduct_material() { return product_material; }
    public void setProduct_material(String product_material) { this.product_material = product_material; }

    public String getProduct_manufacturer() { return product_manufacturer; }
    public void setProduct_manufacturer(String product_manufacturer) { this.product_manufacturer = product_manufacturer; }

    public String getProduct_arrivalDate() { return product_arrivalDate; }
    public void setProduct_arrivalDate(String product_arrivalDate) { this.product_arrivalDate = product_arrivalDate; }

    public int getProduct_quantity() { return product_quantity; }
    public void setProduct_quantity(int product_quantity) { this.product_quantity = product_quantity; }

    public float getProduct_price() { return product_price; }
    public void setProduct_price(float product_price) { this.product_price = product_price; }

    public float getProduct_discount() { return product_discount; }
    public void setProduct_discount(float product_discount) { this.product_discount = product_discount; }

    public String getProduct_warranty() { return product_warranty; }
    public void setProduct_warranty(String product_warranty) { this.product_warranty = product_warranty; }

    public ArrayList<String> getProduct_tags() { return product_tags; }
    public void addProduct_tag(String product_tag) {
        if (product_tags == null) {
            product_tags = new ArrayList<>();
        }
        product_tags.add(product_tag);
    }

    public float getDiscountedPrice() {
        return product_discountedPrice;
    }

    public void setDiscountedPrice(float discountedPrice) {
        this.product_discountedPrice = discountedPrice;
    }

    public int getOrderVolume() {
        return product_orderVolume;
    }

    public void setProduct_orderVolume(int orderVolume) {
        this.product_orderVolume = orderVolume;
    }

}
