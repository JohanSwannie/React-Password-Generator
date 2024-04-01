import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowSpecialCharacters, setAllowSpecialCharacters] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState(9);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };
  const generatePassword = useCallback(() => {
    let passw = "";
    let passwString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumbers) {
      passwString += "0123456789";
    }
    if (allowSpecialCharacters) {
      passwString += "!@#$%^&*()_";
    }
    const passwArray = passwString.split("");
    for (let i = 0; i < passwordLength; i++) {
      const character =
        passwArray[Math.floor(Math.random() * passwArray.length + 1)];
      passw += character;
    }
    setPassword(passw);
  }, [allowNumbers, allowSpecialCharacters, passwordLength]);

  useEffect(() => {
    generatePassword();
  }, [allowNumbers, allowSpecialCharacters, passwordLength, newPassword]);

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <div className="top-row">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}>Copy</button>
        <button onClick={() => setNewPassword((prevPassword) => !prevPassword)}>
          Generate New Password
        </button>
      </div>
      <div className="bottom-row">
        <div>
          <label>Password Length : {passwordLength}</label>
          <input
            type="range"
            min={9}
            max={20}
            value={passwordLength}
            onChange={(event) => setPasswordLength(event.target.value)}
          />
        </div>
        <div>
          <label>Allow Numbers : </label>
          <input
            type="checkbox"
            defaultChecked={allowNumbers}
            onChange={() => setAllowNumbers((prevAllowNbrs) => !prevAllowNbrs)}
          />
        </div>
        <div>
          <label>Allow Special Characters</label>
          <input
            type="checkbox"
            defaultChecked={allowSpecialCharacters}
            onChange={() =>
              setAllowSpecialCharacters((prevAllowSpecial) => !prevAllowSpecial)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
