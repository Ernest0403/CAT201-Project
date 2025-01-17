package Class;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import java.time.LocalDate;

import java.io.*;
import java.util.*;

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
    private String order_comment;
    private String order_arrivingDate;

    private static Map<Integer, Order> orderMap = new HashMap<>();

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
        String[] productSkus = values.get(5).split("\\|");
        String[] quantities = values.get(6).split("\\|");

        for (int i = 0; i < productSkus.length; i++) {
            this.order_products.add(new ProductItem(
                    productSkus[i],  // product Sku
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
        this.order_comment = values.get(19).isEmpty() ? null : values.get(19);
        this.order_arrivingDate = values.get(20);
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
    public String getOrder_comment() { return order_comment; }
    public String getOrder_arrivingDate() { return order_arrivingDate; }
    public static int getOrdersCount() { return ordersCount; }

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
        this.order_comment = order.getOrder_comment();
        this.order_arrivingDate = order.getOrder_arrivingDate();
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
        private String productSku;
        private int quantity;

        public ProductItem() {};

        public ProductItem(String productSku, int quantity) {
            this.productSku = productSku;
            this.quantity = quantity;
        }

        public String getProductSku() { return productSku; }
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

        public CancellationDetails(String cancellationReason) {
            this.cancellationReason = cancellationReason;
            this.cancellationDate = LocalDate.now().toString();
        }

        public String getCancellationReason() { return cancellationReason; }
        public String getCancellationDate() { return cancellationDate; }
    }

//    public static void loadOrderCSV(ArrayList<Product> products,
//                                    ArrayList<Order> orderList,
//                                    Order client_order,
//                                    ArrayList<Product> order_products,
//                                    String client_username) throws CsvValidationException, IOException {
//        orderList.clear();
//        order_products.clear();
//        ordersCount = 0;
//
//        CSVReader reader;
//        try {
//            reader = new CSVReader(
//                    new FileReader(externalCsvPath)
//            );
//            System.out.println("File found"); //Found
//        } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        }
//
//        String[] line;
//        reader.readNext();
//        System.out.println("Reader read");
//
//        while ((line = reader.readNext()) != null) {
//            System.out.println(Arrays.toString(line));
//            Order order = new Order(List.of(line));
//            orderList.add(order);
//            ordersCount++;
//        }
//        System.out.println("End of file reached.");
//
//        for (int i = 0; i < orderList.size() - 1; i++) {
//            if (orderList.get(i).getOrder_customer().getUsername().equals(client_username)) {
//                client_order.setOrder(orderList.get(i));
//                System.out.println("client_order added.");
//                break;
//            }
//        }
//    }

    //Need to define a new order first
    //Load order to know the next value
    //then exec this function
    public void writeOrderCSV() throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(externalCsvPath))) {
                // handle productSkus and quantities are stored as lists or arrays in the order object
                String productSku = String.join("|", getOrder_products().stream()
                        .map(product -> String.valueOf(product.getProductSku()))
                        .toArray(String[]::new));

                String quantities = String.join("|", getOrder_products().stream()
                        .map(product -> String.valueOf(product.getQuantity()))
                        .toArray(String[]::new));

                writer.write(String.format("\"%d\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%d\",\"%f\",\"%f\",\"%f\",\"%f\",\"%f\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                        getOrder_id(),
                        escapeForCSV(getOrder_orderNumber()),
                        escapeForCSV(getOrder_customer().getUsername()),
                        escapeForCSV(getOrder_customer().getContactNumber()),
                        escapeForCSV(getOrder_customer().getAddress()),
                        productSku,
                        quantities,
                        getOrder_orderDetails().getTotalItems(),
                        getOrder_orderDetails().getProductPrice(),
                        getOrder_orderDetails().getDeliveryFee(),
                        getOrder_orderDetails().getAssemblyFee(),
                        getOrder_orderDetails().getSst(),
                        getOrder_orderDetails().getTotal(),
                        getOrder_paymentDetails().getPaymentType(),
                        getOrder_paymentDetails().getPaymentStatus(),
                        escapeForCSV(getOrder_cancellationDetails().getCancellationReason()),
                        getOrder_cancellationDetails().getCancellationDate(),
                        getOrder_status(),
                        getOrder_orderDate(),
                        escapeForCSV(getOrder_comment()),
                        getOrder_arrivingDate()
                ));
            }
        }

    public static Map<Integer, Order> importOrders() {
        ordersCount = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(externalCsvPath))) {
            String line;
            reader.readLine();
            while ((line = reader.readLine()) != null) {
                List<String> values = parseCsvLine(line);
                System.out.println(values);
                if (values.size() == 21) {
                    Order order = new Order(values);
                    orderMap.put(order.getOrder_id(), order);
                }
                ordersCount++;
            }
            if (orderMap.isEmpty()) {
                System.out.println("No orders found in the CSV file.");
            }
        } catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
        }
        return orderMap;
    }

    private static String escapeForCSV(String data) {
        if (data == null) {
            return "";
        }
        return data.replace("\"", "\"\"");
    }

    private static List<String> parseCsvLine(String line) {
        boolean inQuotes = false;
        List<String> data = new ArrayList<>();
        StringBuilder currentField = new StringBuilder();
        for (char c : line.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                data.add(currentField.toString().trim());
                currentField.setLength(0);
            } else {
                currentField.append(c);
            }
        }
        if (!currentField.isEmpty()) {
            data.add(currentField.toString().trim());
        }
        return data;
    }
}


