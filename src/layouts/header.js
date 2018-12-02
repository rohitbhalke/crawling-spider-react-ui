import React, { Component } from 'react'
import { Navbar, f } from 'react-bootstrap';
import Autosuggest from 'react-bootstrap-autosuggest'

export default class Header extends Component {
  render() {
    return (
      <div>

        <Navbar inverse collapseOnSelect fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <span className="logo active navbar-brand">Crawling Spyders</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <Autosuggest
                datalist={[ 'Barak Obama', 'Donald Trump', 'Narendra Modi', 'Rahul Gandhi', 'Arvind Kejriwal']}
                placeholder="Search tweet"
              />
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>;
      </div>
    )
  }
}