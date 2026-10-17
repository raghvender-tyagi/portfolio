"use client";

import React, { useEffect } from "react";
import Window from "../Window";
import BevelButton from "../BevelButton";
import PixelSprite from "../PixelSprite";
import { useWindowStore } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import { robotFaceSprites } from "@/data/sprites";

export default function SystemAlert() {
  const { systemAlert, closeAlert, soundEnabled } = useWindowStore();

  useEffect(() => {
    if (systemAlert?.open) {
      soundManager.playAlertBeep(soundEnabled);
    }
  }, [systemAlert?.open, soundEnabled]);

  if (!systemAlert || !systemAlert.open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      aria-describedby="alert-message"
      className="fixed inset-0 bg-black/40 z-[90] flex items-center justify-center p-4 select-none"
    >
      <div className="w-full max-w-sm">
        <Window
          title={systemAlert.title || "System Alert"}
          status="SYSTEM NOTIFICATION"
          collapsible={false}
        >
          <div className="space-y-4 text-center">
            <div className="flex justify-center py-2">
              <PixelSprite sprite={robotFaceSprites.blink} scale={3} />
            </div>

            <div
              id="alert-title"
              className="font-heading font-bold text-lg text-black"
            >
              {systemAlert.title}
            </div>

            <p
              id="alert-message"
              className="font-mono text-xs text-black/85 leading-relaxed"
            >
              {systemAlert.message}
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <BevelButton
                onClick={() => {
                  systemAlert.onOk?.();
                  closeAlert();
                }}
                variant="inverted"
                size="sm"
              >
                [ OK ]
              </BevelButton>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
}
