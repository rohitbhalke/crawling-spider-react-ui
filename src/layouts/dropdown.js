
import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class dropdown extends Component {
    render() {
        var self = this;
        return (
            <DropdownButton title={this.props.title} id="journals">
                {
                    this.props.data.map ? this.props.data.map(function (journal, index) {
                        return <MenuItem eventKey="1" onClick={self.props.event} key={index} data-id={journal.journal} id={index} className={journal.title === self.props.title ? "active" : ""}>{journal.title}</MenuItem>
                    }) : ""
                }
            </DropdownButton>
        )
    }
}