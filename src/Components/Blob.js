import React from "react";

// Blob element - styling purposes
function Blob(props) {
    const width = props.isSplashScreen ? "500" : "400";
    const height = props.isSplashScreen ? "500" : "400";

    return (
        <div className="blob">
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 600 600">
                <path
                    d="M480.8 168.7C524.5 210.6 543.4 285.2 528.9 353.7 514.5 422.2 466.7 484.5 409.7 502.2 352.6 519.8 286.4 492.8 237.5 458.3 188.6 423.8 157 381.8 142.2 331.7 127.4 281.7 129.2 223.5 158.3 184.9 187.4 146.2 243.7 127.1 306.1 122.2 368.5 117.3 437.1 126.7 480.8 168.7Z"
                    fill={props.color} />
            </svg>
        </div>
    )
}

export default Blob;