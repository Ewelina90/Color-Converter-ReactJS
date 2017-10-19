import React from 'react';
import ReactDOM from 'react-dom';

class ConvertedColors extends React.Component {

    //  Hex to RGB conversion
    hexToRgb = (color) => {
        // Conversion to rgb format
        let hex = color.match(/[A-Za-z0-9]{2}/g).map(el => parseInt(el, 16));
        // Return color in rgb format
        return `rgb(${hex[0]},${hex[1]},${hex[2]})`;
    }

    // RGB to HEX conversion
    rgbToHex = (color) => {
        let rgb = color.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
        // Conversion to hex format
        const convertToHex = (color) => {
            let hex = parseInt(color).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
        // Return color in hex format
        return "#" + convertToHex(rgb[1]) + convertToHex(rgb[2]) + convertToHex(rgb[3]);
    }

    //  RGB to HSL conversion based on algorithm from http://www.rapidtables.com/convert/color/rgb-to-hsl.htm
    rgbToHsl = (color) => {
        const rgb = color.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
        // Selecting r - red, g - green, b - blue values
        const r = (parseInt(rgb[1])/255).toFixed(3);
        const g = (parseInt(rgb[2])/255).toFixed(3);
        const b = (parseInt(rgb[3])/255).toFixed(3);
        // Choosing max and min values
        const max = Math.max(r,g,b);
        const min = Math.min(r,g,b);
        //  L - lightness calculation
        const L = (max+min)/2;
        //  Calculating delta value
        const delta = max - min;
        //  Declaring S - saturation and H - hue
        let S = 0;
        let H = 0;
        //  S  value calculation
        S = delta === 0 ? 0 : Math.round((delta/(1 - Math.abs(2.0*L-1)))*100);

        // H value calculation
        if(delta === 0){
            H = 0;
        }else{
            switch (true) {
                case (max == r):
                    H = (((g-b)/delta) % 6)*60.0;
                    break;
                case (max == g):
                    H = (2.0 + (b-r)/delta)*60.0;
                    break;
                case (max == b):
                    H = (4.0 + (r-g)/delta)*60.0;
                    break;
                default:
                    H = 0;
            }
        }
        //  If value is negative add 360
        H = H < 0 ? H + 360.0 : H ;

        // Return color in hsl format
        return `hsl(${Math.round(H)},${S}%,${Math.round(L*100)}%)`;
    }

    //  HSL to RGB conversion based on algorithm from http://www.rapidtables.com/convert/color/hsl-to-rgb.htm
    hslToRgb = (color) => {
        const hsl = color.match(/^hsl\((\d{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)$/i);
        // Selecting H - hue, S - saturation, L - lightness values
        let H = parseInt(hsl[1]);
        H = H === 360 ? 359.0 : H ;

        const S = (parseInt(hsl[2]))/100;
        const L = (parseInt(hsl[3]))/100;
        // Calculate variable values
        const C = (1 - Math.abs(2*L - 1))*S;
        const X = C*(1 - Math.abs((H/60)%2 - 1));
        const m = L - C/2;
        // Declaring result container
        let result = 0;
        // Calculate result base on H value
        if( ((H >= 0) && (H < 360)) && ((S >= 0) && (S <= 1)) && ((L >= 0) && (L <=1))){
            switch (true) {
                case ((H >= 0) && (H < 60)):
                    result = [C,X,0];
                    break;
                case ((H >= 60) && (H < 120)):
                    result = [X,C,0];
                    break;
                case ((H >= 120) && (H < 180)):
                    result = [0,C,X];
                    break;
                case ((H >= 180) && (H < 240)):
                    result = [0,X,C];
                    break;
                case ((H >= 240) && (H < 300)):
                    result = [X,0,C];
                    break;
                case ((H >= 300) && (H < 360)):
                    result = [C,0,X];
                    break;
                default:
            }
        }
        // Calculate R, G, B colors values
        const R = Math.round((result[0]+m)*255);
        const G = Math.round((result[1]+m)*255);
        const B = Math.round((result[2]+m)*255);
        // Return color in rgb format
        return `rgb(${R},${G},${B})`;
    }

    render() {
        if(this.props.status === 'invalid'){
            return (
                <div className="convertedColor">
                    <h3 id="hsl">Invalid color format!</h3>
                </div>
            )
        }else if(this.props.colorFormat === 'rgb'){
            const hex = this.rgbToHex(this.props.color);
            const hsl = this.rgbToHsl(this.props.color);

            return (
                <div className="convertedColor">
                    <h3 id="hsl">{this.props.color}</h3>
                    <h3 id="rgb">{hsl}</h3>
                    <h3 id="hex">{hex}</h3>
                </div>
            )
        }else if(this.props.colorFormat === 'hex'){
            const rgb = this.hexToRgb(this.props.color);
            const hsl = this.rgbToHsl(rgb);
            return (
                <div className="convertedColor">
                    <h3 id="hsl">{this.props.color}</h3>
                    <h3 id="rgb">{rgb}</h3>
                    <h3 id="hex">{hsl}</h3>
                </div>
            )
        }else if(this.props.colorFormat === 'hsl'){
            const rgb = this.hslToRgb(this.props.color);
            const hex = this.rgbToHex(rgb);
            return (
                <div className="convertedColor">
                    <h3 id="hsl">{this.props.color}</h3>
                    <h3 id="rgb">{rgb}</h3>
                    <h3 id="hex">{hex}</h3>
                </div>
            )
        }else{
            return null;
        }
    }
}
export default ConvertedColors;
