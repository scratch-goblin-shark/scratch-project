import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavBarElements'



function NavBar({
  setFirstName,
  setAge,
  setEmergencyContactName,
  setEmergencyContactPhone,
  setMissedLogin,
  setAddiction,
  setMoodHistory,
  setIsLoggedIn,
}) {


      function logOut() {
        setFirstName("");
        setAge(0);
        setEmergencyContactName("");
        setEmergencyContactPhone(0);
        setMissedLogin(0);
        setAddiction("");
        setMoodHistory([]);
        setIsLoggedIn(false);
      }

      return (
        <>

        <Nav>
         <NavLink to="/">
           <h1>SUD app</h1>
         </NavLink>
         <Bars />
         <NavMenu>
         { isLoggedIn === false &&
           <NavLink to="/">
             Home
           </NavLink>
         }
           { isLoggedIn === true &&
           <NavLink to="/user">
             Dashboard
           </NavLink>
           }
           { isLoggedIn === false &&
           <NavLink to="/login">
             Login
           </NavLink>
           }
         </NavMenu>
           { isLoggedIn === true &&
           <NavBtn onClick={(() => logOut())} >
           <NavBtnLink to="/login">Log Out</NavBtnLink>
         </NavBtn>
           }
         { isLoggedIn === false &&
         <NavBtn>
           <NavBtnLink to="/login">Sign In</NavBtnLink>
         </NavBtn>
         }
        </Nav>
        </>
      )
}

export default NavBar;