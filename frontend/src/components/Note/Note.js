import React, { Component } from "react";

class Note extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleDelete(this.props.note.id);
    }

    render(){
        return(
            <div className="note">
                <div>
                    <button onClick={this.handleClick} type="button" className="close closebutton" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <ul>
                    <li key={this.props.note.title}><p className="noteTitle">{this.props.note.title}</p></li>
                    <li key={this.props.note.note}><p className="noteText">{this.props.note.note}</p></li>
                    <li key={this.props.note.type}><p className="noteType">{this.props.note.type}</p></li>
                    <hr/>
                    <li key={this.props.note.completed}>{String(this.props.note.completed)}</li>
                </ul>
            </div>
        )
    }

}

export default Note;
