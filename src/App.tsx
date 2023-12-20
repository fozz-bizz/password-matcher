import { useState } from "react";
import "./App.css";
import { VALIDATION_STATUS, usePasswordMatcher } from "./hooks";

function App() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const {
    hasValidLength,
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    isMatch,
    validate
  } = usePasswordMatcher({ password, passwordConfirmation, requiredLength: 6 });

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    validate();
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            value={password}
            onChange={onPasswordChange}
            type="password"
          />
        </div>
        <div>
          <label htmlFor="password-confirmation">Confirmation: </label>
          <input
            id="password-confirmation"
            value={passwordConfirmation}
            onChange={onPasswordConfirmationChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
        {hasValidLength !== VALIDATION_STATUS.PENDING && (
          <div>
            <ul>
              <li>Valid Length: {hasValidLength}</li>
              <li>Has a Number: {hasNumber}</li>
              <li>Has a UpperCase: {hasUpperCase}</li>
              <li>Has a LowerCase: {hasLowerCase}</li>
              <li>Has a Special Character: {hasSpecialChar}</li>
              <li>Password Match: {isMatch}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
