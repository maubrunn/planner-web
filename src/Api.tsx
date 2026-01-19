import { DataEntry } from "./Datepicker";

const baseUrl = "http://localhost:5050";
const apiKey = "";

async function loadData(): Promise<DataEntry[]> {
    const url = `${baseUrl}/download-db`;

    try {
        const response = await fetch(url, {
            headers: {
                "X-API-KEY": `${apiKey}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        const result = await response.json();
        return result as DataEntry[];
    } catch (error) {
        console.error("Error loading data:", error);
        return Promise.reject(
            error instanceof Error ? error.message : String(error),
        );
    }
}

async function updateData(newData: DataEntry[]): Promise<void> {
    const url = `${baseUrl}/add`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": `${apiKey}`,
        },
        body: JSON.stringify(newData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export { loadData, updateData };
