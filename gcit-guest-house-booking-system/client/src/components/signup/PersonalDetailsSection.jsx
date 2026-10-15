import React from "react";
import TextInput from "./TextInput";


/**
* PersonalDetailsSection
* Groups the "Personal Details" fields together as one section.
* It receives the whole form object + a single handleChange
* function from the page, rather than managing its own state -
* this is the "lifting state up" pattern.
*/
export default function PersonalDetailsSection({ form, onChange }) {
 return (
   <>
     <p className="signup-section-label">Personal Details</p>


     <TextInput
       type="text"
       name="fullName"
       placeholder="Full Name"
       value={form.fullName}
       onChange={onChange}
       required
     />


     <TextInput
       type="tel"
       name="phone"
       placeholder="Phone Number"
       value={form.phone}
       onChange={onChange}
       required
     />
   </>
 );
}
