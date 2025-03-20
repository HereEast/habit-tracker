import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "~/utils/helpers";

interface ModalProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ title, children, className }: ModalProps) {
  return createPortal(
    // Overlay
    <div className="bg-brown-900/30 flex size-full items-center justify-center">
      {/* Content */}
      <div className={cn("w-full max-w-[420px] p-4", className || "")}>
        <div className="bg-brown-100 rounded-xl p-6">
          <div className="mb-3">
            <h2 className="font-medium">{title}</h2>
          </div>

          <div className="flex gap-2">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-modal") as HTMLElement,
  );
}
