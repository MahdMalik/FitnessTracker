import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    experienceLevel: "beginner",
    preferredWorkoutDays: [],
    medicalConditions: "",
  });

  const { signup, error, isLoading } = useSignup();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedWorkoutDays = checked
        ? [...formData.preferredWorkoutDays, value]
        : formData.preferredWorkoutDays.filter((day) => day !== value);

      setFormData((prev) => ({
        ...prev,
        preferredWorkoutDays: updatedWorkoutDays,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="signup-container">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="form-section">
          <h4>Account Information</h4>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Physical Information</h4>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              onChange={handleChange}
              value={formData.age}
              required
            />
          </div>

          <div className="form-group">
            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              onChange={handleChange}
              value={formData.height}
              required
            />
          </div>

          <div className="form-group">
            <label>Weight (kg):</label>
            <input
              type="number"
              name="weight"
              onChange={handleChange}
              value={formData.weight}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Fitness Profile</h4>
          <div className="form-group">
            <label>Fitness Goal:</label>
            <select
              name="fitnessGoal"
              onChange={handleChange}
              value={formData.fitnessGoal}
              required
            >
              <option value="">Select a goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="endurance">Endurance</option>
              <option value="flexibility">Flexibility</option>
              <option value="general-fitness">General Fitness</option>
            </select>
          </div>

          <div className="form-group">
            <label>Experience Level:</label>
            <select
              name="experienceLevel"
              onChange={handleChange}
              value={formData.experienceLevel}
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group workout-days">
            <label>Preferred Workout Days:</label>
            <div className="checkbox-group">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="preferredWorkoutDays"
                    value={day}
                    checked={formData.preferredWorkoutDays.includes(day)}
                    onChange={handleChange}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Medical Conditions or Limitations:</label>
            <textarea
              name="medicalConditions"
              onChange={handleChange}
              value={formData.medicalConditions}
              placeholder="Please list any medical conditions or limitations we should know about..."
            />
          </div>
        </div>

        <button className="signup-button" disabled={isLoading} type="submit">
          Sign up
        </button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
