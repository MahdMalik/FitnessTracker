import React from "react";
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Custom = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const upperBodyExercises = [
    "Push-Ups",          // Targets chest, shoulders, triceps, and core
    "Pull-Ups",          // Targets back, biceps, shoulders
    "Bench Press",       // Targets chest, shoulders, triceps
    "Dumbbell Rows",     // Targets back, shoulders, biceps
    "Overhead Shoulder Press" // Targets shoulders, triceps
  ];
  const lowerBodyExercises = [
    "Squats",            // Targets quads, hamstrings, glutes, and core
    "Lunges",            // Targets quads, hamstrings, glutes
    "Deadlifts",         // Targets hamstrings, glutes, lower back
    "Leg Press",         // Targets quads, hamstrings, glutes
    "Calf Raises"        // Targets calves
  ];
  const cardioExercises = [
    "Running",           // Great for endurance, works legs and core
    "Jump Rope",         // Improves coordination, works legs, core, and shoulders
    "Cycling",           // Targets legs, glutes, and improves cardiovascular health
    "Swimming",          // Full-body workout, great for cardio and endurance
    "HIIT (High-Intensity Interval Training)"  // Boosts metabolism, burns fat, full-body workout
  ];
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts/get", {
        headers: { Authorization: `Bearer ${user.token}` },
        method: 'POST',
        body: {type: 'custom'}
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user && !workouts) {
      fetchWorkouts();
    }
  }, [dispatch, user, workouts]); // Added workouts to the dependency array

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm workouts={[...upperBodyExercises, ...lowerBodyExercises, ...cardioExercises]} type='custom'/>
    </div>
  );
};

export default Custom;
