import React from 'react';

const Navbar = () => (
  <div className="container s-toolbar">
    <header className="columns">
      <section className="column col-xs-8 s-navbar-actions">
        <button className="btn btn-primary">Create table</button>
        { '\u00a0' }
        <div className="dropdown">
          <a href="#dropdown" className="btn disabled dropdown-toggle" tabIndex={0}>
            Actions <i className="icon icon-arrow-down" />
          </a>
          <ul className="menu">
            <li className="menu-item">
              <a href="#dropdowns">Import</a>
            </li>
            <li className="menu-item">
              <a href="#dropdowns">Export</a>
            </li>
            <li className="menu-item">
              <a href="#dropdowns">Delete table</a>
            </li>
          </ul>
        </div>
      </section>
      <section className="column col-xs-4">
        <div />
      </section>
    </header>
  </div>
);

export default Navbar;
