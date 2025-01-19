package Class;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;


public class User {



    private static User instance;
    private static String externalCsvPath;



    private final List<String[]> allUsers;

    // -------------------------------------------------
    // 2) Private constructor (loads data once)
    // -------------------------------------------------
    private User() {
        this.allUsers = new ArrayList<>();
        reloadData();
    }


    public static User getInstance() {
        if (instance == null) {
            synchronized (User.class) {
                if (instance == null) {
                    instance = new User();
                }
            }
        }
        return instance;
    }


    public static void setExternalCsvPath(String path) {
        externalCsvPath = path;
        if (instance != null) {
            instance.reloadData();  // re-load from new path or resource
        }
    }


    private synchronized void reloadData() {
        allUsers.clear();

        if (externalCsvPath != null) {
            loadFromExternalFile(externalCsvPath);
        } else {
            loadFromResource("Database/users.csv");
        }
    }


    private void loadFromExternalFile(String path) {
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) {
                    continue; // skip blank lines
                }
                String[] fields = line.split(",");
                allUsers.add(fields);
            }
            System.out.println("[User] Loaded " + allUsers.size() + " records from external file: " + path);
        } catch (IOException e) {
            System.err.println("[User] ERROR: Could not load from external file: " + path);
            e.printStackTrace();
        }
    }


    private void loadFromResource(String resourceName) {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourceName);
             BufferedReader reader = (inputStream != null)
                     ? new BufferedReader(new InputStreamReader(inputStream))
                     : null) {

            if (inputStream == null || reader == null) {
                throw new FileNotFoundException(resourceName + " not found in classpath.");
            }

            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) {
                    continue;
                }
                String[] fields = line.split(",");
                allUsers.add(fields);
            }
            System.out.println("[User] Loaded " + allUsers.size() + " records from resource: " + resourceName);

        } catch (IOException e) {
            System.err.println("[User] ERROR: Could not read from classpath resource: " + resourceName);
            e.printStackTrace();
        }
    }


    public synchronized void saveData() {
        if (externalCsvPath == null) {
            System.err.println("[User] WARNING: saveData() called but externalCsvPath is null. " +
                    "No changes will be saved to the WAR resource.");
            return;
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(externalCsvPath))) {
            for (String[] userRow : allUsers) {
                writer.write(String.join(",", userRow));
                writer.newLine();
            }
            System.out.println("[User] Successfully wrote " + allUsers.size() +
                    " records to external file: " + externalCsvPath);
        } catch (IOException e) {
            System.err.println("[User] ERROR: Could not write to " + externalCsvPath);
            e.printStackTrace();
        }
    }


    public synchronized List<String[]> getAllUsers() {
        return new ArrayList<>(allUsers);  // defensive copy
    }


    public synchronized String[] findUserByUsernameOrEmail(String usernameOrEmail) {
        for (String[] userData : allUsers) {
            if (userData.length >= 3) {
                String uname = userData[1].trim();
                String email = userData[2].trim();
                if (uname.equalsIgnoreCase(usernameOrEmail) || email.equalsIgnoreCase(usernameOrEmail)) {
                    return userData;
                }
            }
        }
        return null;
    }


    public synchronized void addUser(String[] newUserRecord) {
        allUsers.add(newUserRecord);
        System.out.println("[User] addUser: " + String.join(",", newUserRecord));
    }


    public synchronized boolean updatePassword(String usernameOrEmail, String newPassword) {
        String[] row = findUserByUsernameOrEmail(usernameOrEmail);
        if (row != null && row.length >= 4) {
            row[3] = newPassword;
            System.out.println("[User] Updated password for " + usernameOrEmail);
            return true;
        }
        return false;
    }
}



