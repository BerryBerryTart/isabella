import React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
                    <TextField
                        name={'title'}
                        type={'text'}
                        placeholder={'Title'}
                        onChange={this.handleChange}
                        value={this.state.title}
                        required={true}
                        label={'Note'}
                    />
                </div >
                <div className="formelement">
                    <TextareaAutosize
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
                    <Select
                        name="type"
                        onChange={this.handleChange}
                        value={this.state.type}
                    >
                        <MenuItem name="type" value="home">Home</MenuItem>
                        <MenuItem name="type" value="work">Work</MenuItem>
                        <MenuItem name="type" value="other">Other</MenuItem>
                    </Select>
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