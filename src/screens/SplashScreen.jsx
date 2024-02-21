import React from 'react';

export default function SplashScreen() {
    return (
        <div style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 30,
                paddingTop: 50,
                backgroundColor: '#f0f0f0',
        }}>
             <img
                source={"require('../../assets/icon.png')"}
                style={{ width: 80, height: 80 }}
            />
        </div>
    );
};
