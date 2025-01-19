package Class;

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
    private String order_arrivingDate;;

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
}


