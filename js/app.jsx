import React from 'react';
import ReactDOM from 'react-dom';
import ColorInput from './colorinput.jsx';
import ConvertedColors from './convertedcolors.jsx';

document.addEventListener('DOMContentLoaded',function(){

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

    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                activeColor : '',
                colorFormat : '',
            };
        }

        handleButtonClick = (color,format,message) => {
            this.setState({
                activeColor : color,
                colorFormat : format,
            });
        }

        render() {
            return (
                <div>
                    <h1>Color Converter ReactJS</h1>
                    <ColorBackground color={this.state.activeColor}/>
                    <ColorInput getColor={this.handleButtonClick}/>
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
