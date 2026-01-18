import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

export function Modal({ isOpen, onClose, title, message }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-red-900 p-6 shadow-lg min-w-75 z-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-6 h-6 border border-red-950"
                    >
                        ✕
                    </button>
                </div>
                <div className="mb-6">{message}</div>
                <div className="flex justify-end">
                    <button
                        className="border-red-950 border px-4 py-2"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
