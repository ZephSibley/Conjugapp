import React from "react";
import PropTypes from "prop-types";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const ProgressGraph = ( {data, exerciseData } ) => {
    if (!data.length) {
        return(
            <p>Nothing to show.</p>
        )
    } else {

        // Get unique dates
        let dates = data.map(entry => entry.date);
        let uniqueDates = [...new Set(dates)];

        // Get unique exercises
        let exercises = data.map(entry => entry.exercise);
        let uniqueExercises = [...new Set(exercises)];

        // Reorganise data by date with each exercise, sample: {date: "2018-07-31", bench: null, squat: 80}
        let chartData = uniqueDates.map(date => {
            let point = { date };
            for (let exercise of uniqueExercises) {
                let exerciseName = exerciseData.find(asd => asd.id === exercise).exercise_name; // exerciseName is the the exercise_name where the entry matches the exercise
                    point[exerciseName] = data
                        .filter(entry => entry.date == date && entry.exercise == exercise)
                        .reduce((carry, entry) => carry + entry.max_lift, 0) || null;
            }
            return point;
        }).sort((before, next) => new Date(before.date).getTime() - new Date(next.date).getTime()); // Order by date ascending
        
        // Need to make individual colors, maybe randomise
        // convert each unique exercise key to their names
        let namedExercises = uniqueExercises.map(id => exerciseData.find(exercise => exercise.id === id).exercise_name);

        // Individually coloured lines
        function getRandomColor() {
            var letters = '0123456789ABCD';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 14)];
            }
            return color;
          }
                    

        // Populate the chart with individual lines for each exercise
        let lines = namedExercises.map((exercise) => <Line key={exercise} connectNulls={true} type="monotone" dataKey={exercise} stroke={getRandomColor()}/>)

        return (
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    {   
                    lines      
                    }
                </LineChart>
            </ResponsiveContainer>
        );
    };
};


ProgressGraph.propTypes = {
    data: PropTypes.array.isRequired,
    exerciseData: PropTypes.array.isRequired
};

export default ProgressGraph;