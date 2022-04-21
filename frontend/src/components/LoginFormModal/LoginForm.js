import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import * as roomsAction from "../../store/room";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpErrors, setSignUpErrors] = useState([]);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [formShown, setFormShown] = useState('signin');
  const [errors, setErrors] = useState([]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrors([]);
    if (newPassword === confirmPassword) {
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            return errors;
          }
        });
    } 
    return setSignUpErrors(['Confirm Password field must be the same as the Password field']);
  };

  const demoLogin = () => {
    return dispatch(sessionActions.login({credential: 'Demo-User', password: 'password'}))
  };

  return (
    <div className="modal-box">
    <div className="modal">
    <form className={formShown === 'signin' ? 'login-form' : 'hidden'} onSubmit={handleSignIn}>
      <ul>
        {errors.map((error, idx) => (
          <li className="login-errors" key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email:
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="login-form-button" type="submit">Log In</button>
      <button className="login-form-button" onClick={e => {e.preventDefault(); demoLogin();}}>Demo Login</button>
      <span className="modal-text">Not a User? <b className="modal-text modal-text-click" onClick={e => setFormShown('signup')}>Sign Up</b></span>
    </form>
    <div className="modal">
    <form className={formShown === 'signup' ? 'login-form' : 'hidden'} onSubmit={handleSignUp}>
      {errors.map((error, idx) => <li className='login-errors' key={idx}>{error}</li>)}
      <label>
        Username:
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          autoComplete="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          autoComplete="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button className="login-form-button" type="submit">Sign Up</button>
      <span className="modal-text modal-text-click" onClick={e => setFormShown('signin')}><b>Already have an Account?</b></span>
    </form>
    </div>
    </div>
    </div>
  );
}

export default LoginForm;