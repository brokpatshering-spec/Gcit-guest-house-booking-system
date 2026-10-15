import React from "react";


/**
* InfoNote
* A small, presentation-only component: it just displays whatever
* text is passed to it. No state, no logic. Good first example for
* students of the simplest possible component shape.
*/
export default function InfoNote({ children }) {
 return (
   <div className="signup-note">
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="signup-note-icon">
       <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
       <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
       <circle cx="12" cy="8" r="0.9" fill="currentColor" />
     </svg>
     <span>{children}</span>
   </div>
 );
}
