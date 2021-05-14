import React, { useState } from 'react';

function getRandomColor() {
    const colorlist = ['deepping', 'red', 'blue', 'white', 'green']
    const randomIndex = Math.trunc(Math.random() * 5);
    return colorlist[randomIndex];
}


function Colorbox() {

    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deepping';
        console.log(initColor);
        return initColor;
    });

    function handleBoxClick() {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box_color', newColor);
    }


    return (
        <div className="colorBox" style={{ backgroundColor: color, padding: 10 }} onClick={handleBoxClick}>
            helllo
        </div>
    );
}

export default Colorbox;