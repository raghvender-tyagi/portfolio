"use client";

import React, { useEffect, useRef } from "react";
import PixelSprite from "../PixelSprite";
import { useWindowStore } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import {
  dialogInfo32,
  dialogWarning32,
  dialogError32,
  dialogQuestion32,
} from "@/data/sprites";

export default function SystemAlert() {
  const { systemAlert, closeAlert, soundEnabled } = useWindowStore();
  const okBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (systemAlert?.open) {
      soundManager.playAlertBeep(soundEnabled);
      // Auto-focus default button
      setTimeout(() => okBtnRef.current?.focus(), 50);
    }
  }, [systemAlert?.open, soundEnabled]);

  // Keyboard navigation: Escape cancels, Enter confirms
  useEffect(() => {
    if (!systemAlert?.open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        systemAlert.onCancel?.();
        closeAlert();
      } else if (e.key === "Enter") {
        e.preventDefault();
        systemAlert.onOk?.();
        closeAlert();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [systemAlert, closeAlert]);

  if (!systemAlert || !systemAlert.open) return null;

  const iconType = systemAlert.type || "info";
  let sprite = dialogInfo32;
  if (iconType === "warning") sprite = dialogWarning32;
  if (iconType === "error") sprite = dialogError32;
  if (iconType === "question") sprite = dialogQuestion32;

  const buttons = systemAlert.buttons || "ok";

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      aria-describedby="alert-message"
      className="fixed inset-0 bg-black/35 z-[100] flex items-center justify-center p-4 select-none"
    >
      <div className="w-full max-w-sm bevel-window bg-[#C0C0C0] p-1 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
        {/* Title Bar */}
        <div className="h-6 titlebar-active flex items-center justify-between px-1.5 select-none">
          <span
            id="alert-title"
            className="font-pixel text-[11px] font-bold text-white truncate"
          >
            {systemAlert.title || "RT-OS 95"}
          </span>
          <button
            type="button"
            onClick={() => {
              systemAlert.onCancel?.();
              closeAlert();
            }}
            aria-label="Close"
            className="titlebar-btn text-[10px]"
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 pt-0.5">
              <PixelSprite sprite={sprite} scale={1} />
            </div>
            <div
              id="alert-message"
              className="font-mono text-xs text-black leading-relaxed select-text flex-1"
            >
              {systemAlert.message}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            {buttons === "ok" && (
              <button
                ref={okBtnRef}
                type="button"
                onClick={() => {
                  systemAlert.onOk?.();
                  closeAlert();
                }}
                className="win95-btn px-6 py-1 font-bold dotted-focus"
              >
                OK
              </button>
            )}

            {buttons === "okCancel" && (
              <>
                <button
                  ref={okBtnRef}
                  type="button"
                  onClick={() => {
                    systemAlert.onOk?.();
                    closeAlert();
                  }}
                  className="win95-btn px-5 py-1 font-bold dotted-focus"
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={() => {
                    systemAlert.onCancel?.();
                    closeAlert();
                  }}
                  className="win95-btn px-5 py-1"
                >
                  Cancel
                </button>
              </>
            )}

            {buttons === "yesNo" && (
              <>
                <button
                  ref={okBtnRef}
                  type="button"
                  onClick={() => {
                    systemAlert.onOk?.();
                    closeAlert();
                  }}
                  className="win95-btn px-5 py-1 font-bold dotted-focus"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    systemAlert.onCancel?.();
                    closeAlert();
                  }}
                  className="win95-btn px-5 py-1"
                >
                  No
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
