import React, { Component } from "react";
import ReactDOM from "react-dom";
import Masonry from 'react-masonry-component';

import AddBar from './AddBar/AddBar';
import Note from './Note/Note';
import EditNote from './EditNote/EditNote';
import FilterNote from './FilterNote/FilterNote';
import Error from './Error/Error';

class App extends Component {
    constructor(){
        super();
        this.state = {
           isLoaded: false,
           editNote: null,
           error: null,
           notes: [],
           filterType: 'all',
       };
       this.handleCreate = this.handleCreate.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
       this.handleNoteFocus = this.handleNoteFocus.bind(this);
       this.editUnmount = this.editUnmount.bind(this);
       this.handleEdit = this.handleEdit.bind(this);
       this.handleComplete = this.handleComplete.bind(this);
       this.handleFilter = this.handleFilter.bind(this);
   };

    componentDidMount(){
        fetch('/notes/', {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                notes: result,
                error: null,
            });}
        )
        .catch((error) => {
            this.setState({
                isLoaded: false,
                error: 'ERROR: Failed to fetch.',
            });
        });
    };

    handleCreate(data) {
        fetch("/notes/", {method: 'POST', body: data})
        .then(res => res.json())
        .then(
            (result) => this.setState({
                notes: this.state.notes.concat(result)
            })
        ).catch((error) => {
            this.setState({
                error: 'ERROR: Failed to add note.'
            })
        });
    };

    handleDelete(id){
        fetch("/notes/" + id + '/', {method: 'DELETE'})
        .then(
            () => this.setState({
                notes: this.deleteNoteAtIndex(id),
            })
        ).catch((error) => {
            this.setState({
                error: 'ERROR: Failed to delete note.'
            })
        });
    };

    handleNoteFocus(id){
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            this.setState({
                editNote : this.state.notes[index],
            });
        }

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
        ).catch((error) => {
            this.setState({
                error: 'ERROR: Failed to edit note.'
            })
        });
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
        ).catch((error) => {
            this.setState({
                error: 'ERROR: Failed to mark note as complete.'
            })
        });
    }

    handleFilter(value){
        this.setState({
            filterType: value,
        })
    }

    handleImagesLoaded(imagesLoadedInstance) {
        this.show();
    }

    render() {
        let errorComponent;

        //If broke, ONLY display error
        if (!this.state.isLoaded && this.state.error) {
            this.refetchNotes();
            return <Error message={this.state.error} refresh={true}/>;
        }
        else if (this.state.isLoaded && this.state.error){
            this.resetError();
            errorComponent = <Error message={this.state.error}/>
        }

        //Filter all the things
        let notes = [];
        if (this.state.filterType != 'all'){
            notes = this.state.notes.filter(item => item.type == this.state.filterType)
        }
        else {
            notes = this.state.notes;
        }

        return (
            <div>
                {errorComponent}
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
                <Masonry onImagesLoaded={() => this.forceUpdate()}>
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
                <FilterNote handleFilter={this.handleFilter}/>
                </div>
            </div>
        );
    };

    updateNoteAtIndex(id, note) {
        const newArray = Array.from(this.state.notes);
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            newArray[index] = note;
        }
        return newArray;
    }

    deleteNoteAtIndex(id) {
        const newArray = Array.from(this.state.notes);
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            newArray.splice(index, 1);
        }
        return newArray;
    }

    refetchNotes() {
        const timer = setTimeout( () =>{
            fetch('/notes/', {method: 'GET'})
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    notes: result,
                    error: null,
                });}
            )
            .catch((error) => {
                this.setState({
                    isLoaded: false,
                    error: 'ERROR: Failed to fetch.',
                });
            });
        }, 30000);
    }

    resetError(){
        const timer = setTimeout( () =>{
            this.setState({
                error: null
            })
        }, 3000);
    }

}

export default App;
