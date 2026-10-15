import React from "react";


/**
* TermsCheckbox
* A controlled checkbox. `checked` and `onChange` are passed down
* from the parent (the page), because the page needs to know
* whether the box is ticked in order to enable the submit button.
*/
export default function TermsCheckbox({ checked, onChange }) {
 return (
   <label className="signup-checkbox">
     <input type="checkbox" checked={checked} onChange={onChange} />
     <span>
       I agree to the <a href="#terms">Terms of Service</a> and{" "}
       <a href="#privacy">Privacy Policy</a>
     </span>
   </label>
 );
}
