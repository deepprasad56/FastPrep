# 🔢 React OTP Input Component

This project demonstrates how to build a custom **OTP (One-Time Password) input field** in React using:

- `useRef` → to manage direct input focus
- `useState` → to track OTP values
- `useEffect` → to handle initial focus

---

## 🚀 Features
1. Auto-focuses the **first input** on mount.
2. Moves to the **next input** automatically when a digit is entered.
3. Handles **Backspace** by moving focus back to the previous input.
4. Allows selecting the entire input content on focus (`onFocus` with `select()`).
5. Uses an array to store OTP values for easy manipulation.

---

## 🗂️ Code Overview

### 🔑 Component Setup
```jsx
import { useEffect, useRef, useState } from 'react';
export default function App() {

  let no = 4
  let inputs = useRef([])
  console.log(inputs)
  let [otp, setotp] = useState(new Array(no).fill(" "))
  useEffect(() => {
    inputs.current[0].focus()
  }, [])
  let inputhandler = (e, i) => {
    
    
    if (e.target.value && i < no - 1) {
      
      let newotp = [...otp]
      newotp[i] = inputs.current[i]
      setotp(newotp)
      inputs.current[i + 1].focus()
      
    }
    
  }
  let keydownhandler = (e,i) => {
    if (e.key == 'Backspace' && i>0) {
      e.preventDefault()
      inputs.current[i].value=''
      inputs.current[i - 1].focus()
    }
  }
  return (
    <>

      <h1>Practicing USE REF</h1>

      {
        otp.map((digit, index) => {
          return (
            <input type='numeric' class='input '
            maxlength={1}
              ref={(el) => inputs.current[index] = el}
              onChange={(e) => inputhandler(e, index)}
              onKeyDown={(e) => keydownhandler(e, index)}
            onFocus={(e)=>e.target.select()}
            />
          )
        })
       }
     
    </>
  )
}
```
``` css
body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}
.input{
  width: 50px;
  height: 50px;
  margin: 4px;
}
```





