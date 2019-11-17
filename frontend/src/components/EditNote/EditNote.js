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
                <div className="editContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="formelement">
                            <label htmlFor="title">
                                Title
                            </label>
                            <input name="title" type="text" defaultValue={this.props.note.title}/>
                        </div >
                        <div className="formelement">
                            <label htmlFor="note">
                                Note
                            </label>
                            <textarea name="note" defaultValue={this.props.note.note}/>
                        </div>
                        <div className="formelement">
                            <label>
                                Type
                            </label>
                            <select name="type" defaultValue={this.props.note.type}>
                                <option name="type" value="home">Home</option>
                                <option name="type" value="work">Work</option>
                                <option name="type" value="other">Other</option>
                            </select>
                        </div>
                        <div className="formelement">
                            <div className="editButtonContainer">
                                <button onClick={this.props.unmount} type="button" className="btn btn-secondary">Discard</button>
                                <button type="submit" value="Submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default EditNote;