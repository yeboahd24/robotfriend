// import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import "tachyons";
import Scroll from "./Scroll";
import {connect} from 'react-redux';
import {setSearchField, requestRobots} from './actions';


// Reducers
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.payload,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onsRequestRobots: ()=> dispatch(requestRobots())
  };
};

class App extends Component {

  componentDidMount() {
    this.props.onsRequestRobots();
  }

  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value })
  // }

  render() {
    const { searchField, onSearchChange, robots, isPending} = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);