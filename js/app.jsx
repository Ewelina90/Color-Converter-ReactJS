import React from 'react';
import ReactDOM from 'react-dom';
import ColorInput from './colorinput.jsx';

document.addEventListener('DOMContentLoaded',function(){

    class ConvertedColors extends React.Component {

        // constructor(props) {
        //     super(props);
        //     this.state = {
        //         colorFormat : this.props.colorFormat,
        //         color : this.props.color
        //     };
        // }

        hexToRgb = (color) => {
            let hex = color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
            return `rgb(${hex[0]},${hex[1]},${hex[2]})`;
        }

        render() {
            const list = this.hexToRgb(this.props.color);
            return (
                <div className="convertedColor">
                    {list}
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
                        {this.props.color}
                    </div>
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
                colorFormat : format,
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
