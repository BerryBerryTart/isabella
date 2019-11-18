import React, { Component } from 'react';

class FilterNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 'all'
        }
    };

    render() {
        return (
        <div className='filterBox'>
        <div className='dropdown'>
            <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                id='dropdownMenu2'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
            >Filter By</button>
            <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
                <button className='dropdown-item' type='button'
                    onClick={() => {this.props.handleFilter('all')}}>All</button>
                <button className='dropdown-item' type='button'
                    onClick={() => {this.props.handleFilter('home')}}>Home</button>
                <button className='dropdown-item' type='button'
                    onClick={() => {this.props.handleFilter('work')}}>Work</button>
                <button className='dropdown-item' type='button'
                    onClick={() => {this.props.handleFilter('other')}}>Other</button>
            </div>
        </div>
        </div>
       )
    };
};

export default FilterNote;