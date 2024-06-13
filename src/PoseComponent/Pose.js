import './Pose.css';
import React, { useState } from 'react';
import sampleImg from '../samplePose.svg'
import { Reorder, useDragControls } from "framer-motion"

export default function Pose({ pose, removePose }) {

    const [isHovering, setIsHovering] = useState(false);
    const controls = useDragControls()

    const handleRemove = () => {
        removePose(pose.id);
    }

    const handleHover = () => {
        if (!isHovering) {
            setIsHovering(true);
            document.getElementById(`remove-btn-${pose.id}`).style.visibility = 'visible';
        } else {
            setIsHovering(false);
            document.getElementById(`remove-btn-${pose.id}`).style.visibility = 'hidden';
        }
    }

    return (
        <Reorder.Item value={pose} dragListener={false} dragControls={controls}
            className="pose"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onPointerDown={(e) => controls.start(e)}
            >
            <img src={sampleImg} alt='Sample pose'/>
            <div className="text">{pose.text}</div>
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

/**
 * <Reorder.Item value={pose} dragListener={false} dragControls={controls}>
 * </Reorder.Item>
 */