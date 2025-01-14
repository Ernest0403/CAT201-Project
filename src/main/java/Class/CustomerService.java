package Class;

public class CustomerService {
    private int id;
    private String title;
    private String description;
    private String username;
    private String status;
    private String reply;

    public CustomerService(int id, String title, String description, String username, String status, String reply) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.username = username;
        this.status = status;
        this.reply = reply;
    }

    public CustomerService() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String toCsvRow() {
        return id + "," + title + "," + description + "," + username + "," + status + "," + reply;
    }
}
