import React from 'react';

const ball = "/images/ball-50.png";
const player = "/images/player.png";
const Box = (props) => {
    return (
        <div style={boxStyle(props.mode)} >
            
        </div>
    );
};

const boxStyle = mode => ({
    width: 50,
    height: 50,
    backgroundImage: getImage(mode),
    backgroundSize: '80%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    border: '2px solid #777',
});

const getImage = (mode) => {
    switch(mode) {
        case 0:
            return 'none';
        case 1:
            return `url(${ball})`;
        case 2:
            return `url(${player})`;
        default:
            return 'none';
    }
}

export default Box;