import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  const passRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumber) str += "0123456789";
    if (charAllowed) str += "!@#`~$%^&*()_+-0=|][{}'/?.,;";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, includeNumber, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 65);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumber, charAllowed, passwordGenerator]);

  return (
    <>
      <div
        id="bgDiv"
        className="w-full max-w-md mx-auto rounded-[50px] px-4 my-8 pb-10 flex flex-col justify-center align-middle h-[100vh] pt-8 text-black"
      >
        <h1 className="text-2xl text-center font-bold  pb-8">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-blue-950 font-bold">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button
            id="copyBtn"
            onClick={copyPassword}
            className="outline-none p-3 shrink-0"
          >
            📋
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              className="cursor-pointer"
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={includeNumber}
              id="numberInput"
              onChange={(event) => {
                setIncludeNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={(event) => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
