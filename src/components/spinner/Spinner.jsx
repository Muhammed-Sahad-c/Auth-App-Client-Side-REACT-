import React from 'react'
import './Spinner.css'
function Spinner({ size, color }) {
    return (
        <div>
            <div className="spinner">
                <div className="spinner1" style={{ width: size, height: size, borderBottomColor: color, borderTopColor: color }}>
                </div>
            </div>
        </div>
    )
}

export default Spinner