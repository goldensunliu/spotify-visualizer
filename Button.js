export default function Button({children, onClick}) {
    return (
        <button onClick={onClick} className="btn btn--stripe">
            {children}
            { /*language=CSS*/ }
            <style jsx>{`
                .btn {
                    overflow: visible;
                    margin: 0;
                    font: inherit;
                    line-height: normal;
                    cursor: pointer;
                    -moz-user-select: text;
                    display: block;
                    text-decoration: none;
                    text-transform: uppercase;
                    padding: 16px 36px 22px;
                    background-color: #fff;
                    color: #666;
                    border: 2px solid #666;
                    border-radius: 6px;
                    margin-bottom: 16px;
                    transition: all .5s ease;
                }

                .btn:-moz-focus-inner {
                    padding: 0;
                    border: 0;
                }

                .btn--stripe {
                    overflow: hidden;
                    position: relative;
                }
                .btn--stripe:after {
                    content: '';
                    display: block;
                    height: 7px;
                    width: 100%;
                    background-image: repeating-linear-gradient(45deg, #666, #666 1px, transparent 2px, transparent 5px);
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-top: 1px solid #666;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background-size: 7px 7px;
                }
                .btn--stripe:hover {
                    background-color: #666;
                    color: #fff;
                    border-color: #000;
                }
                .btn--stripe:hover:after {
                    background-image: repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 2px, transparent 5px);
                    border-top: 1px solid #000;
                    -webkit-animation: stripe-slide 12s infinite linear forwards;
                    animation: stripe-slide 12s infinite linear forwards;
                }
                @keyframes stripe-slide {
                  0% {
                    background-position: 0% 0;
                  }
                  100% {
                    background-position: 100% 0;
                  }
                }
            `}</style>
        </button>
    )
}