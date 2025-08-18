
import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import Header from "../header";
import './dashboard.css'
function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async (profileData) => {
    const method = profile ? "PUT" : "POST";
    const url = "http://localhost:5000/api/profile/";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setEditing(false);
      } else {
        console.error("Failed to save");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div>
<Header />
      <h2>Dashboard</h2>
      {!editing && profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>GitHub: {profile.github}</p>
          <p>Skills: {profile.skills.join(", ")}</p>
          <h4>Projects:</h4>
          <ul>
            {profile.projects.map((proj, i) => (
              <li key={i}>
                {proj.title} - <a href={proj.link}>{proj.link}</a>
                <blockquote>                {proj.description} </blockquote>
              </li>
            ))}
          </ul>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}

      {editing && (
        <ProfileForm profile={profile} onSave={handleSave} />
      )}
    </div>
  );
}

export default Dashboard;
