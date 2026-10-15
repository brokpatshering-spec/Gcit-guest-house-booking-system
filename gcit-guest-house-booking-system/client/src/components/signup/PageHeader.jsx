import React from "react";
/**
* PageHeader
* Takes a title and subtitle as props so this same component
* could be reused on other pages (e.g. Sign In, Forgot Password)
* just by passing different text.
*/
export default function PageHeader({ title, subtitle }) {
 return (
   <>
     <h1 className="signup-title">{title}</h1>
     <p className="signup-subtitle">{subtitle}</p>
   </>
 );
}
