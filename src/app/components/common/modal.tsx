import { ComponentBox } from "@/app/components/common/component-box";
import { X } from "lucide-react";
import { forwardRef, PropsWithChildren } from "react";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, onClose, children, className }, ref) => {
    return (
      <>
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div ref={ref} {...{ className }}>
              <ComponentBox className="bg-white relative">
                <div
                  className="cursor-pointer absolute top-1 right-1"
                  onClick={onClose}
                >
                  <X className="text-dark-violet" />
                </div>

                {children}
              </ComponentBox>
            </div>
          </div>
        )}
      </>
    );
  }
);
