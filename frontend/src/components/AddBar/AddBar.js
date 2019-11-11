import React from 'react'

class AddBar extends React.Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.handleUpdate(data);
    }

    render() {
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <div className="formelement">
                    <label htmlFor="title">
                        Title
                    </label>
                    <input name="title" type="text"/>
                </div >
                <div className="formelement">
                    <label htmlFor="note">
                        Note
                    </label>
                    <textarea name="note"/>
                </div>
                <div className="formelement">
                    <label>
                        Type
                    </label>
                    <select>
                        <option />
                        <option name="type" value="home">Home</option>
                        <option name="type" value="work">Work</option>
                        <option name="type" value="other">Other</option>
                    </select>
                </div>
                <div className="formelement">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
            </div>
        );
    }
}

export default AddBar;