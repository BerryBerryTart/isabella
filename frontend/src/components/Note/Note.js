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
            <div className={this.props.note.completed ? 'note noteComplete' : 'note noteIncomplete'}>
                <div className="noteControls">
                    <button onClick={() => {this.props.handleNoteFocus(this.props.note.id);}}
                        type="button" className="btn btn-default" aria-label="Edit">
                        <span className="oi oi-pencil" aria-hidden="true"></span>
                    </button>
                    <button onClick={this.handleClick} type="button" className="btn btn-default" aria-label="Close">
                        <span className="oi oi-x" aria-hidden="true"></span>
                    </button>
                </div>
                <div>
                    <ul>
                        <li key={this.props.note.title}><p className="noteTitle">{this.props.note.title}</p></li>
                        <li key={this.props.note.note}><p className="noteText">{this.props.note.note}</p></li>
                        <li key={this.props.note.type}><p className="noteType">{this.props.note.type}</p></li>
                        <hr/>
                        <div className="completeSection">
                        <button onClick={() => {
                                    this.props.complete(this.props.note.id, String(!this.props.note.completed));
                                }}
                            type="button" className="btn btn-default completeBtn">
                            <span className={this.props.note.completed ? 'oi oi-task' : 'oi oi-check'}></span>
                        </button>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

}

export default Note;
