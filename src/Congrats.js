import React from 'react';

export default (props) => {
    if (props.success) {
        return(
            <div data-test="component-congrats">
                <span data-test="congrats-message">
                    Congratulations! You guessed the word!
                </span>
            </div>
        )
    }
    return (
        <div data-test="component-congrats"/>
    );
}