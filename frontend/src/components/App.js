import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import ProgressGraph from "./ProgressGraph";
import Form from "./Form";
import EntryDeleter from "./EntryDeleter";



const App = () => (
    <DataProvider endpoint="api/max/"
        render={(data, exerciseData, reFetchMax) => (
            <React.Fragment>
                <div className="primary">
                    <div className="graph-container">
                        <ProgressGraph data={data} exerciseData={exerciseData} />
                    </div>
                    <div className="graph-input-form">
                        <Form exerciseData={exerciseData} triggerUpdate={reFetchMax} />
                    </div>
                </div>
                <div className="graph-entry-deleter">
                    <EntryDeleter data={data} exerciseData={exerciseData} triggerUpdate={reFetchMax} />
                </div>  
            </React.Fragment>
        )}/>  
);

const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;