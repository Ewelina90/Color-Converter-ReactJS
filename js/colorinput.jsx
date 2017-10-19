import React from 'react';
import ReactDOM from 'react-dom';

class ColorInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue : "",
            activeColor : "",
            validateColor : false,
            status : '',
        };
    }

    handleInputOnChange = (event) => {
        this.setState({
            inputValue : event.target.value,
        });
        this.validateColor(event.target.value);
    }

    handleButtonOnClick = (event) => {
        if(this.state.validateColor){
            if(typeof this.props.getColor === 'function'){
                this.props.getColor(this.state.activeColor, this.state.validateColor,);
                this.props.validateColor(this.state.status);
            }
        }else {
            if(typeof this.props.validateColor === 'function'){
                this.props.validateColor(this.state.status);
            }
        }
    };

    handleOnKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(this.state.validateColor){
                if(typeof this.props.getColor === 'function'){
                    this.props.getColor(this.state.activeColor, this.state.validateColor);
                    this.props.validateColor(this.state.status);
                }
            }else{
                if(typeof this.props.validateColor === 'function'){
                    this.props.validateColor(this.state.status);
                }
            }
        }
    }

    validateColor = (color) => {
        const hex = /^\#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/;
        const shortHex = /^\#([a-fA-F0-9]{3})$/;
        const hsl = /^hsl\((\d{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)$/i;
        const rgb = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i;

        if(color.match(hex) || color.match(shortHex)){
            let fixColor = color;

            if(color.length === 4){
                    let tempColor = '';
                    for (let i = 0; i < color.length; i++){
                        if(i === 0){
                            tempColor = `${tempColor}${color[i]}`;
                        }
                        else {
                            tempColor = `${tempColor}${color[i]}${color[i]}`
                        }
                    }
                    fixColor = tempColor;
            }
            this.setState({
                activeColor : fixColor,
                validateColor :  'hex',
                status : '',
            })
        }
        else if(color.match(hsl)){
            const matchHsl = color.match(hsl);
            if((matchHsl[1] <= 360) && (matchHsl[2] <= 100) && (matchHsl[3] <= 100)){
                this.setState({
                    activeColor : color,
                    validateColor : 'hsl',
                    status : '',
                });
            }
            else {
                this.setState({
                    validateColor : false,
                    status : 'invalid',
                });
            }
        }
        else if(color.match(rgb)){
            const matchRgb = color.match(rgb);
            if((matchRgb[1] <= 255) && (matchRgb[2] <= 255) && (matchRgb[3] <= 255)){
                this.setState({
                    activeColor : color,
                    validateColor : 'rgb',
                    status : '',
                });
            }
            else {
                this.setState({
                    validateColor : false,
                    status : 'invalid',
                });
            }
        }
        else {
            this.setState({
                activeColor : color,
                validateColor : false,
                status : 'invalid',
            })
        }
    }

    render() {
        return (
            <div className="inputColor">
                <input className="inputField" type='text' placeholder="Enter a color ex. rgb(255,0,45)"
                    value={this.state.inputValue}
                    onChange={this.handleInputOnChange}
                    onKeyPress={this.handleOnKeyPress}/>
                <button className="convertBtn"
                    onClick={this.handleButtonOnClick}>
                    Convert
                </button>
            </div>
        )
    }
}
export default ColorInput;
