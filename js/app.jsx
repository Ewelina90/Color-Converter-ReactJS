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
            return `rgb(${hex[0]}, ${hex[1]}, ${hex[2]})`;
        }

        rgbToHex = (color) => {
            let rgb = color.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
            const c = (v) => {
                let hex = parseInt(v).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }
            return "#" + c(rgb[1]) + c(rgb[2]) + c(rgb[3]);
        }

        rgbToHsl = (color) => {
            let rgb = color.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
            const r = (parseInt(rgb[1])/255).toFixed(2);
            const g = (parseInt(rgb[2])/255).toFixed(2);
            const b = (parseInt(rgb[3])/255).toFixed(2);
            console.log(r,g,b);
            const max = Math.max(r,g,b);
            const min = Math.min(r,g,b);
            console.log(max,min);
            const L = (max+min)/2;
            console.log(L);
            let S = 0;
            let H = 0;
            if(min === max){
                S = 0;
                H = 0;
            }else if(L < 0.5){
                S = (max-min)/(max+min);
            }else{
                S = (max-min)/(2.0-max-min);
            }
            console.log(S);
        
            switch (true) {
                case (max == r):
                    H = ((g-b)/(max-min))*60;
                    break;
                case (max == g):
                    H = (2.0 + (b-r)/(max-min))*60;
                    break;
                case (max == b):
                console.log('blue');
                    H = (4.0 + (r-g)/(max-min))*60;
                    break;
                default:
                    H = 0;
            }
            console.log(H);
        }

        render() {
            if(this.props.colorFormat === 'rgb'){
                const hex = this.rgbToHex(this.props.color);
                const rgb = this.rgbToHsl('rgb(24,98,118)');
                return (
                    <div className="convertedColor">
                        {hex}
                        {rgb}
                        <h3 id="rgb">{this.props.color}</h3>
                        <h3 id="hsl">{this.props.colorFormat}</h3>
                        <h3 id="hex">{this.props.color}</h3>
                    </div>
                )
            }else{
                const rgb = this.hexToRgb(this.props.color);
                return (
                    <div className="convertedColor">
                        {rgb}
                        <h3 id="rgb">{this.props.color}</h3>
                        <h3 id="hsl">{this.props.colorFormat}</h3>
                        <h3 id="hex">{this.props.color}</h3>
                    </div>
                )
            }
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
