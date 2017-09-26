import React from 'react';
import ReactDOM from 'react-dom';

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
        const hex = /^\#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/;
        const shortHex = /^\#([a-fA-F0-9]{3})$/;
        const hsl = /^hsl\((\d{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)$/;
        const rgb = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/

        if(color.match(hex) || color.match(shortHex)){
            let fixColor = color;

            if(color.length === 4){
                    fixColor = [...color].map(function(el,i){
                        return i === 0 ? `${el}` : `${el}${el}`;
                    });
            }
            this.setState({
                activeColor : fixColor,
                validateColor :  'hex',
            })
        }
        else if(color.match(hsl)){
            const matchHsl = color.match(hsl);
            if((matchHsl[1] <= 360) && (matchHsl[2] <= 100) && (matchHsl[3] <= 100)){
                this.setState({
                    activeColor : color,
                    validateColor : 'hsl',
                });
            }
            else {
                this.setState({
                    validateColor : false,
                });
            }
        }
        else if(color.match(rgb)){
            const matchRgb = color.match(rgb);
            if((matchRgb[1] <= 255) && (matchRgb[2] <= 255) && (matchRgb[3] <= 255)){
                this.setState({
                    activeColor : color,
                    validateColor : 'rgb',
                });
            }
            else {
                this.setState({
                    validateColor : false,
                });
            }
        }
        else {
            this.setState({
                activeColor : color,
                validateColor : false,
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
export default ColorInput;
