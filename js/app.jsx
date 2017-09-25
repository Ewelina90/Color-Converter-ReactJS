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
                activeColor : "",
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
                this.props.getColor(this.state.activeColor, this.state.validateColor);
            }
        };

        validateColor = (color) => {
            const hex = /^\#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/;
            const shortHex = /^\#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/;
            const hsl = /^(hsl)?\(?([0-360]{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)?$/;
            const hsl2 = /^(hsl)?\(?([0-360]{1,3})\,([0]\.\d{1,2})\,([0]\.\d{1,2})\)?$/;
            const rgb = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/

            if(color.match(hex) || color.match(shortHex)){
                let fixColor = color;
                if(color.charAt(0) !== '#'){
                        fixColor = `#${color}`;
                }
                this.setState({
                    activeColor : fixColor,
                    validateColor :  'hex',
                })
            }
            else if(color.match(hsl2)){
                console.log('hsl'+ color.match(hsl2));
                let fixColor = color;
                this.setState({
                    activeColor : fixColor,
                    validateColor : 'hsl',
                })
            }
            else if(color.match(rgb)){
                this.setState({
                    activeColor : color,
                    validateColor : 'rgb',
                })
            }
            else {
                this.setState({
                    activeColor : color,
                    validateColor : false,
                })
                console.log('Invalid color format');
                console.log('hsl'+ color.match(hsl2));
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
