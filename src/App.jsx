import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // use ref var
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "@#$%&_~?*-()={}[]";

    let char = "";

    for (let i = 1; i <= length; i++) {
      char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    specialCharAllowed,
    numberAllowed,
    setPassword,
    passwordGenerator,
  ]);

  return (
    <div className="mx-5 sm:w-full sm:max-w-2xl sm:mx-auto my-7">
      <h1 className="text-gray-100 shadow font-bold text-center my-7 text-[25px]  sm:text-5xl  p-4">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 text-xl text-gray-800 font-semibold"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="text-2xl relative flex py-2 w-40 items-center justify-center overflow-hidden bg-gray-600 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-600 before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56 focus:transform active:scale-75 duration-500"
        >
          <span className="relative z-10 ">Copy</span>
        </button>
      </div>

      <div className="sm:flex text-xl gap-x-10 my-7">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="hover:cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="pl-3 text-xl font-semibold text-gray-200">
            Length : {length}
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
            onChange={(e) => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label className="pl-3 text-xl font-semibold text-gray-200">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={specialCharAllowed}
            id="numberInput"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
            onChange={(e) => {
              setSpecialCharAllowed((prev) => !prev);
            }}
          />
          <label className="pl-3 text-xl font-semibold text-gray-200">
            Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
