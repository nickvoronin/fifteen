import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';
import './index.css';

class CellsRow extends Component {
    render() {
        const { cells } = this.props;

        return (
            <div className="row">
                {cells.map(props =>
                    <Cell
                        {...props}
                        key={props.id}
                        handleTurn={() => this.props.handleTurn(props)}
                    />
                )}
            </div>
        )
    }
}

CellsRow.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape(
        {
            canMove: PropTypes.bool,
            id: PropTypes.number,
            text: PropTypes.string,
        }
    )),
    handleTurn: PropTypes.func.isRequired,
};
export default CellsRow;
