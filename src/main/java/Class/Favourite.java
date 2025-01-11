package Class;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class Favourite {
    private int client_id;
    private ArrayList<String> product_list = new ArrayList<>();
    private static String externalCsvPath;

    public Favourite() {}

    public Favourite(int client_id) {
        this.client_id = client_id;
    }

    public Favourite(int client_id, ArrayList<String> product_list) {
        this.client_id = client_id;
        this.product_list = product_list;
    }

    public void setFavourite(Favourite fav){
        this.client_id = fav.client_id;
        this.product_list = fav.product_list;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public ArrayList<String> getProduct_list() {
        return product_list;
    }

    public String getProduct(int index) {
        return product_list.get(index);
    }

    public void setProduct_list(ArrayList<String> product_list) {
        this.product_list = product_list;
    }

    public static void setExternalCsvPath(String realPath) {
        externalCsvPath = realPath;
    }

    public void addFavourite(String productSku) {
        product_list.add(productSku);
    }

    public void removeFavourite(String productSku) {
        product_list.remove(productSku);
    }

    public static void loadFav(ArrayList<Product> products,
                                ArrayList<Favourite> favList,
                                Favourite client_fav,
                                ArrayList<Product> fav_products,
                                int client_id) throws IOException, CsvValidationException {
        CSVReader reader;
        try {
            reader = new CSVReader(
                    new FileReader(externalCsvPath)
            );
            System.out.println("File found"); //Found
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        favList.clear();
        String[] line;
        reader.readNext();
        System.out.println("Reader read");

        while ((line = reader.readNext()) != null) {
            System.out.println(Arrays.toString(line));
            if (line.length == 2) {
                int client = Integer.parseInt(line[0].trim());
                String sku = line[1].trim();

                boolean found = false;
                for (int i = 0; i < favList.size(); i++) {
                    if (favList.get(i).getClient_id() == client) {
                        favList.get(i).addFavourite(sku);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    favList.add(new Favourite(client));
                    favList.get(favList.size() - 1).addFavourite(sku);
                }
                System.out.println(sku);
            }
        }
        System.out.println("End of file reached.");

        for (int i = 0; i < favList.size() - 1; i++) {
            if (favList.get(i).getClient_id() == client_id) {
                client_fav.setFavourite(favList.get(i));
                System.out.println("client_fav added." + client_fav.getProduct_list());
                break;
            }
        }

        for (int i = 0; i < client_fav.getProduct_list().size(); i++) {
            //Search for the respective products in the products
            System.out.println("client_product list looped." + client_fav.getProduct(i));
            for (int k = 0; k < products.size(); k++) {
                System.out.println("product list looped." + products.get(k).getProduct_sku());
                if (client_fav.getProduct(i).equals(products.get(k).getProduct_sku())) {
                    fav_products.add(products.get(k));
                    System.out.println("client_product list added." + fav_products);
                    break;
                }
            }
        }
        System.out.println("client_fav list shown." + client_fav);
    }

}
