import React, { useState, useEffect } from "react";
import {
    DatePicker,
    formatDate,
    DataEntry,
    formatDatePseudoISO,
} from "./Datepicker";
import { Modal } from "./Modal";

interface AddingFormProps {
    onDataChange: (data: DataEntry[]) => void;
}

export default function AddingForm({ onDataChange }: AddingFormProps) {
    const [startDate, setStartDate] = useState(new Date());
    const [repeatTrigger, setRepeatTrigger] = useState(false);
    const [repeatInterval, setRepeatInterval] = useState("day");
    const [repeatCount, setRepeatCount] = useState(10);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [dates, setDates] = useState<Date[]>([new Date()]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const payload: DataEntry[] = dates.map((date) => ({
            id: null,
            date: formatDatePseudoISO(date),
            plan: title,
        }));

        onDataChange(payload);
    }, [dates, title]);

    useEffect(() => {
        calcDates();
    }, [startDate, repeatInterval, repeatCount, repeatTrigger]);

    function calcDates() {
        const newDates = [];
        let currentDate = new Date(startDate);

        while (newDates.length < repeatCount) {
            newDates.push(new Date(currentDate));
            if (!repeatTrigger) break;
            switch (repeatInterval) {
                case "day":
                    currentDate = new Date(
                        currentDate.setDate(currentDate.getDate() + 1),
                    );
                    break;
                case "week":
                    currentDate = new Date(
                        currentDate.setDate(currentDate.getDate() + 7),
                    );
                    break;
                case "month":
                    currentDate = new Date(
                        currentDate.setMonth(currentDate.getMonth() + 1),
                    );
                    break;
                case "year":
                    currentDate = new Date(
                        currentDate.setFullYear(currentDate.getFullYear() + 1),
                    );
                    break;
            }
        }

        setDates(newDates);
    }

    function handleRepeatCountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        if (value >= 1 && value <= 20) {
            setRepeatCount(value);
        } else {
            setIsErrorModalOpen(true);
        }
    }

    return (
        <div className="flex flex-row justify-around mb-5 items-start">
            <div className="flex flex-col items-center w-xl gap-2">
                <DatePicker
                    label="Date"
                    date={startDate}
                    setDate={setStartDate}
                />
                <div className="flex flex-row">
                    <div className="text-lg mr-2">Title</div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
                <button
                    className="px-2 py-2"
                    onClick={() => setRepeatTrigger(!repeatTrigger)}
                >
                    {repeatTrigger ? "Stop Repeat" : "Repeat"}
                </button>
                {repeatTrigger && (
                    <div>
                        <div className="flex flex-row items-center mt-2">
                            <h3 className="mr-2">Every</h3>
                            <select
                                value={repeatInterval}
                                onChange={(e) =>
                                    setRepeatInterval(e.target.value)
                                }
                            >
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <h3 className="mr-2">Count</h3>
                            <input
                                className="w-15"
                                type="number"
                                min={1}
                                max={20}
                                value={repeatCount}
                                onChange={(e) => handleRepeatCountChange(e)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center mt-2">
                <div className="mr-2 text-lg">Dates</div>
                <ul>
                    {dates.map((date) => (
                        <li key={date.toISOString()}>{formatDate(date)}</li>
                    ))}
                </ul>
            </div>
            <Modal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="Error"
                message="Count must be between 1 and 20."
            />
        </div>
    );
}
