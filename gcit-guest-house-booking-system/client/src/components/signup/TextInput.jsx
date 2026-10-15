import React from "react";

/**
* TextInput
* A plain, generic form field. Every "controlled input" in React
* follows this same pattern: value comes from state (props here),
* and onChange sends new keystrokes back up to that state.
*
* Props:
*  - type: "text" | "email" | "tel" ...
*  - name: matches the key in the parent's form state
*  - placeholder: label shown inside the field
*  - value / onChange: controlled input wiring
*/
export default function TextInput({ type = "text", name, placeholder, value, onChange, required }) {
 return (
   <div className="signup-field">
     <input
       type={type}
       name={name}
       placeholder={placeholder}
       value={value}
       onChange={onChange}
       required={required}
     />
   </div>
 );
}
