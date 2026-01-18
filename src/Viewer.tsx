import React, { useEffect } from "react";
import { useState } from "react";
import { loadData } from "./Api";
import { DatePicker, formatDate, DataEntry } from "./Datepicker";
import { Modal } from "./Modal";

export function Viewer() {
    const today = new Date();
    const inTenDays = new Date();
    inTenDays.setDate(today.getDate() + 10);
    const [data, setData] = useState<DataEntry[] | undefined>(undefined);
    const [fromDate, setFromDate] = useState<Date>(today);
    const [toDate, setToDate] = useState<Date>(inTenDays);
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLoadClick() {
        setIsLoading(true);
        try {
            const data = await loadData();
            setData(data);
            console.log("Data loaded:", data);
        } catch (error) {
            setText(String(error));
            setModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <button
                className="w-20 px-4"
                onClick={handleLoadClick}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Load"}
            </button>
            <hr className="mt-3 h-1 bg-red-900 text-red-900 mb-5" />
            <div className="flex flex-col">
                <div className="flex flex-row justify-center gap-4">
                    <DatePicker
                        label="From"
                        date={fromDate}
                        setDate={setFromDate}
                    />
                    <DatePicker label="To" date={toDate} setDate={setToDate} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <p className="text-2xl font-bold">Date</p>
                    <p className="text-2xl font-bold">Plan</p>

                    {data &&
                        data
                            .filter((entry: DataEntry) => {
                                const entryDate = new Date(entry.date);
                                return (
                                    (!fromDate || entryDate >= fromDate) &&
                                    (!toDate || entryDate <= toDate)
                                );
                            })
                            .map((entry: DataEntry) => (
                                <React.Fragment key={entry.id}>
                                    <p>{formatDate(new Date(entry.date))}</p>
                                    <p>{entry.plan}</p>
                                </React.Fragment>
                            ))}
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Error"
                message={text}
            />
        </div>
    );
}
