import React, { useState, useRef, useEffect } from 'react';

const colorPalette = [
  '#FF0000', 
  '#FF7F00', 
  '#FFFF00', 
  '#00FF00', 
  '#0000FF',
  '#4B0082', 
  '#8B00FF', 
  '#FF69B4', 
  '#00FFFF', 
];

const shuffleColors = array => {
    return array.sort(() => Math.random() - 0.5);
};

const PreliPrac = () => {
    const [activeColor, setActiveColor] = useState(null);
    const [colorFrequency, setColorFrequency] = useState(Array(10).fill(0));
    const [rolling, setRolling] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const toggleRoll = () => {
        rolling ? endRoll() : beginRoll();
    };

    const beginRoll = () => {
        setRolling(true);
        setActiveColor(null);
        
        const newSequence = shuffleColors([...Array(9).keys()]);
        let sequenceIndex = 0;

        intervalRef.current = setInterval(() => {
            if (sequenceIndex >= newSequence.length) sequenceIndex = 0;
            setCurrentIndex(newSequence[sequenceIndex]);
            sequenceIndex++;
        }, 300);
    };

    const endRoll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            const finalIndex = currentIndex;
            setActiveColor(finalIndex);
            setCurrentIndex(null);
            setColorFrequency(prevCounts => {
                const newCounts = [...prevCounts];
                newCounts[finalIndex] += 1;
                return newCounts;
            });
            setRolling(false);
        }
    };

    return (
        <div style={{ 
            textAlign: 'center', 
            height: '500px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderRadius: '15px' }}>
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '5px', 
              margin: '20px 0', 
              flexWrap: 'wrap'
            }}>
              {colorPalette.map((color, index) => (
                <div key={color} style={{ 
                  backgroundColor: color, 
                  width: '50px', 
                  height: '50px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  color: 'black',
                  borderRadius: '10px'
                }}>{colorFrequency[index]}</div>
              ))}
            </div>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px', 
                margin: '20px auto', 
                width: '500px',
                height: '500px',
                paddingBottom: '15px',
                borderRadius: '10px',
                justifyContent: 'space-between'
            }}>
                {colorPalette.slice(0, 9).map((color, index) => (
            <div key={index} style={{ 
                backgroundColor: (currentIndex === index || activeColor === index) ? 'white' : color,
                display: 'flex',
                width: 'calc(33.33% - 10px)',
                height: '150px', 
                borderRadius: '10px',
                transition: 'background-color 0.5s ease'
            }}></div>
          ))}
        </div>
            <button 
              onClick={toggleRoll} 
              style={{ 
                padding: '15px 30px', 
                fontSize: '24px', 
                backgroundColor: '#6495ed',
                borderRadius: '5px',
                margin: '15px',
                fontColor: 'Black'
              }} 
            >
              {rolling ? 'Stop Roll' : 'Start Roll'}
            </button>
          </div>
        </div>
    );
};

export default PreliPrac;