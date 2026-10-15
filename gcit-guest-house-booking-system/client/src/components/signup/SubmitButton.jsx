import React from "react";


/**
* SubmitButton
* Purely visual + a "disabled" prop. Notice it doesn't know WHY
* it's disabled (unchecked terms box) - that logic lives in the
* parent. This keeps the button reusable for any form.
*/
export default function SubmitButton({ label, disabled }) {
 return (
   <button type="submit" className="signup-submit" disabled={disabled}>
     {label}
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
       <path
         d="M5 12h14M13 6l6 6-6 6"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
       />
     </svg>
   </button>
 );
}
