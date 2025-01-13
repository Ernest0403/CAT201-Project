package Class;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class Order {
    private int order_id;
    private String order_orderNumber;
    private Customer order_customer;
    private List<ProductItem> order_products;
    private OrderDetails order_orderDetails;
    private PaymentDetails order_paymentDetails;
    private CancellationDetails order_cancellationDetails;
    private String order_status;
    private String order_orderDate;

    private static String externalCsvPath;
    private static int ordersCount;

    public Order() {};

    public Order(List<String> values) {
        this.order_id = Integer.parseInt(values.get(0));
        this.order_orderNumber = values.get(1);

        this.order_customer = new Customer(
                values.get(2),  // username
                values.get(3),  // contact number
                values.get(4)   // address
        );

        this.order_products = new ArrayList<>();
        String[] productIds = values.get(5).split("\\|");
        String[] quantities = values.get(6).split("\\|");

        for (int i = 0; i < productIds.length; i++) {
            this.order_products.add(new ProductItem(
                    Integer.parseInt(productIds[i]),  // product ID
                    Integer.parseInt(quantities[i])   // quantity
            ));
        }

        this.order_orderDetails = new OrderDetails(
                Integer.parseInt(values.get(7)),   // total items
                Double.parseDouble(values.get(8)), // product price
                Double.parseDouble(values.get(9)), // delivery fee
                Double.parseDouble(values.get(10)),// assembly fee
                Double.parseDouble(values.get(11)),// SST
                Double.parseDouble(values.get(12)) // total
        );

        this.order_paymentDetails = new PaymentDetails(
                values.get(13), // payment type
                values.get(14)  // payment status
        );

        this.order_cancellationDetails = new CancellationDetails(
                values.get(15).isEmpty() ? null : values.get(15), // cancellation reason
                values.get(16).isEmpty() ? null : values.get(16)  // cancellation date
        );

        this.order_status = values.get(17); // order status
        this.order_orderDate = values.get(18); // order date
    }

    public int getOrder_id() { return order_id; }
    public String getOrder_orderNumber() { return order_orderNumber; }
    public Customer getOrder_customer() { return order_customer; }
    public List<ProductItem> getOrder_products() { return order_products; }
    public OrderDetails getOrder_orderDetails() { return order_orderDetails; }
    public PaymentDetails getOrder_paymentDetails() { return order_paymentDetails; }
    public CancellationDetails getOrder_cancellationDetails() { return order_cancellationDetails; }
    public String getOrder_status() { return order_status; }
    public String getOrder_orderDate() { return order_orderDate; }

    public void setOrder(Order order){
        this.order_id = order.getOrder_id();
        this.order_orderNumber = order.getOrder_orderNumber();
        this.order_customer = order.getOrder_customer();
        this.order_products = order.getOrder_products();
        this.order_orderDetails = order.getOrder_orderDetails();
        this.order_paymentDetails = order.getOrder_paymentDetails();
        this.order_cancellationDetails = order.getOrder_cancellationDetails();
        this.order_status = order.getOrder_status();
        this.order_orderDate = order.getOrder_orderDate();
    }
    public static void setExternalCsvPath(String externalPath) { externalCsvPath = externalPath; }

    public static class Customer {
        private String username;
        private String contactNumber;
        private String address;

        public Customer() {};

        public Customer(String username, String contactNumber, String address) {
            this.username = username;
            this.contactNumber = contactNumber;
            this.address = address;
        }

        public String getUsername() { return username; }
        public String getContactNumber() { return contactNumber; }
        public String getAddress() { return address; }
    }

    public static class ProductItem {
        private int productId;
        private int quantity;

        public ProductItem() {};

        public ProductItem(int productId, int quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        public int getProductId() { return productId; }
        public int getQuantity() { return quantity; }
    }

    public static class OrderDetails {
        private int totalItems;
        private double productPrice;
        private double deliveryFee;
        private double assemblyFee;
        private double sst;
        private double total;

        public OrderDetails() {};

        public OrderDetails(int totalItems, double productPrice, double deliveryFee, double assemblyFee, double sst, double total) {
            this.totalItems = totalItems;
            this.productPrice = productPrice;
            this.deliveryFee = deliveryFee;
            this.assemblyFee = assemblyFee;
            this.sst = sst;
            this.total = total;
        }

        public int getTotalItems() { return totalItems; }
        public double getProductPrice() { return productPrice; }
        public double getDeliveryFee() { return deliveryFee; }
        public double getAssemblyFee() { return assemblyFee; }
        public double getSst() { return sst; }
        public double getTotal() { return total; }
    }

    public static class PaymentDetails {
        private String paymentType;
        private String paymentStatus;

        public PaymentDetails() {};

        public PaymentDetails(String paymentType, String paymentStatus) {
            this.paymentType = paymentType;
            this.paymentStatus = paymentStatus;
        }

        public String getPaymentType() { return paymentType; }
        public String getPaymentStatus() { return paymentStatus; }
    }

    public static class CancellationDetails {
        private String cancellationReason;
        private String cancellationDate;

        public CancellationDetails() {};

        public CancellationDetails(String cancellationReason, String cancellationDate) {
            this.cancellationReason = cancellationReason;
            this.cancellationDate = cancellationDate;
        }

        public String getCancellationReason() { return cancellationReason; }
        public String getCancellationDate() { return cancellationDate; }
    }

    public static void loadOrderCSV(ArrayList<Product> products,
                                    ArrayList<Order> orderList,
                                    Order client_order,
                                    ArrayList<Product> order_products,
                                    String client_username) throws CsvValidationException, IOException {
        orderList.clear();
        order_products.clear();
        ordersCount = 0;

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
            Order order = new Order(List.of(line));
            orderList.add(order);
            ordersCount++;
        }
        System.out.println("End of file reached.");

        for (int i = 0; i < orderList.size() - 1; i++) {
            if (orderList.get(i).getOrder_customer().getUsername().equals(client_username)) {
                client_order.setOrder(orderList.get(i));
                System.out.println("client_order added.");
                break;
            }
        }
    }

    //Need to define a new order first
    //Load order to know the next value
    //then exec this function
    public void writeOrderCSV(){
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(
                        externalCsvPath, true)
        )
        ) {
            //Get product IDs
            String productID = new String();
            for(int i = 0; i < getOrder_products().size(); i++){
                productID += getOrder_products().get(i).getProductId();
                productID += '|';
            }

            //Get quantities
            String quantity = new String();
            for(int i = 0; i < getOrder_products().size(); i++){
                quantity += getOrder_products().get(i).getQuantity();
                quantity += '|';
            }
            writer.write(String.join(",",
                            new String[]{
                                    String.valueOf(ordersCount+1),
                                    getOrder_customer().getUsername(),
                                    getOrder_customer().getContactNumber(),
                                    getOrder_customer().getAddress(),
                                    productID,
                                    quantity,
                                    String.valueOf(getOrder_orderDetails().getTotalItems()),
                                    String.valueOf(getOrder_orderDetails().getProductPrice()),
                                    String.valueOf(getOrder_orderDetails().getDeliveryFee()),
                                    String.valueOf(getOrder_orderDetails().getAssemblyFee()),
                                    String.valueOf(getOrder_orderDetails().getSst()),
                                    String.valueOf(getOrder_orderDetails().getTotal()),
                                    getOrder_paymentDetails().getPaymentType(),
                                    getOrder_paymentDetails().getPaymentStatus(),
                                    getOrder_cancellationDetails().getCancellationReason(),
                                    getOrder_cancellationDetails().getCancellationDate(),
                                    getOrder_status(),
                                    getOrder_orderDate()
                            }));
            System.out.println("CSV file written successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
