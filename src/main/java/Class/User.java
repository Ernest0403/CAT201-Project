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

/**
 * A singleton class to manage user records, supporting two modes:
 *  1) Classpath resource (users.csv) [READ-ONLY]
 *  2) External file path [READ+WRITE]
 */
public class User {

    // -------------------------------------------------
    // 1) Singleton instance & data storage
    // -------------------------------------------------

    private static User instance;          // Singleton instance
    private static String externalCsvPath; // If null, we read from resource. If set, we read/write to that file.

    /**
     * In-memory list of user records, each record is a String[]:
     *   [0] = userType ("user", "admin", etc.)
     *   [1] = username
     *   [2] = email
     *   [3] = password
     *   [4] = firstName (optional)
     *   [5] = lastName (optional)
     *   [6] = displayName (optional)
     *   [7] = billingAddress (optional)
     *   [8] = shippingAddress (optional)
     */
    private final List<String[]> allUsers;

    // -------------------------------------------------
    // 2) Private constructor (loads data once)
    // -------------------------------------------------
    private User() {
        this.allUsers = new ArrayList<>();
        reloadData();
    }

    /**
     * Retrieve the singleton instance, creating it if necessary.
     */
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

    // -------------------------------------------------
    // 3) External CSV Path Configuration
    // -------------------------------------------------

    /**
     * Set the external file path (absolute path on the filesystem).
     * If this is set to a non-null value, the system will use that file for read/write.
     * If it is null, it falls back to the classpath resource (users.csv) read-only mode.
     */
    public static void setExternalCsvPath(String path) {
        externalCsvPath = path;
        if (instance != null) {
            instance.reloadData();  // re-load from new path or resource
        }
    }

    // -------------------------------------------------
    // 4) Loading / Reloading Data
    // -------------------------------------------------

    /**
     * Clears the list and loads data from either an external file or
     * the internal classpath resource.
     */
    private synchronized void reloadData() {
        allUsers.clear();

        if (externalCsvPath != null) {
            loadFromExternalFile(externalCsvPath);
        } else {
            loadFromResource("Database/users.csv");
        }
    }

    /**
     * Load from a file on the filesystem. Allows read+write.
     */
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

    /**
     * Load from a classpath resource in read-only mode.
     */
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

    // -------------------------------------------------
    // 5) Saving Data (only works if externalCsvPath != null)
    // -------------------------------------------------

    /**
     * Saves the in-memory user list back to the external file (if set).
     * If in resource mode (externalCsvPath == null), logs a warning and does nothing.
     */
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

    // -------------------------------------------------
    // 6) Public Methods: getAllUsers, addUser, etc.
    // -------------------------------------------------

    /**
     * Returns a shallow copy of all user records.
     */
    public synchronized List<String[]> getAllUsers() {
        return new ArrayList<>(allUsers);  // defensive copy
    }

    /**
     * Finds a user by username or email. Returns the first matched row, or null if not found.
     */
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

    /**
     * Adds a new user record to the in-memory list.
     * If you want to persist this, call saveData() afterward (if externalCsvPath is set).
     */
    public synchronized void addUser(String[] newUserRecord) {
        allUsers.add(newUserRecord);
        System.out.println("[User] addUser: " + String.join(",", newUserRecord));
    }

    /**
     * Updates a user's password in-memory. To actually save it to file,
     * call saveData() if externalCsvPath is set.
     */
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



