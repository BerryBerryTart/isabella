import React, { Component } from "react";
import ReactDOM from "react-dom";
import AddBar from './AddBar/AddBar';
import Note from './Note/Note'

class App extends Component {
    constructor(){
        super();
        this.state = {
           isLoaded: false,
           needsUpdate: false,
           error: null,
           notes: [],
       };
       this.handleUpdate = this.handleUpdate.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
       this.handleNoteFocus = this.handleNoteFocus.bind(this);
   };

    componentDidMount(){
        fetch('/notes/', {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                notes: result
            });},
        (error) => {
            this.setState({
                isLoaded: false,
                error: error
            });
        });
    };

    componentDidUpdate(prevProps){
        if (this.state.needsUpdate == true){
            fetch('/notes/', {method: 'GET'})
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    notes: result
                });},
            (error) => {
                this.setState({
                    isLoaded: false,
                    error: error
                });
            });
            this.setState({
                needsUpdate: false
            });
        }
    }

    handleUpdate(data) {
        fetch("/notes/", {method: 'POST', body: data})
        .then(
            () => this.setState({
                needsUpdate: true
            })
        );
    };

    handleDelete(id){
        fetch("/notes/" + id, {method: 'DELETE'})
        .then(
            () => this.setState({
                needsUpdate: true
            })
        );
    };

    handleNoteFocus(){
        
    }

    render() {
        const {notes} = this.state;
        return (
            <div>
                <div className="topbar">
                    <AddBar handleUpdate={this.handleUpdate}/>
                </div>
                <hr />
                <div className="notecontainer">
                {notes.map(item => (
                    <Note note={item} handleDelete={this.handleDelete}/>
                ))}
                </div>
            </div>
        );
    };
}

export default App;
