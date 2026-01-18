import "./index.css";
import { useState } from "react";
import { Viewer } from "./Viewer";
import { Creator } from "./Creator";

import logo from "./calendar.svg";

export function App() {
    const [creatorToggled, setCreatorToggled] = useState(false);
    return (
        <div>
            <div className="flex m-1 px-4 items-center">
                <div className="flex-1">
                    <img
                        src={logo}
                        alt="Planner Logo"
                        className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
                    />
                </div>
                <h1 className="text-2xl font-bold leading-tight whitespace-nowrap">
                    {creatorToggled ? "Creator" : "Viewer"}
                </h1>
                <div className="flex-1 flex justify-end">
                    <div className="flex flex-row mr-2 items-center gap-3">
                        <h4>Viewer</h4>
                        <div
                            className={`bg-gray-200 rounded w-12 h-7 flex ${creatorToggled ? "justify-end" : "justify-start"}`}
                        >
                            <button
                                className={`py-3 px-4 ${creatorToggled ? "rounded-l-sm" : "rounded-r-sm"}`}
                                onClick={() =>
                                    setCreatorToggled(!creatorToggled)
                                }
                            ></button>
                        </div>
                        <h4>Creator</h4>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
                {creatorToggled ? <Creator /> : <Viewer />}
            </div>
        </div>
    );
}

export default App;
