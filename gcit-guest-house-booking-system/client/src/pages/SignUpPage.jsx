import React, { useState } from "react";
import Logo from "../components/signup/Logo";
import PageHeader from "../components/signup/PageHeader";
import InfoNote from "../components/signup/InfoNote";
import TermsCheckbox from "../components/signup/TermsCheckbox";
import SubmitButton from "../components/signup/SubmitButton";
import PersonalDetailsSection from "../components/signup/PersonalDetailsSection";
import AccountCredentialsSection from "../components/signup/AccountCredentialsSection";
import { toast } from "react-toastify";


const API_URL = `${process.env.REACT_APP_API_URL}/auth/register`;


export default function SignUpPage() {
 const [form, setForm] = useState({
   fullName: "",
   phone: "",
   email: "",
   password: "",
   confirmPassword: "",
 });
 const [agreed, setAgreed] = useState(false);
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);


 const handleChange = (e) => {
   const { name, value } = e.target;
   setForm((prev) => ({ ...prev, [name]: value }));
   if (error) setError("");
 };


 const validate = () => {
   if (!form.fullName || !form.email || !form.password) {
     return "Name, email and password are required.";
   }
   if (form.password.length < 8) {
     return "Password must be at least 8 characters.";
   }
   if (form.password !== form.confirmPassword) {
     return "Passwords do not match.";
   }
   if (!agreed) {
     return "Please agree to the Terms of Service and Privacy Policy.";
   }
   return "";
 };


 const handleSubmit = async (e) => {
   e.preventDefault();


   const validationError = validate();
   if (validationError) {
     setError(validationError);
     toast.error(validationError);
     return;
   }


   setLoading(true);
   setError("");


   try {
     const response = await fetch(API_URL, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         name: form.fullName,
         email: form.email,
         password: form.password,
         phone: form.phone,
       }),
     });


     const data = await response.json();


     if (!response.ok) {
       const message = data.message || "Something went wrong. Please try again.";
       setError(message);
       toast.error(message);
       return;
     }


     toast.success("Registration successful! You can now sign in.");
     setForm({ fullName: "", phone: "", email: "", password: "", confirmPassword: "" });
     setAgreed(false);
     console.log("Registered user:", data.user);
   } catch (err) {
     const message = "Could not reach the server. Please try again.";
     setError(message);
     toast.error(message);
   } finally {
     setLoading(false);
   }
 };


 return (
   <div className="signup-page">
     <div className="signup-container">
       <Logo />


       <PageHeader
         title="Create Your Account"
         subtitle="Join GCIT Guest House Booking System to access premium services and seamless room bookings."
       />


       <form className="signup-card" onSubmit={handleSubmit}>
         <PersonalDetailsSection form={form} onChange={handleChange} />
         <AccountCredentialsSection form={form} onChange={handleChange} />


         <InfoNote>
           Note: You must have an active account to proceed with any room
           bookings or service requests.
         </InfoNote>


         <TermsCheckbox
           checked={agreed}
           onChange={(e) => setAgreed(e.target.checked)}
         />


         <SubmitButton
           label={loading ? "Registering..." : "Complete Registration"}
           disabled={!agreed || loading}
         />
       </form>


       <p className="signup-footer">
         Already have an account? <a href="#signin">Sign in</a>
       </p>
     </div>
   </div>
 );
}
