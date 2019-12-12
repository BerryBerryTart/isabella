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
           demoMode: true,
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
       this.closeError = this.closeError.bind(this);
   };

    componentDidMount(){
        fetch('/notes/', {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                notes: result,
                error: null,
                demoMode:  window.session.login ? false : true,
            });}
        )
        .catch((error) => {
            this.setState({
                isLoaded: false,
                error: 'ERROR: Failed to fetch.',
            });
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.arraysMatch(this.state.notes, nextState.notes)){
            return true;
        }
        return false;
    }

    handleCreate(data) {
        if (!this.state.demoMode){
            let csrfToken = this.getCookie('csrftoken');
            fetch("/new-note/", {method: 'POST', body: data, headers:{'X-CSRFToken': csrfToken}})
            .then(this.handleErrors)
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
        }
        else {
            this.setState({
                notes: this.state.notes.concat(this.DEMOcreateNote(data)),
            })
        }
    };

    handleDelete(id){
        if (!this.state.demoMode){
            let csrfToken = this.getCookie('csrftoken');
            fetch("/notes/" + id + '/', {method: 'DELETE', headers:{'X-CSRFToken': csrfToken}})
            .then(this.handleErrors)
            .then(
                () => this.setState({
                    notes: this.deleteNoteAtIndex(id),
                })
            ).catch((error) => {
            this.setState({
                error: 'ERROR: Failed to delete note.'
            })
        });
        }
        else {
            this.setState({
                notes: this.deleteNoteAtIndex(id),
            })
        }
    };

    handleNoteFocus(id){
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            this.setState({
                editNote : this.state.notes[index],
            });
            let body = document.getElementsByTagName('body')[0];
            body.setAttribute('id', 'hide-body-overflow');
        }
    }

    editUnmount(){
        this.setState({
            editNote: null,
        });
        let body = document.getElementsByTagName('body')[0];
        body.removeAttribute('id');
    }

    handleEdit(id, data){
        if (!this.state.demoMode){
            let csrfToken = this.getCookie('csrftoken');
            fetch('/notes/' + id + '/', {method: 'PUT', body: data, headers:{'X-CSRFToken': csrfToken}})
            .then(this.handleErrors)
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
            let body = document.getElementsByTagName('body')[0];
            body.removeAttribute('id');
        }
        else {
            this.setState({
                editNote: null,
                notes: this.DEMOupdateNoteAtIndex(id, data),
            })
            let body = document.getElementsByTagName('body')[0];
            body.removeAttribute('id');
        }
    }

    handleComplete(id, data){
        if (!this.state.demoMode){
            let payload = JSON.stringify({'completed': data});
            let csrfToken = this.getCookie('csrftoken')
            fetch('/notes/complete/' + id + '/', {
                method: 'PATCH',
                body: payload,
                headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrfToken},
            })
            .then(this.handleErrors)
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
        else{
            this.setState({
                notes: this.DEMOcompleteNoteAtIndex(id, data),
            })
        }
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
            errorComponent = <Error message={this.state.error} close={this.closeError}/>
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

    DEMOupdateNoteAtIndex(id, data){
        const newArray = Array.from(this.state.notes);
        const index = this.state.notes.findIndex(obj => obj.id === id);
        if (index != -1){
            newArray[index].note = data.get('note');
            newArray[index].title = data.get('title');
            newArray[index].type = data.get('type');
        }
        return newArray;
    }

    DEMOcompleteNoteAtIndex(id, data){
        const newArray = Array.from(this.state.notes);
        const index = this.state.notes.findIndex(obj => obj.id === id);
        let databool = (data === 'true');
        if (index != -1){
            newArray[index].completed = databool;
        }
        return newArray;
    }

    DEMOcreateNote(data){
        let note = {
            completed: false,
            id: this.createUUID,
            note: data.get('note'),
            title: data.get('title'),
            type: data.get('type'),
        }
        return note;
    }

    createUUID() {
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
       });
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

    closeError() {
        this.setState({
            error: null,
        })
    }

    arraysMatch(arr1, arr2) {
    	// Check if the arrays are the same length
    	if (arr1.length !== arr2.length) return false;

    	// Check if all items exist and are in the same order
    	for (let i = 0; i < arr1.length; i++) {
    		if (arr1[i] !== arr2[i]) return false;
    	}

    	// Otherwise, return true
    	return true;
    }

    handleErrors(res){
        if (!res.ok){
            throw Error(res.statusText);
        }
        return res;
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

}

export default App;
