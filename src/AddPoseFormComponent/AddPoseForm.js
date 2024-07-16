import { generatePoseId } from '../utilities';
import './AddPoseForm.css';
import React, { useState } from 'react';
import poseData from '../yoga-poses-data/yogaPoses.json';

export default function AddPoseForm(props) {

    const [value, setValue] = useState('');

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    const addNewPose = (name) => {
        if (name) {
            const pose = {
                id: generatePoseId(),
                poseName: name,
                image: getImageByPoseName(name)
            }
            props.addPose(pose);
            setValue('');
        }
    }

    const handleSearch = (searchTerm) => {
        addNewPose(searchTerm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewPose(value);
    }

    const getImageByPoseName = (name) => {
        const pose = poseData.find(item => item.pose_name === name);
        if (pose) {
            return pose.image;
        }
        return null;
    };

    return (
        <form
            className="AddThoughtForm"
            onSubmit={handleSubmit}
            >
                <input
                    value={value}
                    onChange={handleInputChange}
                    type="text"
                    aria-label="Search Asanas"
                    placeholder="Search Asanas"
                />
                <div className="dropdown">
                    {poseData.filter(item => {
                        const searchTerm = value.toLowerCase();
                        const name = item.pose_name.toLowerCase();
                        return searchTerm && name.includes(searchTerm) && name !== searchTerm;
                    })
                    .map((item) => (
                        <div
                            className="dropdown-item"
                            onClick={() => handleSearch(item.pose_name)}
                        >
                            {item.pose_name}
                        </div>
                    ))}
                </div>
        </form>
    );
}