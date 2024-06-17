import './Pose.css';
import React, { useState } from 'react';
import sampleImg from '../samplePose.svg'
import { Reorder, useDragControls } from "framer-motion"

export default function Pose({ pose, removePose, showPoseNames }) {

    const [isHovering, setIsHovering] = useState(false);
    const controls = useDragControls()

    const handleRemove = () => {
        removePose(pose.id);
    }

    const handleHover = () => {
        setIsHovering((prev) => !prev);
        const visibility = !isHovering ? 'visible' : 'hidden';
        document.getElementById(`remove-btn-${pose.id}`).style.visibility = visibility;
      };

    return (
        <Reorder.Item value={pose} dragListener={false} dragControls={controls}
            className="pose"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onPointerDown={(e) => controls.start(e)}
            >
            <img src={sampleImg} alt='Sample pose'/>
            {showPoseNames && <div className="pose-name">{pose.poseName}</div>}
            <div
                className='remove-btn'
                aria-label="Remove pose button"
                id={`remove-btn-${pose.id}`}
                onClick={handleRemove}
            >
                &times;
            </div>
        </Reorder.Item>
      );
}