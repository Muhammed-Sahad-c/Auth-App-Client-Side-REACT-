import React from 'react'

function Error() {
  return (
    <div>
      <div className="bg-dark w-100 d-flex flex-column justify-content-center align-items-center text-white" style={{height:"100vh"}}>
        <h1>404</h1> <br />
        <h2>Page Not Found!</h2>
        <a href="/">go back to home</a>
      </div>
    </div>
  )
}

export default Error