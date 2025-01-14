package Class;

import java.io.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Promotion {
    private static final Logger LOGGER = Logger.getLogger(Promotion.class.getName());

    private String id;
    private String title;
    private String description;
    private String code;
    private String expiryDate;

    // Constructor
    public Promotion(String id, String title, String description, String code, String expiryDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.expiryDate = expiryDate;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCode() { return code; }
    public String getExpiryDate() { return expiryDate; }

    public void setId(String id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCode(String code) { this.code = code; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    // Read promotions from CSV
    public static List<Promotion> loadFromCsv(String filePath) {
        List<Promotion> promotions = new ArrayList<>();
        File file = new File(filePath);

        if (!file.exists()) {
            LOGGER.warning("CSV file does not exist: " + filePath);
            return promotions;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty() || line.startsWith("id")) continue;
                String[] fields = line.split(",", -1);
                if (fields.length == 5) {
                    promotions.add(new Promotion(fields[0].trim(), fields[1].trim(), fields[2].trim(),
                            fields[3].trim(), fields[4].trim()));
                } else {
                    LOGGER.warning("Invalid CSV format: " + line);
                }
            }
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "Failed to load promotions from CSV", e);
        }

        return promotions;
    }

    // Save promotions to CSV
    public static void saveToCsv(String filePath, List<Promotion> promotions) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write("id,title,description,code,expiryDate");
            writer.newLine();
            for (Promotion promotion : promotions) {
                writer.write(String.join(",", promotion.getId(), promotion.getTitle(),
                        promotion.getDescription(), promotion.getCode(), promotion.getExpiryDate()));
                writer.newLine();
            }
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "Failed to save promotions to CSV", e);
        }
    }
}








