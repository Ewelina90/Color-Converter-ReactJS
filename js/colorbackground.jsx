import React from 'react';
import ReactDOM from 'react-dom';

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
export default ColorBackground;
