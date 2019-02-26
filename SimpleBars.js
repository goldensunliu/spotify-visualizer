import colorOfSound from "./colorOfSound";
import React from 'react'

export default function SimpleBars({segment}) {
        const { pitches, duration } = segment;
        return (
            <div className="container">
                {pitches.map((p, i) => (
                    <div key={i} className="pitch-bar" style={{ height: `${p * 100}%`, transitionDuration: `${duration * 1000}ms`, backgroundColor: colorOfSound[i] }}/>
                ))}
                { /*language=CSS*/ }
                <style jsx>{`
                    .pitch-bar {
                        color: blue;
                        transition: all;
                        flex: 1;
                        border-radius: 2em 2em 0 0;
                    }
                    .container {
                        height: 300px;
                        display: flex;
                        transition: all;
                        align-items: flex-end;
                    }
                `}</style>
            </div>
        )
}