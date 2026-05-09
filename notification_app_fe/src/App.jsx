import { useEffect, useState } from "react";
import "./App.css";

const sampleNotifications = [
  {
    id: 1,
    title: "Placement Drive",
    type: "Placement",
    message: "TCS hiring drive starts tomorrow at 10 AM.",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "Semester Results",
    type: "Result",
    message: "Your semester 6 results have been published.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Tech Event",
    type: "Event",
    message: "AI workshop registrations are now open.",
    time: "3 hours ago",
  },
];

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedRead =
      JSON.parse(localStorage.getItem("readNotifications")) || [];

    const updatedData = sampleNotifications.map((item) => ({
      ...item,
      read: storedRead.includes(item.id),
    }));

    setNotifications(updatedData);
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );

    setNotifications(updated);

    const readIds = updated
      .filter((item) => item.read)
      .map((item) => item.id);

    localStorage.setItem(
      "readNotifications",
      JSON.stringify(readIds)
    );
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.type === filter);

  return (
    <div className="app">
      <header className="topbar">
        <h1>Campus Notifications</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Placement</option>
          <option>Result</option>
          <option>Event</option>
        </select>
      </header>

      <main className="notification-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`card ${item.read ? "read" : "unread"}`}
              onClick={() => markAsRead(item.id)}
            >
              <div className="card-top">
                <h2>{item.title}</h2>

                {!item.read && (
                  <span className="badge">NEW</span>
                )}
              </div>

              <p>{item.message}</p>

              <div className="card-footer">
                <span>{item.type}</span>
                <small>{item.time}</small>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">
            No notifications found.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;