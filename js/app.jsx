import React from 'react';
import ReactDOM from 'react-dom';
import ColorInput from './colorinput.jsx';

document.addEventListener('DOMContentLoaded',function(){

    class ConvertedColors extends React.Component {

        hexToRgb = (color) => {
            let hex = color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
            return `rgb(${hex[0]},${hex[1]},${hex[2]})`;
        }

        rgbToHex = (color) => {
            console.log('color'+ color);
            let rgb = color.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
            console.log('rgb '+ rgb);
            const c = (v) => {
                let hex = parseInt(v).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }
            return "#" + c(rgb[1]) + c(rgb[2]) + c(rgb[3]);
        }

        rgbToHsl = (color) => {
            console.log(color);
            let rgb = color.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
            const r = (parseInt(rgb[1])/255).toFixed(3);
            const g = (parseInt(rgb[2])/255).toFixed(3);
            const b = (parseInt(rgb[3])/255).toFixed(3);
            console.log(r,g,b);
            const max = Math.max(r,g,b);
            const min = Math.min(r,g,b);
            console.log(max,min);

            //  L calculation
            const L = (max+min)/2;
            const delta = max - min;
            console.log("l " +L);
            let S = 0;
            let H = 0;

            //  S calculation
            if(delta === 0){
                S = 0;
                // H = 0;
            }else if((delta < 0) || (delta > 0)){
                S = (delta/(1 - Math.abs(2.0*L-1)))*100;
                console.log('s bef  '+ S);
                S = Math.round((delta/(1 - Math.abs(2.0*L-1)))*100);
            }
            // else if(L < 0.5){
            //     S = Math.round(((max-min)/(max+min))*100);
            //     console.log("s " +S);
            // }else if(L > 0.5){
            //     S = Math.round(((max-min)/(2.0-max-min))*100);
            // }
            console.log("s " +S);
            // H calculation
            if(delta === 0){
                H = 0;
            }else{
                switch (true) {
                    case (max == r):
                        H = (((g-b)/delta) % 6)*60.0;
                        console.log('r '+ H);
                        break;
                    case (max == g):
                        H = (2.0 + (b-r)/delta)*60.0;
                        console.log('g' + H);
                        break;
                    case (max == b):
                    console.log('blue');
                        H = (4.0 + (r-g)/delta)*60.0;
                        break;
                    default:
                        H = 0;
                }
            }
            const negative = (value) => {
                if(value < 0){
                    return value + 360.0;
                }else{
                    return value;
                }
            }
            console.log("h "+H);
            H = negative(H);
            console.log("h "+H);

            return `hsl(${Math.round(H)},${S}%,${Math.round(L*100)}%)`;
        }

        hslToRgb = (color) => {
            console.log(color);
            const hsl = color.match(/^hsl\((\d{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)$/i);
            console.log(hsl);
            let H = parseInt(hsl[1]);
            if(H === 360){
                H = 359.0;
            }
            console.log(H);
            const S = (parseInt(hsl[2]))/100;
            const L = (parseInt(hsl[3]))/100;
            console.log(H,S,L);

            // let R = 0;
            // let G = 0;
            // let B = 0;
            let result = 0;

            let C = (1 - Math.abs(2*L - 1))*S;
            console.log("c " + C);
            let X = C*(1 - Math.abs((H/60)%2 - 1));
            console.log("X " +X);
            const m = L - C/2;
            console.log("m "+m);

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
            console.log(result);
            const R = Math.round((result[0]+m)*255);
            const G = Math.round((result[1]+m)*255);
            const B = Math.round((result[2]+m)*255);
            console.log((result[0]+m)*255, (result[1]+m)*255, (result[2]+m)*255 );
            console.log(R,G,B);
            return `rgb(${R},${G},${B})`;
            // let R = 0;
            // let G = 0;
            // let B = 0;
            //
            // let temp1 = 0;
            // let temp2 = 0;
            //
            // console.log(H, S, L);
            // if(S === 0){
            //     const temp = (L)*255;
            //     R = temp;
            //     G = temp;
            //     B = temp;
            //     console.log(R,G,B);
            // }else{
            //     if(L < 0.5){
            //         temp1 = L*(1.0+S);
            //     }else if(L >= 0.5) {
            //         temp1 = (L+S)-(L*S);
            //     }
            //     console.log(temp1);
            //     temp2 = 2*L - temp1;
            //
            //     H = H/360;
            //
            //     let tempR = H + 0.333 ;
            //     let tempG = H;
            //     let tempB = H - 0.333;
            //
            //     const abs = (value) => {
            //         if(value < 0){
            //             value += 1.0;
            //         }else if(value > 1){
            //             value -= 1.0;
            //         }
            //         return value;
            //     }
            //     tempR = abs(tempR);
            //     tempG = abs(tempG);
            //     tempB = abs(tempB);
            //
            //     console.log("tempR " +tempR,tempG,tempB);
            //
            //     // 6
            //     const calculateColor = (tempColor) => {
            //         if(6*tempColor < 1){
            //             console.log("6 "+ (temp2+(temp1-temp2)*tempColor*6));
            //             return Math.abs((temp2+(temp1-temp2)*tempColor*6));
            //         }else if(6*tempColor > 1){
            //             if(2*tempColor < 1){
            //                 console.log("2 "+ temp1);
            //                 return temp1;
            //             }else if(2*tempColor >1){
            //                 if(3*tempColor < 2){
            //                     console.log("3 1 "+ (temp2+(temp1-temp2)*(0.666-tempColor)*6));
            //                     return Math.abs((temp2+(temp1-temp2)*(0.666-tempColor)*6));
            //                 }else if(3*tempColor > 2){
            //                     console.log("3 2 " + temp2);
            //                     return temp2;
            //                 }
            //             }
            //         }
            //     }
            //     R = Math.round(calculateColor(tempR)*255);
            //     console.log("r" +R);
            //     console.log(typeof(tempG));
            //     G = Math.round(calculateColor(tempG)*255);
            //     console.log(G);
            //
            //     B = Math.round(calculateColor(tempB)*255);
            //     console.log(B);
            //
            //
            // }
            //
            // console.log(`rgb(${R}, ${G}, ${B})`);
            //
            // return `rgb(${R},${G},${B})`;

        }

        render() {
            if(this.props.colorFormat === 'rgb'){
                const hex = this.rgbToHex(this.props.color);
                const rgb = this.rgbToHsl(this.props.color);

                return (
                    <div className="convertedColor">
                        {hex}
                        {rgb}
                        // <h3 id="rgb">{this.props.color}</h3>
                        // <h3 id="hsl">{this.props.colorFormat}</h3>
                        // <h3 id="hex">{this.props.color}</h3>
                    </div>
                )
            }
            else if(this.props.colorFormat === 'hex'){
                const rgb = this.hexToRgb(this.props.color);
                const hsl = this.rgbToHsl(rgb);
                return (
                    <div className="convertedColor">
                        {rgb}
                        {hsl}
                        <h3 id="rgb">{this.props.color}</h3>
                        <h3 id="hsl">{this.props.colorFormat}</h3>
                        <h3 id="hex">{this.props.color}</h3>
                    </div>
                )
            }else if(this.props.colorFormat === 'hsl'){
                const rgb = this.hslToRgb(this.props.color);
                const hex = this.rgbToHex(rgb);
                return (
                    <div className="convertedColor">
                        {rgb}
                        {hex}
                        <h3 id="rgb">{this.props.color}</h3>
                        <h3 id="hsl">{this.props.colorFormat}</h3>
                        <h3 id="hex">{this.props.color}</h3>
                    </div>
                )
            }

            else{
                return <h3 id="hsl">{this.props.colorFormat}</h3>;
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
