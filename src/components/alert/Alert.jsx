import React from 'react'
import './Alert.css';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../reducers/AlertReducers.js';


function Alert(display) {
    const dispatch = useDispatch();
    var handleClose = () => {
        dispatch(setAlert('d-none'))
    }
    return (
        <div>
            <div className={`alertOuter ${display}`}>
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-lg-4 col-9 alertInnerBody">
                            <div className="alertInner rounded px-2 py-2 text-center">
                                <div className=' text-end px-2 py-1 text-dark'><button className='closeButtonAlert' onClick={handleClose}>&#x2715;</button></div>
                                <div className='alert-content py-2'>
                                    <p>something went wrong try again!</p>
                                    <button className='tryButton text-white px-3 py-1' onClick={handleClose}>close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert