import { useState, useCallback, useEffect, useRef } from 'react'
import zxcvbn from 'zxcvbn';
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [passsword, setPassword] = useState('')
  const passwordRef = useRef(null)
  const [copied, setCopied] = useState(false);
  const placeAtStart = Math.random() < 0.5; // Randomly decide whether to place the reference at the start or end
const [reference, setReference] = useState('');

const [strengthLabel, setStrengthLabel] = useState('idle');


const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let randomPart = ''


    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"
    const loopLength = Math.max(length - reference.length, 0 )


    for (let i = 1; i <= loopLength; i++) {
      let char = Math.floor(Math.random() * str. length + 1)
      pass += str.charAt(char);
      randomPart += str.charAt(char);
    }
    

    
      
    const finalPassword = placeAtStart
    ? reference + randomPart
    : randomPart + reference;



   
   setPassword(finalPassword);

const score = zxcvbn(finalPassword).score;

// 👇 Yeh do line daal do yahaan
console.log("Generated Password:", finalPassword);
console.log("Password Strength Score:", score);

let label = "";
if (score < 3) label = "weak";
else if (score === 3) label = "moderate";
else label = "strong";

setStrengthLabel(label);

  
  
  
  },
    [length , numberAllowed, charAllowed, reference]);

  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 51) // For mobile devices
    window.navigator.clipboard.writeText(passsword) 
    setCopied(true) //show "Copied!"
    //Reset after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }
  , [passsword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>

    <div className="min-h-screen flex flex-col justify-between">
      <div className='w-full max-w-md mx-auto shadow-lg px-4 my-8 bg-gray-700 rounded-lg'>
        <h1 className='text-white text-center text-2xl p-3'>Password Generator</h1>
         
         <div className="flex items-center gap-x-2 mb-3">
  <input
    type="text"
    placeholder="Enter reference"
    value={reference}
    onChange={(e) => setReference(e.target.value)}
    className="w-full px-3 py-2 rounded-l-lg bg-white text-black"
  />
  <button
    type="button"
    onClick={passwordGenerator}
    className="bg-green-600 text-white px-3 py-2 rounded-r-lg hover:bg-green-700 active:scale-95 transition"
  >
    Generate
  </button>
</div>
        <div className='flex shadow-lg  overflow-hidden gap-x-2 mb-2'>
          <input
            type="text"
            value={passsword}
            className="text-base outline-none w-full px-3 py-2 rounded-l-lg bg-white text-black"
            placeholder='password'
            readOnly
            ref={passwordRef}
            
            
          />
          <button
          type="button"
            onClick={copyPasswordToClipboard}
            className='outline-none bg-indigo-500 text-white px-3 py-1.5 shrink-0 rounded-r-lg hover:bg-indigo-600 active:scale-95 transition duration-150'

          >
            {copied ? 'Copied!' : 'Copy '}
           
          </button>
        </div>

        <div className='flex flex-row  items-center text-sm gap-y-2 text-white gap-x-2.5'>
          <div className='flex items-center gap-x-1 '>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 my-2'>
            <input
              type="checkbox"
              id='number'
              checked={numberAllowed}
              onChange={() => {setNumberAllowed((prev) => !prev)

              }}
            />
            <label htmlFor='number'> Numbers</label>
          </div>
           <div className='flex items-center gap-x-1 my-2'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);

              }}
            />
            <label htmlFor='characterInput'> Characters</label>
          </div>
        </div>
      </div>
       <div className="flex justify-center my-4">
      <div className="flex justify-center my-6">
          <img
            src={`/teddy-${strengthLabel}.png`}
            alt={`Teddy showing ${strengthLabel} strength`}
            className="w-34 md:w-62 transition-transform hover:scale-105"
          />
      </div>
      </div>

   <footer
  className="text-center text-sm text-white mt-10 py-4 border-t border-gray-500"
  style={{ backgroundColor: '#1f2937' }} // Tailwind's gray-800
>

  <p>🧑‍💻 Built by <span className="font-semibold text-indigo-300">Deepak Sharma</span></p>
  <p>🎨 Idea & Design inspiration: <span className="text-green-300">kashish Garg</span></p>
  <p>📧 Contact: <a href="mailto:deepak@example.com" className="text-blue-400 hover:underline">deepakmyside@gmail.com</a></p>
  <p className="mt-2 text-pink-400 font-bold animate-pulse">🌟 Special thanks & endless respect to <span className="underline">Kashish Garg</span> — The real MVP! 🌟</p>
</footer>


</div>

    </>


  )
}

export default App
