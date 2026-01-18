import React from "react";
import { useRef } from "react";
import logo from "./calendar.svg";

type Props = {
    label: string;
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
};

interface DataEntry {
    id: number | null;
    date: string;
    plan: string;
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const yearWithoutCentury = String(year).slice(-2);
    const month = date.toLocaleString("default", { month: "short" });
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}. ${month} ${yearWithoutCentury}`;
};

const formatDatePseudoISO = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

function DatePicker({ label, date, setDate }: Props) {
    const input = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-row gap-1 items-center m-3">
            <p className="text-xl font-bold">{label}:</p>
            <p className="text-lg">{formatDate(date)}</p>
            <img
                src={logo}
                className="h-5 rounded"
                onClick={() => input.current?.showPicker()}
                alt="Calendar"
            />
            <input
                ref={input}
                className="absolute opacity-0 pointer-events-none"
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
            />
        </div>
    );
}

export { DatePicker, formatDate, DataEntry, formatDatePseudoISO };
