package Class;

import java.util.ArrayList;
import java.util.Arrays;

public class Global {
    private static ArrayList<Product> ProductList = new ArrayList<Product>();

    //Can modify the code to read file from csv file
    public static ArrayList<Product> getProductList() {
        for(int i = 1; i < 10; i++){
            ProductList.add(new Product(i,
                    "Table",
                    1,
                    1,
                    "/Images/cart.jpg",
                    new ArrayList<>(Arrays.asList("Holiao", "Very Holiao"))
                    )
            );
        }
        return ProductList;
    }
}
