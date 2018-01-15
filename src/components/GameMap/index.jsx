import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';
import './index.css';

class GameMap extends Component {
    render() {
        const { cells } = this.props;

        return (
            <div className="map">
                {cells.map(props =>
                    <Cell
                        key={props.id}
                        text={props.text}
                        canMove={props.canMove}
                        handleTurn={() => this.props.handleTurn(props)}
                    />
                )}
            </div>
        )
    }
}

GameMap.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape(
        {
            canMove: PropTypes.bool,
            id: PropTypes.number,
            text: PropTypes.string,
        }
    )),
    handleTurn: PropTypes.func.isRequired,
};
export default GameMap;
