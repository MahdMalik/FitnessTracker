import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    experienceLevel: "",
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
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      {/* Basic Information */}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>

      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </div>

      {/* Physical Information */}
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={formData.age}
        />
      </div>

      <div className="form-group">
        <label>Height (cm):</label>
        <input
          type="number"
          name="height"
          onChange={handleChange}
          value={formData.height}
        />
      </div>

      <div className="form-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={formData.weight}
        />
      </div>

      {/* Fitness Goals */}
      <div className="form-group">
        <label>Fitness Goal:</label>
        <select
          name="fitnessGoal"
          onChange={handleChange}
          value={formData.fitnessGoal}
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
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Preferred Workout Days */}
      <div className="form-group">
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
            <label key={day}>
              <input
                type="checkbox"
                name="preferredWorkoutDays"
                value={day}
                checked={formData.preferredWorkoutDays.includes(day)}
                onChange={handleChange}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* Medical Information */}
      <div className="form-group">
        <label>Medical Conditions or Limitations:</label>
        <textarea
          name="medicalConditions"
          onChange={handleChange}
          value={formData.medicalConditions}
          placeholder="Please list any medical conditions or limitations we should know about..."
        />
      </div>

      <button disabled={isLoading} type="submit">
        Sign up
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
