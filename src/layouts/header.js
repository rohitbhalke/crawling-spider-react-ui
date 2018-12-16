import React, { Component } from 'react'
import { Navbar, f, FormGroup } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <div>

        <Navbar inverse collapseOnSelect fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <span className="logo active navbar-brand">
                <a href="/"> Crawling Spiders </a>
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              {/*<Autosuggest
                datalist={[ 'Barak Obama', 'Donald Trump', 'Narendra Modi', 'Rahul Gandhi', 'Arvind Kejriwal']}
                placeholder="Search tweet"
              />*/}
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>;
      </div>
    )
  }
}