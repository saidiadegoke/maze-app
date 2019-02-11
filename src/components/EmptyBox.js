import React from 'react';

const ball = "/images/ball-50.png";
const EmptyBox = () => {
    return (
        <div style={box}>
            
        </div>
    );
};

const box = {
    width: 50,
    height: 50,
    backgroundImage: `url(${ball})`,
    backgroundSize: '80%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    border: '2px solid #777',
} 

export default EmptyBox;