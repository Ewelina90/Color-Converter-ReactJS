import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded',function(){

    class ConvertedColors extends React.Component {

        render() {
            return (
                <div>
                    <h3 id="rgb">rgb(222,222,222)</h3>
                    <h3 id="hsl">hsl(222,10%,10%)</h3>
                    <h3 id="hex">#fefefe</h3>
                </div>
            )
        }
    }

    class ColorBackground extends React.Component {

        render() {
            return (
                <div>
                    <div className="selectedColor">

                    </div>
                </div>
            )
        }
    }

    class ColorInput extends React.Component {

        render() {
            return (
                <div>
                    <input type='text' placeholder="enter a color"/>
                    <button>go</button>
                </div>
            )
        }
    }

    class App extends React.Component {

        render() {
            return (
                <div>
                    <ColorInput/>
                    <ColorBackground/>
                    <ConvertedColors/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
