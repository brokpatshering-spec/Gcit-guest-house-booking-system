import React, { useState } from "react";


/**
* PasswordInput
* Same idea as TextInput, but owns one small piece of its OWN
* state (showPassword) instead of getting it from the parent.
* Good example for students of "state that only this component
* cares about" vs "state the parent needs" (the actual password
* value, which still comes from props).
*/
export default function PasswordInput({ name, placeholder, value, onChange, required }) {
 const [showPassword, setShowPassword] = useState(false);


 return (
   <div className="signup-field">
     <input
       type={showPassword ? "text" : "password"}
       name={name}
       placeholder={placeholder}
       value={value}
       onChange={onChange}
       required={required}
     />
     <button
       type="button"
       className="signup-eye-btn"
       onClick={() => setShowPassword((prev) => !prev)}
       aria-label={showPassword ? "Hide password" : "Show password"}
     >
       {showPassword ? (
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
           <path
             d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.3 5.3A10.9 10.9 0 0 1 12 5c5 0 9 4 10 7a12.5 12.5 0 0 1-3.1 4.2M6.5 6.7C4.6 8 3.2 9.9 2 12c1 3 5 7 10 7 1.3 0 2.6-.2 3.7-.7"
             stroke="currentColor"
             strokeWidth="1.6"
             strokeLinecap="round"
             strokeLinejoin="round"
           />
         </svg>
       ) : (
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
           <path
             d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
             stroke="currentColor"
             strokeWidth="1.6"
             strokeLinejoin="round"
           />
           <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
         </svg>
       )}
     </button>
   </div>
 );
}
