import { generatePoseId } from '../utilities';
import './AddPoseForm.css';
import React, { useState } from 'react';

export default function AddPoseForm(props) {

    const [poseName, setPoseName] = useState('');

    const handleInputChange = (e) => {
        setPoseName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (poseName) {
            const pose = {
                id: generatePoseId(),
                poseName: poseName
            }
            props.addPose(pose);
            setPoseName('');
        }
    }

    return (
        <form
            className="AddThoughtForm"
            onSubmit={handleSubmit}
            >
                <input
                    value={poseName}
                    onChange={handleInputChange}
                    type="text"
                    aria-label="Search Asanas"
                    placeholder="Search Asanas"
                />
        </form>
    );
}