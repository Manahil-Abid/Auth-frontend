import React, { useState, useEffect } from "react";

function ProfileForm({ profile, onSave }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [projects, setProjects] = useState([{ title: "", description: "", link: "" }]);

  // Update form fields when profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setSkills(profile.skills?.join(", ") || "");
      setGithub(profile.github || "");
      setProjects(
        profile.projects?.length > 0
          ? profile.projects
          : [{ title: "", description: "", link: "" }]
      );
    }
  }, [profile]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", link: "" }]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // get token here
  const profileData = {
    name,
    skills: skills.split(",").map((s) => s.trim()),
    github,
    projects,
  };

  try {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "POST", // backend already handles create or update
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!res.ok) throw new Error("Failed to save profile");

    const data = await res.json();
    console.log("✅ Profile saved:", data);
    alert("Profile saved successfully!");
  } catch (err) {
    console.error("❌ Error saving profile:", err);
    alert("Error saving profile");
  }
};
  return (<>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <br />
      <input
        type="url"
        placeholder="GitHub Link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <br />
      <h4>Projects</h4>
      {projects.map((proj, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) => handleProjectChange(i, "title", e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={proj.description}
            onChange={(e) =>
              handleProjectChange(i, "description", e.target.value)
            }
          />
          <input
            type="url"
            placeholder="Project Link"
            value={proj.link}
            onChange={(e) => handleProjectChange(i, "link", e.target.value)}
          />
          <br />
        </div>
      ))}
      <button type="button" onClick={addProject}>
        Add Project
      </button>
      <br />
      <button type="submit">Save Profile</button>
    </form></>
  );
}

export default ProfileForm;
