import React from 'react';

class AddBar extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            note: '',
            type: 'home',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.handleCreate(data);
        this.setState({
            title: '',
            note: '',
            type: 'home',
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return(
            <div className="topBarForm">
            <form onSubmit={this.handleSubmit}>
                <div className="formelement">
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        maxLength="100"
                        onChange={this.handleChange}
                        value={this.state.title}
                        required
                    />
                </div >
                <div className="formelement">
                    <textarea
                        name="note"
                        placeholder="Note Text"
                        maxLength="400"
                        rows="5"
                        onChange={this.handleChange}
                        value={this.state.note}
                        required
                    />
                </div>
                <div className="formelement">
                    <select
                        name="type"
                        onChange={this.handleChange}
                        value={this.state.type}
                    >
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