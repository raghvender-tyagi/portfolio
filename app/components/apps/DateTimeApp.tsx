"use client";

import React, { useState, useEffect } from "react";
import TabbedDialog, { TabItem } from "../os/TabbedDialog";
import { useWindowStore } from "@/lib/os/windowStore";

export default function DateTimeApp() {
  const { closeWindow } = useWindowStore();
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    const win = useWindowStore
      .getState()
      .windows.find((w) => w.appId === "dateTimeProperties");
    if (win) closeWindow(win.id);
  };

  // Build calendar days
  const year = currentDate ? currentDate.getFullYear() : 2026;
  const month = currentDate ? currentDate.getMonth() : 9;
  const todayDate = currentDate ? currentDate.getDate() : 17;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: Array<number | null> = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const tabs: TabItem[] = [
    {
      id: "datetime",
      label: "Date & Time",
      content: (
        <div className="space-y-4 text-xs font-mono select-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Calendar Box */}
            <div className="space-y-1.5">
              <span className="font-pixel text-[10px] font-bold text-black block">
                {monthNames[month]} {year}
              </span>
              <div className="bevel-in bg-white p-2">
                <div className="grid grid-cols-7 gap-1 text-center font-pixel text-[9px] text-[#000080] border-b border-neutral-300 pb-1 mb-1">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                  {calendarDays.map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-0.5 ${
                        day === todayDate
                          ? "bg-[#000080] text-white font-bold dotted-focus"
                          : day
                          ? "text-neutral-900"
                          : ""
                      }`}
                    >
                      {day || ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Box */}
            <div className="space-y-1.5 flex flex-col justify-between">
              <span className="font-pixel text-[10px] font-bold text-black block">
                Current Time
              </span>
              <div className="bevel-in bg-white p-4 flex flex-col items-center justify-center space-y-2">
                <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center relative bg-neutral-100">
                  <div className="w-1 h-8 bg-black origin-bottom -translate-y-4" />
                  <div className="w-1 h-6 bg-[#000080] origin-bottom translate-x-3 -translate-y-2" />
                  <div className="w-2 h-2 rounded-full bg-[#FF0000] absolute" />
                </div>
                <div className="font-pixel text-xs font-bold text-[#000080]">
                  {currentDate.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#808080] flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="win95-btn px-4 py-1 font-pixel text-[10px] font-bold"
            >
              OK
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="win95-btn px-4 py-1 font-pixel text-[10px]"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "timezone",
      label: "Time Zone",
      content: (
        <div className="space-y-3 text-xs font-mono select-none">
          <span className="font-pixel text-[10px] font-bold text-black block">
            Time Zone Selection
          </span>
          <div className="bevel-in bg-[#DFDFDF] p-3 text-neutral-800 text-xs space-y-1">
            <div className="font-bold text-black">(GMT+05:30) India Standard Time</div>
            <div className="text-[11px] text-neutral-600">Automatically adjust clock for daylight saving changes: N/A</div>
          </div>
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="win95-btn px-4 py-1 font-pixel text-[10px] font-bold"
            >
              OK
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full bg-[#C0C0C0]">
      <TabbedDialog tabs={tabs} />
    </div>
  );
}
