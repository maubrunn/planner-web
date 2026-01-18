import React, { useState } from "react";

import AddingForm from "./AddingForm";
import { DataEntry } from "./Datepicker";
import { Modal } from "./Modal";
import { updateData } from "./Api";

export function Creator() {
    const [formToggle, setFormToggle] = useState(false);
    const [newData, setNewData] = useState<DataEntry[] | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorModalText, setErrorModalText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    async function save() {
        setIsLoading(true);
        if (newData === null || newData.length === 0) {
            setErrorModalText("Data cannot be empty");
            setIsErrorModalOpen(true);
            setIsLoading(false);
            return;
        }

        if (newData.some((entry) => entry.plan === "")) {
            setErrorModalText("Title cannot be empty");
            setIsErrorModalOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            await updateData(newData);
            setNewData(null);
            setFormToggle(false);
            setIsLoading(false);
            setIsSuccessModalOpen(true);
        } catch (error) {
            setErrorModalText("Failed to save data");
            setIsErrorModalOpen(true);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <button className="w-20 px-4" onClick={() => setFormToggle(true)}>
                Add
            </button>
            <hr className="mt-3 h-1 bg-red-900 text-red-900 mb-5" />
            {formToggle && (
                <AddingForm onDataChange={(data) => setNewData(data)} />
            )}
            <button className="w-20 px-4" disabled={isLoading} onClick={save}>
                {isLoading ? "Saving..." : "Save"}
            </button>
            <button className="w-20 px-4" onClick={() => setFormToggle(false)}>
                Cancel
            </button>
            <Modal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="Error"
                message={errorModalText}
            />
            <Modal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Success"
                message="Data saved successfully"
            />
        </div>
    );
}
