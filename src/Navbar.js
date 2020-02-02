import React, { Component } from 'react';



const Navbar = () => {

    const titleStyle={
        textAlign:'left',
        lineHeight:'40px',
        fontSize:'30px',
        marginLeft:'20px',
        fontWeight:'bold',
        fontStyle:'italic',
        color:'rgba(39, 29, 120, 0.78)'
    }
    return (
        <nav className="navigation" id="navigation">
            <div className="container-fluid">
                <div style={titleStyle}>TIME ADVANCE MECHANISM</div>
            </div>
        </nav>

    )
}

export default Navbar;