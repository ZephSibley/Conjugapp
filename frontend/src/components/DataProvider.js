import React, { Component } from "react";
import PropTypes from "prop-types";

// add loading state to exercisedb fetch maybe if data+exercisedata.length then loaded: true

class DataProvider extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    };

    state = {
        data: [],
        exerciseData: [],
        maxLoaded: false,
        exerciseLoaded: false,
        placeholder: "Loading..."
    };

    //these should be made into modules to be reused. 
    fetchMaxData = () => {
        fetch(this.props.endpoint)
        .then(response => {
            if (response.status !== 200) {
                return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
        })
        .then(data => this.setState({ data: data, maxLoaded: true }));
    }

    fetchExerciseData = () => {
        const exercise_database = "api/exercise/";
        fetch(exercise_database)
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(data => this.setState({ exerciseData: data, exerciseLoaded: true }));
    }

    componentDidMount() {
        this.fetchMaxData();
        this.fetchExerciseData();
    }

    reFetchMax() {
        this.fetchMaxData();
    }

    render() {
        const { data, exerciseData, exerciseLoaded, maxLoaded, placeholder } = this.state;
        return exerciseLoaded && maxLoaded ? this.props.render(data, exerciseData, this.fetchMaxData, this.fetchExerciseData) : <p>{placeholder}</p>;
    }
}

export default DataProvider;