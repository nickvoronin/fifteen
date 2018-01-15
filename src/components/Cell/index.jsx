import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Cell extends Component {
    render() {
        const { text, handleTurn } = this.props;
        return (
            <div className="cell" onClick={handleTurn}>
                <div className="cell__content">{text}</div>
            </div>
        )
    }
}

Cell.propTypes = {
    handleTurn: PropTypes.func.isRequired,
    canMove: PropTypes.bool,
    text: PropTypes.string,
    id: PropTypes.number,
};

export default Cell;
