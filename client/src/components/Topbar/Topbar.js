import React from 'react'

import './Topbar.scss'

const Topbar = () => {
    return (
        <div class="navbar">
            <div class="dropdown">
                <button class="dropbtn" onclick="myFunction()">
                    My Account
                    {/* <i class="fa fa-caret-down"></i> */}
                </button>
                <div class="dropdown-content" id="myDropdown">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        </div>
    )
}

export default Topbar