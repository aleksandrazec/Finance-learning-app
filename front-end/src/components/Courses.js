import React from "react";

function Courses() {

    const items = ["XD BRO", "XD BRO", "XD BRO"]; 

    return (
        <div id="container">
            {items.map((text, index) => (
                <div key={index}>{text}</div>
            ))}
        </div>
    );
}

export default Courses;
