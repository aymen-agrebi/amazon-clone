import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search.js'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'


function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }


    return (
        <div>
        <div className="header sticky">
            <div className="burger" type="button" >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            <Link to="/" >
            <div>
                <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </div>
            </Link>
            <div className="header_search">
                <input className="search_input" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>
            <div className="nav_links"> 
            <Link to="/Login">
                <div className="nav_link" onClick={handleAuthentication}>
                    <span className="span_one">Hello  {user ? user?.email : 'Guest'} </span>
                    <span className="span_two">{user ? 'Sign out' : 'Sign in'}
                    </span>
                </div>            
            </Link>
                <Link to="/orders">
                <div className="nav_link">
                    <span className="span_one">Returns</span>
                    <span className="span_two">& Orders</span>
                </div>
                </Link>

                <div className="nav_link">
                    <span className="span_one">Your</span>
                    <span className="span_two">Prime</span>
                </div>
                <Link to="/checkout" >
                    <div className="cart_wrapper nav_link">
                        <ShoppingBasketIcon />
                        <span className="cartItems_count">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>            
        </div>
    )
}
export default Header
