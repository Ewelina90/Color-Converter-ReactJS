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
