import { generatePoseId } from '../utilities';
import './AddPoseForm.css';
import React, { useState } from 'react';

export default function AddPoseForm(props) {

    const [text, setText] = useState('');

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text) {
            const pose = {
                id: generatePoseId(),
                text: text
            }
            props.addPose(pose);
            setText('');
        }
    }

    return (
        <form
            className="AddThoughtForm"
            onSubmit={handleSubmit}
            >
                <input
                    value={text}
                    onChange={handleInputChange}
                    type="text"
                    aria-label="Search Asanas"
                    placeholder="Search Asanas"
                />
        </form>
    );
}