import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
    // Static initial data for notifications
    const initialNotifications = [
        { text: "Promotion 'Summer Sale' is expiring in 2 days!", read: false },
        { text: "User 'john_doe' registered 1 hour ago.", read: false },
        { text: "Revenue crossed $10,000 this month!", read: false },
    ];

    const [notifications, setNotifications] = useState(initialNotifications);

    // Data for chart
    const revenueData = {
        2023: [2000, 3000, 4000, 3500, 5000, 4500, 5200, 4800, 5000, 5500, 6000, 7000],
        2024: [3000, 4000, 5000, 6000, 7000, 8000, 7500, 7200, 8000, 8500, 9000, 9500],
    };
    const [selectedYear, setSelectedYear] = useState(2024);

    // Chart data and options
    const chartData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: `Monthly Revenue ($) - ${selectedYear}`,
                data: revenueData[selectedYear],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Notification handlers
    const handleMarkAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard!</p>

            {/* Notifications Section */}
            <div className="notifications">
                <h2>Notifications</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index} className={`notification-item ${notification.read ? "read" : ""}`}>
                            {notification.text}
                            {!notification.read && (
                                <button
                                    onClick={() => handleMarkAsRead(index)}
                                    className="mark-as-read-btn"
                                >
                                    Mark as Read
                                </button>
                            )}
                            {notification.read && <span className="read-label">Read</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Revenue Chart Section */}
            <div className="chart-section">
                <h2>Revenue Chart</h2>
                <div className="chart-controls">
                    <label htmlFor="year-select">Select Year:</label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {Object.keys(revenueData).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



