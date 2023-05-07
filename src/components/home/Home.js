import React, { Component } from 'react'
import { Heros } from "./components/Heros";
import { SignUpTile } from "./components/SignUpTile";

class Home extends Component {

  render() {
      return (
        <>
            <Heros/>
            <SignUpTile/>
        </>
      )
    
  }
}

export default Home