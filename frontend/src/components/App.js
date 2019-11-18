import React, { Component } from "react";
import ReactDOM from "react-dom";
import Masonry from 'react-masonry-component';
import autosize from 'autosize';

import AddBar from './AddBar/AddBar';
import Note from './Note/Note';
import EditNote from './EditNote/EditNote';

class App extends Component {
    constructor(){
        super();
        this.state = {
           isLoaded: false,
           editNote: null,
           error: null,
           notes: [],
       };
       this.handleCreate = this.handleCreate.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
       this.handleNoteFocus = this.handleNoteFocus.bind(this);
       this.editUnmount = this.editUnmount.bind(this);
       this.handleEdit = this.handleEdit.bind(this);
       this.handleComplete = this.handleComplete.bind(this);
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
        autosize(document.querySelector('textarea'));
    };

    handleCreate(data) {
        fetch("/notes/", {method: 'POST', body: data})
        .then(res => res.json())
        .then(
            (result) => this.setState({
                notes: this.state.notes.concat(result)
            })
        );
    };

    handleDelete(id){
        fetch("/notes/" + id + '/', {method: 'DELETE'})
        .then(
            () => this.setState({
                notes: this.deleteNoteAtIndex(id),
            })
        );
    };

    handleNoteFocus(id){
        fetch('/notes/' + id + '/', {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            this.setState({
                editNote: result,
            });},
        (error) => {
            this.setState({
                error: error
            });
        });
    }

    editUnmount(){
        this.setState({
            editNote: null,
        });
    }

    handleEdit(id, data){
        fetch('/notes/' + id + '/', {method: 'PUT', body: data})
        .then(res => res.json())
        .then(
            (result) => this.setState({
                notes: this.updateNoteAtIndex(id, result),
                editNote: null,
            })
        );
    }

    handleComplete(id, data){
        let payload = JSON.stringify({'completed': data});
        fetch('/notes/complete/' + id + '/', {
            method: 'PATCH',
            body: payload,
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(
            (result) => this.setState({
                notes: this.updateNoteAtIndex(id, result),
            })
        );
    }

    render() {
        const {notes} = this.state;

        return (
            <div>
                <div>
                    <EditNote
                        unmount={this.editUnmount}
                        mounted={this.state.editFocus}
                        note={this.state.editNote}
                        edit={this.handleEdit}
                    />
                </div>
                <div className="topbar">
                    <AddBar handleCreate={this.handleCreate}/>
                </div>
                <hr />
                <div className="notecontainer">
                <Masonry>
                {notes.map(item => (
                    <Note
                        key={item.id}
                        note={item}
                        handleNoteFocus={this.handleNoteFocus}
                        handleDelete={this.handleDelete}
                        complete={this.handleComplete}
                    />
                ))}
                </Masonry>
                </div>
            </div>
        );
    };

    updateNoteAtIndex(id, note){
        const newArray = Array.from(this.state.notes);
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            newArray[index] = note;
        }
        return newArray;
    }

    deleteNoteAtIndex(id){
        const newArray = Array.from(this.state.notes);
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            newArray.splice(index, 1);
        }
        return newArray;
    }
}

export default App;
