import React, { Component } from "react";

class EditNote extends Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.edit(this.props.note.id, data);
    }

    render(){
        if(!this.props.note){
            return null;
        }

        return (
            <div className='show-edit'>
                <div className="masterNoteContainer">
                <div className="editNoteTitle">
                    <h3>Edit Note:</h3>
                </div>
                <div className="editNoteControls">
                    <button onClick={this.props.unmount} type="button" className="btn btn-default" aria-label="Close">
                        <span className="oi oi-x" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="editContainer">
                    <form className="editForm" onSubmit={this.handleSubmit}>
                        <div className="formelement">
                            <input
                                placeholder="Title"
                                name="title"
                                type="text"
                                defaultValue={this.props.note.title}
                                required
                            />
                        </div >
                        <div className="formelement">
                            <textarea
                                placeholder="Note Text"
                                name="note"
                                defaultValue={this.props.note.note}
                                rows="6"
                                required
                            />
                        </div>
                        <div className="formelement">
                            <select name="type" defaultValue={this.props.note.type}>
                                <option name="type" value="home">Home</option>
                                <option name="type" value="work">Work</option>
                                <option name="type" value="other">Other</option>
                            </select>
                            <hr/>
                        </div>
                        <div className="formelement">
                            <div className="editButtonContainer">
                                <button type="submit" value="Submit" className="btn edit-btn">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        );
    };
}

export default EditNote;