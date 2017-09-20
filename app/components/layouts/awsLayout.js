import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import SidebarContainer from '../containers/sidebarContainer';
import Logo from '../elements/logo';
import Navbar from '../elements/navbar';
import TablesContainer from '../containers/tablesContainer';
import TablesAndTableContainer from '../containers/tablesAndTableContainer';

const AwsLayout = () => {
  return (
    <div className="s-container container">
      <div className="columns">
        <div className="s-sidebar">
          <div className="s-brand">
            <Logo title="DynamoDB" />
          </div>
          <div className="s-nav">
            <div className="accordion-container">
              <SidebarContainer />
            </div>
          </div>
        </div>

        <div className="s-navbar">
          <div className="menu-btn">
            <a href="#sidebar" className="btn btn-link btn-action"><i className="icon icon-menu" /></a>
          </div>
          <Logo />
        </div>
        <div className="s-content">
          <Navbar />

          <Switch>
            <Route path="/" exact component={TablesContainer} />
            <Route path="/profile/:profile" component={TablesContainer} />
            <Route path="/tables/:name" exact component={TablesAndTableContainer} />
            <Route path="/tables/:name/:view" component={TablesAndTableContainer} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AwsLayout);
