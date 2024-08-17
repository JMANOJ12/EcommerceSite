import React from 'react';
import './CSS/LoginSignup.css'; 



const LoginSignup = () => {
    return (
        <div className='login-signup' >
            <div className='loginsignup-container'>
                <h1> Sign Up </h1>
                <div className='loginsingup-field'>
                    <input type="text" placeholder='Your Name' />
                    <input type='email' placeholder='Your Email' />
                    <input type = 'password' placeholder = 'Password' />

                </div>

                <button> Continue </button>
                <p className='loginsingup-login'> Already Have An Account? <span> Login Here </span> </p>
                <div className='loginsingup-agree'>
                    <input type='checkbox' name=' ' id=' ' /> 
                    <p> By Continuing, I agree to the terms of use & privacy policy.  </p>
                </div>
            </div>



        </div>
    )
}


export default LoginSignup; 
