import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded',function(){

    class ConvertedColors extends React.Component {

        render() {
            return (
                <div className="convertedColor">
                    <h3 id="rgb">{this.props.color}</h3>
                    <h3 id="hsl">{this.props.color}</h3>
                    <h3 id="hex">{this.props.color}</h3>
                </div>
            )
        }
    }

    class ColorBackground extends React.Component {

        render() {
            return (
                <div>
                    <div className="selectedColor" style={{background:this.props.color}}>

                    </div>
                </div>
            )
        }
    }

    class ColorInput extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                inputValue : ""
            };
        }

        handleInputOnChange = (event) => {
            this.setState({
                inputValue : event.target.value,
            });
        }

        handleButtonOnClick = (event) => {
            if(typeof this.props.getColor === 'function'){
                this.props.getColor(this.state.inputValue);
            }
        };

        render() {
            return (
                <div className="inputColor">
                    <input type='text' placeholder="enter a color"
                        value={this.state.inputValue}
                        onChange={this.handleInputOnChange}/>
                    <button
                        onClick={this.handleButtonOnClick}>go</button>
                </div>
            )
        }
    }

    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                activeColor : 'white',
            };
        }

        handleButtonClick = (color) => {
            this.setState({
                activeColor : color,
            });
        }

        render() {
            return (
                <div>
                    <ColorInput getColor={this.handleButtonClick}/>
                    <ColorBackground color={this.state.activeColor}/>
                    <ConvertedColors color={this.state.activeColor}/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
