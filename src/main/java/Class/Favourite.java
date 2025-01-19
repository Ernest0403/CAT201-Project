package Class;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

public class Favourite {
    private String username;
    private ArrayList<String> product_list = new ArrayList<>();
    private static String externalCsvPath;

    public Favourite() {}

    public Favourite(String username) {
        this.username = username;
    }

    public Favourite(String username, ArrayList<String> product_list) {
        this.username = username;
        this.product_list = product_list;
    }

    public void setFavourite(Favourite fav){
        this.username = fav.username;
        this.product_list = fav.product_list;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
        if(!product_list.contains(productSku)) {
            product_list.add(productSku);
            System.out.println("Added Fav: " + productSku);
        }
    }

    public void removeFavourite(String productSku) {
        product_list.remove(productSku);
    }

    public void addFavCSV(String productSku) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(
                        externalCsvPath, true)
        )
        ) {
            if(!product_list.contains(productSku)) {
                writer.newLine();
                writer.write(String.join(",",
                        new String[]{
                                username,
                                productSku,
                        }));
            }
            product_list.add(productSku);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void loadFav(ArrayList<Product> products,
                                ArrayList<Favourite> favList,
                                Favourite client_fav,
                                ArrayList<Product> fav_products,
                                String username) throws IOException, CsvValidationException {
        favList.clear();
        client_fav.setFavourite(new Favourite());
        fav_products.clear();

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
                String client = line[0].trim();
                String sku = line[1].trim();

                boolean found = false;
                for (int i = 0; i < favList.size(); i++) {
                    if (favList.get(i).getUsername().equals(client)) {
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
        System.out.println(favList.get(0).getUsername());
        System.out.println();

        boolean existUser = false;
        for (int i = 0; i < favList.size(); i++) {
            if (favList.get(i).getUsername().equals(username)) {
                System.out.println(favList.get(i).getUsername());
                client_fav.setFavourite(favList.get(i));
                System.out.println("client_fav added." + client_fav.getProduct_list());
                existUser = true;
                break;
            }
        }
        if(!existUser) {
            client_fav.setUsername(username);
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

    public static void writeFav(ArrayList<Favourite> favList, Favourite client_fav){
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(
                        externalCsvPath, false)
            )
        ){
            writer.write("\"client_id\",\"sku\"");
            writer.newLine();

            for (Favourite fav : favList) {
                System.out.println("Total of client favs");
                if (fav.getUsername().equals(client_fav.getUsername())) {
                    fav.setFavourite(client_fav);
                    int i = 0;
                    for(String product_id : fav.getProduct_list()){
                        writer.write(String.join(",",
                                new String[]{
                                        String.valueOf(fav.getUsername()),
                                        product_id
                                })

                        );
                        writer.newLine();
                        System.out.println("Current login client favs");
                        i++;
                    }
                }
                else{
                    int i = 0;
                    for(String product_id : fav.getProduct_list()){
                        writer.write(String.join(",",
                                new String[]{
                                        String.valueOf(fav.getUsername()),
                                        product_id
                                }
                        ));
                        writer.newLine();
                        System.out.println("Other client favs");
                        i++;
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void removeFavCSV(ArrayList<Favourite> favList, Favourite client_fav, String product_id){
        client_fav.removeFavourite(product_id);
        writeFav(favList, client_fav);
    }
}
