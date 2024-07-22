import './Pose.css';
import React, { useState, useRef } from 'react';
import { Reorder, useDragControls } from "framer-motion";

export default function Pose({ pose, removePose, showPoseNames }) {
    const [isHovering, setIsHovering] = useState(false);
    const controls = useDragControls();
    const removeBtnRef = useRef(null);

    const handleRemove = () => {
        removePose(pose.id);
    };

    const handleHover = () => {
        setIsHovering((prev) => !prev);
    };

    return (
        <Reorder.Item
            key={pose.id}
            value={pose}
            dragListener={false}
            dragControls={controls}
            className="pose"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onPointerDown={(e) => controls.start(e)}
        >
            <img src={pose.image} alt={pose.poseName} />
            {showPoseNames && <div className="pose-name">{pose.poseName}</div>}
            <div
                className='remove-btn'
                aria-label="Remove pose button"
                style={{ visibility: isHovering ? 'visible' : 'hidden' }}
                ref={removeBtnRef}
                onClick={handleRemove}
            >
                &times;
            </div>
        </Reorder.Item>
    );
}