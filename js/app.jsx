import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded',function(){

    class ConvertedColors extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                colorFormat : this.props.colorFormat,
                color : this.props.color
            };
        }

        render() {
            return (
                <div className="convertedColor">
                    <h3 id="rgb">{this.props.color}</h3>
                    <h3 id="hsl">{this.props.colorFormat}</h3>
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
                inputValue : "",
                validateColor : false
            };
        }

        handleInputOnChange = (event) => {
            this.setState({
                inputValue : event.target.value,
            });
            this.validateColor(event.target.value);
        }

        handleButtonOnClick = (event) => {
            if((typeof this.props.getColor === 'function') && (this.state.validateColor)){
                this.props.getColor(this.state.inputValue, this.state.validateColor);
            }
        };

        validateColor = (color) => {
            const hex = /^\#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/;
            if(color.match(hex)){
                this.setState({
                    validateColor :  'hex',
                })
            }else{
                this.setState({
                    validateColor :  false,
                })
            }
        }

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
                colorFormat : ''
            };
        }

        handleButtonClick = (color,format) => {
            this.setState({
                activeColor : color,
                colorFormat : format
            });
        }

        render() {
            return (
                <div>
                    <ColorInput getColor={this.handleButtonClick}/>
                    <ColorBackground color={this.state.activeColor}/>
                    <ConvertedColors color={this.state.activeColor} colorFormat={this.state.colorFormat}/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
