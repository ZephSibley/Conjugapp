import React, { Component } from "react";
import Cookies from 'js-cookie';
import PropTypes from "prop-types";

//implement reset function, put into dataprovider

class Form extends Component {

    static propTypes = {
        exerciseData: PropTypes.array.isRequired
    };

    state = {
        exercise: 1,
        date: "",
        max_lift: 0,
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { exercise, date, max_lift, } = this.state;
        const max = { exercise, date, max_lift, };
        const endpoint = "/api/max/";
        const csrftoken = Cookies.get("csrftoken");
        const conf = {
            method: "post",
            body: JSON.stringify(max),
            headers: new Headers({ "X-CSRFToken": csrftoken, "Content-Type": "application/json" }),
        };
        fetch(endpoint, conf).then(response => (console.log(response), this.props.triggerUpdate()));
    };
    
    render() {
        const { exercise, date, max_lift } = this.state;
        let exercise_list = this.props.exerciseData;
        let optionItems = exercise_list.map((exercise) => <option key={exercise.id} value={exercise.id}>{exercise.exercise_name}</option> );
        return (
            <div>
                <h2 style={{textAlign: 'center'}}>Add your progress here!</h2>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exercise-selection">Exercise</label>
                        <select id="exercise-selection" className="form-control custom-select" name="exercise" onChange={this.handleChange} required>
                            {optionItems}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="datefield">Date Performed</label>
                            <input 
                                className="form-control"
                                id="datefield"
                                type="date"
                                name="date"
                                onChange={this.handleChange}
                                value={date}
                                required
                            />
                        </div>
                    <div className='form-group'>
                        <label htmlFor="maxlift">Max Lift</label>
                            <input 
                                className="form-control"
                                id="maxlift"
                                type="number"
                                name="max_lift"
                                onChange={this.handleChange}
                                value={max_lift}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                </form>
            </div>
        );
    }
}

export default Form;