# React Selectable Grid with Explanation

This is a React component that implements a **selectable grid** where you can click and drag to select multiple cells.

```jsx
import { useState } from 'react';
export default function App() {
  // State to store selected cells
  let [selectedcell, setselectedcell] = useState([]);
  // State to track if mouse is currently pressed
  let [ismousedown, setismousedown] = useState(false);

  // Handle mouse down on a cell
  let handleMouseDown = (boxno) => {
    setismousedown(true); // start drag
    setselectedcell([boxno]); // select the first cell
  };

  // Handle mouse entering another cell during drag
  let handleMouseEnter = (boxno) => {
    if (ismousedown) {
      let startBox = selectedcell[0];
      let endBox = boxno;

      // Calculate row and column of start and end cells
      let startRow = Math.floor((startBox - 1) / 15);
      let startCol = (startBox - 1) % 15;
      let endRow = Math.floor((endBox - 1) / 15);
      let endCol = (endBox - 1) % 15;

      const selected = [];
      // Select all cells in the rectangle defined by start and end
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          selected.push(i * 15 + j + 1);
        }
      }
      setselectedcell(selected); // update selected cells
    }
  };

  // Handle mouse release
  let handleMouseUp = () => {
    setismousedown(false); // end drag
  };

  return (
    <>
      <h1>Selectable Grid</h1>
      <div className='grid_container' onMouseUp={handleMouseUp}>
        {[...Array(15 * 10).keys()].map((cell) => (
          <div
            key={cell}
            className={selectedcell?.includes(cell + 1) ? 'cell active' : 'cell'}
            onMouseDown={() => handleMouseDown(cell + 1)}
            onMouseEnter={() => ismousedown && handleMouseEnter(cell + 1)}
          >
            {cell + 1}
          </div>
        ))}
      </div>
    </>
  );
}
```

## How It Works

1. **State Management:**
   - `selectedcell`: Array of currently selected cell numbers.
   - `ismousedown`: Tracks whether the user is currently dragging.

2. **Mouse Events:**
   - `onMouseDown`: Triggered when a user clicks a cell, starts selection.
   - `onMouseEnter`: Triggered when the mouse moves over a cell while dragging. Updates selection range.
   - `onMouseUp`: Triggered when the user releases the mouse, ends drag.

3. **Selection Logic:**
   - Calculates the row and column of the start and end cells.
   - Loops through the rectangle defined by these rows and columns.
   - Adds all cells in the rectangle to `selectedcell`.

4. **Grid Rendering:**
   - Creates a 15x10 grid using `Array(15*10).keys()`.
   - Each cell is rendered as a `div` with `cell` or `cell active` class.
   - Dynamically applies styles based on selection.

5. **CSS (example)**
```css
.grid_container {
  display: grid;
  grid-template-rows: repeat(10, 40px);
  grid-template-columns: repeat(15, 40px);
  gap: 2px;
  user-select: none;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}
.active {
  background-color: rgb(239, 143, 143);
}
```

## Key Concepts Highlighted for Interview

- **Event Handling in React:** Using `onMouseDown`, `onMouseEnter`, `onMouseUp` with React’s synthetic events.
- **State Updates:** `useState` for tracking selected cells and mouse state.
- **Conditional Rendering:** Changing class based on selection.
- **Drag Selection:** Implementing multi-cell selection using mouse events and calculating positions.
- **Efficiency:** Using a single `.map()` loop and state array to render and track all cells.

This is a classic example of **React event delegation, synthetic events, and state-driven UI updates** in a real-world scenario.
