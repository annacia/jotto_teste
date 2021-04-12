import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import {connect} from 'react-redux';
//
// import { guessWord } from "./actions";

const Input = ({secretWord}) => {
    const [currentGuess, setCurrentGuess] = React.useState("");
    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                    placeholder="enter guess"
                />
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={(evt) => {
                        evt.preventDefault();
                    }}
                >
                    Submit
                </button>

            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
};


export default Input;

// export class UnconnectedInput extends Component {
//     constructor(props) {
//         super(props);
//
//         //initialize state
//         this.state = {currentGuess: null}
//
//         //bind this for submitGuessedWord
//         this.submitGuessedWord = this.submitGuessedWord.bind(this);
//     }
//
//     submitGuessedWord(evt) {
//         evt.preventDefault();
//         const guessedWord = this.state.currentGuess;
//
//         if (guessedWord && guessedWord.length > 0) {
//             this.props.guessWord(guessedWord);
//             this.setState({currentGuess: ''});
//         }
//     }
//
//     render() {
//         const content = this.props.success
//         ? null
//         : (
//             <form className="form-inline">
//                 <input
//                     data-test="input-box"
//                     className="mb-2 mx-sm-3"
//                     type="text"
//                     value={this.state.currentGuess}
//                     onChange={(evt) => this.setState({currentGuess: evt.target.value})}
//                     placeholder="enter guess"
//                 />
//                 <button
//                     data-test="submit-button"
//                     className="btn btn-primary mb-2"
//                     onClick={(evt) => this.submitGuessedWord(evt)}
//                     type="submit"
//                 >
//                     Submit
//                 </button>
//
//             </form>
//         )
//         return (
//             <div data-test="component-input">
//                 {content}
//             </div>
//         )
//     }
// };
//
// const mapStateToProps = ({success}) => {
//     return { success };
// }
//
// export default connect(mapStateToProps, {guessWord})(UnconnectedInput);