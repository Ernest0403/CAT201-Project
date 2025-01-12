package Class;

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
}
