"use client";

import React, { useState } from "react";

export default function CalcApp() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const handleDigit = (digit: string) => {
    if (overwrite || display === "0") {
      setDisplay(digit);
      setOverwrite(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOp = (op: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && operation) {
      let res = prevValue;
      if (operation === "+") res += current;
      if (operation === "-") res -= current;
      if (operation === "*") res *= current;
      if (operation === "/") res = current !== 0 ? res / current : 0;
      setDisplay(String(res));
      setPrevValue(res);
    } else {
      setPrevValue(current);
    }
    setOperation(op);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (prevValue === null || !operation) return;
    const current = parseFloat(display);
    let res = prevValue;
    if (operation === "+") res += current;
    if (operation === "-") res -= current;
    if (operation === "*") res *= current;
    if (operation === "/") res = current !== 0 ? res / current : 0;
    setDisplay(String(res));
    setPrevValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  return (
    <div className="p-3 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col justify-between h-full select-none space-y-3">
      {/* LCD Display */}
      <div className="bevel-in bg-white p-2.5 text-right font-mono text-2xl font-bold text-black overflow-hidden truncate">
        {display}
      </div>

      {/* Top Buttons: Backspace, CE, C */}
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => {
            if (display.length > 1) setDisplay(display.slice(0, -1));
            else setDisplay("0");
          }}
          className="win95-btn px-3 py-1 font-sans text-xs text-[#800000] font-bold"
        >
          Backspace
        </button>
        <button
          type="button"
          onClick={() => setDisplay("0")}
          className="win95-btn px-3 py-1 font-sans text-xs text-[#800000] font-bold"
        >
          CE
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="win95-btn px-3 py-1 font-sans text-xs text-[#800000] font-bold"
        >
          C
        </button>
      </div>

      {/* Number Pad Grid */}
      <div className="grid grid-cols-5 gap-1.5 pt-1">
        {/* Row 1 */}
        <button type="button" onClick={() => handleDigit("7")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">7</button>
        <button type="button" onClick={() => handleDigit("8")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">8</button>
        <button type="button" onClick={() => handleDigit("9")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">9</button>
        <button type="button" onClick={() => handleOp("/")} className="win95-btn py-1.5 font-bold text-sm text-[#800000]">/</button>
        <button type="button" onClick={() => { setDisplay(String(Math.sqrt(parseFloat(display)))); setOverwrite(true); }} className="win95-btn py-1.5 font-pixel text-[10px] text-[#000080]">sqrt</button>

        {/* Row 2 */}
        <button type="button" onClick={() => handleDigit("4")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">4</button>
        <button type="button" onClick={() => handleDigit("5")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">5</button>
        <button type="button" onClick={() => handleDigit("6")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">6</button>
        <button type="button" onClick={() => handleOp("*")} className="win95-btn py-1.5 font-bold text-sm text-[#800000]">*</button>
        <button type="button" onClick={() => { setDisplay(String(parseFloat(display) / 100)); setOverwrite(true); }} className="win95-btn py-1.5 font-pixel text-[10px] text-[#000080]">%</button>

        {/* Row 3 */}
        <button type="button" onClick={() => handleDigit("1")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">1</button>
        <button type="button" onClick={() => handleDigit("2")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">2</button>
        <button type="button" onClick={() => handleDigit("3")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">3</button>
        <button type="button" onClick={() => handleOp("-")} className="win95-btn py-1.5 font-bold text-sm text-[#800000]">-</button>
        <button type="button" onClick={() => { setDisplay(String(1 / parseFloat(display))); setOverwrite(true); }} className="win95-btn py-1.5 font-pixel text-[10px] text-[#000080]">1/x</button>

        {/* Row 4 */}
        <button type="button" onClick={() => handleDigit("0")} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">0</button>
        <button type="button" onClick={() => { if (!display.includes(".")) setDisplay(display + "."); setOverwrite(false); }} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">.</button>
        <button type="button" onClick={() => { setDisplay(String(-parseFloat(display))); }} className="win95-btn py-1.5 font-bold text-sm text-[#000080]">+/-</button>
        <button type="button" onClick={() => handleOp("+")} className="win95-btn py-1.5 font-bold text-sm text-[#800000]">+</button>
        <button type="button" onClick={handleEquals} className="win95-btn py-1.5 font-bold text-sm text-[#800000]">=</button>
      </div>
    </div>
  );
}

