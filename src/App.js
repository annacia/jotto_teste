import React from "react";
import './App.css';

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

function App() {
    //@todo: get props from shared state
    const success = false;
    const secretWord = 'party';
    const guessedWords = [];

    return (
        <div data-test="component-app" className="container">
            <h1>Jotto</h1>
            <Congrats success={true} />
            <Input secretWord={secretWord} success={success}/>
            <GuessedWords guessedWords={[{guessedWord: 'train', letterMatchCount: 3}]} />
        </div>
    );
}

export default App;

// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import './App.css';
//
// import GuessedWords from "./GuessedWords";
// import Congrats from "./Congrats";
// import Input from "./Input";
// import {getSecretWord} from "./actions";
//
// export class UnconnectedApp extends Component {
//     componentDidMount() {
//         //get the secret word
//         this.props.getSecretWord();
//     }
//
//
//
//     render() {
//     return(
//         <div data-test="component-app" className="container">
//           <h1>Jotto</h1>
//           {/*<Congrats success={this.props.success}/>*/}
//           {/*<Input/>*/}
//           {/*<GuessedWords guessedWords={this.props.guessedWords}/>*/}
//         </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//     const {success, guessedWords, secretWord} = state;
//     return {success, guessedWords, secretWord}
// }
//
// export default connect(mapStateToProps, {getSecretWord})(UnconnectedApp);
