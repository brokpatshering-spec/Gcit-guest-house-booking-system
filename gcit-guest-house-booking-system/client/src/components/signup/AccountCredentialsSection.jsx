import React from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";


/**
* AccountCredentialsSection
* Same pattern as PersonalDetailsSection: pure layout + wiring,
* no state of its own. This is the section to point students to
* when comparing TextInput (dumb field) vs PasswordInput
* (field with its own tiny bit of UI state).
*/
export default function AccountCredentialsSection({ form, onChange }) {
 return (
   <>
     <p className="signup-section-label signup-section-label--spaced">
       Account Credentials
     </p>


     <TextInput
       type="email"
       name="email"
       placeholder="Email Address"
       value={form.email}
       onChange={onChange}
       required
     />


     <PasswordInput
       name="password"
       placeholder="Password"
       value={form.password}
       onChange={onChange}
       required
     />


     <TextInput
       type="password"
       name="confirmPassword"
       placeholder="Confirm Password"
       value={form.confirmPassword}
       onChange={onChange}
       required
     />
   </>
 );
}
