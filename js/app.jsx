import React from 'react';
import ReactDOM from 'react-dom';
import ColorInput from './colorinput.jsx';
import ConvertedColors from './convertedcolors.jsx';
import ColorBackground from './colorbackground.jsx';

document.addEventListener('DOMContentLoaded',function(){

    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                activeColor : '',
                colorFormat : '',
                status : '',
            };
        }

        handleButtonClick = (color,format,message) => {
            this.setState({
                activeColor : color,
                colorFormat : format,
            });
        }

        validateColor = (statusColor) => {
            this.setState({
                status : statusColor,
            });
        }

        render() {
            return (
                <div>
                    <h1>Color Converter ReactJS</h1>
                    <ColorBackground color={this.state.activeColor}/>
                    <ColorInput getColor={this.handleButtonClick} validateColor={this.validateColor}/>
                    <ConvertedColors status={this.state.status} color={this.state.activeColor} colorFormat={this.state.colorFormat}/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
