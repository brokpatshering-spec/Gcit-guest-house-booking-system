import React from "react";


/**
* Logo
* The brand mark used at the top of the sign-up page.
* Kept as its own component so it can be reused on the
* sign-in page, navbar, etc. without duplicating markup.
*/
export default function Logo() {
 return (
   <div className="signup-logo">
     <div className="signup-logo-badge" aria-hidden="true">
       <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
         <path
           d="M3 11.5L12 4l9 7.5"
           stroke="currentColor"
           strokeWidth="1.8"
           strokeLinecap="round"
           strokeLinejoin="round"
         />
         <path
           d="M5.5 10v8.5a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1V10"
           stroke="currentColor"
           strokeWidth="1.8"
           strokeLinecap="round"
           strokeLinejoin="round"
         />
         <text
           x="12"
           y="17.5"
           textAnchor="middle"
           fontSize="7.5"
           fontWeight="700"
           fill="currentColor"
           fontFamily="Montserrat, sans-serif"
         >
           G
         </text>
       </svg>
     </div>
     <span className="signup-logo-text">
       GCIT Guest House
       <br />
       Booking System
     </span>
   </div>
 );
}
