import React from 'react'
import '../css/Searchbar.css'
import { Button } from './Button'

function Searchbar() {
    return (
        <div className="search">
            <div className="searchField">
                <input type="text" className="searchTerm" id="input_text"></input>
            </div>
            <Button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
            </Button>
        </div>
    )
}

export default Searchbar
