import React from 'react';
import Box from './Box';

const Maze = props => {
    return (
        <Box width={props.width} height={props.height} row={props.row} col={props.col} mode={props.mode} />
    )
}

export default Maze;