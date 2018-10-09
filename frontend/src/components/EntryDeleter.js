import React, { Component } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

class EntryDeleter extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        exerciseData: PropTypes.array.isRequired
    };

    state = {
        id: 1,
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const id = this.state.id;
        const csrftoken = Cookies.get("csrftoken");
        const endpoint = `api/max/${id}/`;
        const conf = {
            method: "delete",
            //body: JSON.stringify(id),
            headers: new Headers({ "X-CSRFToken": csrftoken, "Content-Type": "application/json" }),
        };
        fetch(endpoint, conf).then(response => (console.log(response), this.props.triggerUpdate()));
    }

    render(){
        let namedData = this.props.data.map(entry => {
            let exercise = this.props.exerciseData.find(exercise => exercise.id == entry.exercise);
            let name = exercise.exercise_name;
        let entryCopy = Object.assign({}, entry);
        entryCopy.exercise = name;
        return entryCopy;
        });
        let optionItems = namedData.map((entry) => <option key={entry.id} value={entry.id}>{entry.exercise + ", " + entry.date + ", Lift: " + entry.max_lift}</option> );
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="entry-select">Delete Entry</label>
                    <div style={{marginRight: 10, marginLeft: 10}} >
                        <select id="entry-select" className="custom-select" name="id" onChange={this.handleChange} required>
                            {optionItems}
                        </select>
                    </div>
                </div>
                <div className="control">
                    <button type="submit" className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </form>
        )
    }
}



export default EntryDeleter

// Just make sure that you have validation on the backend that compares the id of the user making the request to the id of the user who owns the resource, probably object level permissions