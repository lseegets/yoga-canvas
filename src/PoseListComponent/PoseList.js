import React, { useState, useEffect, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import ContentEditable from 'react-contenteditable';
import { Reorder } from 'framer-motion';
import Pose from '../PoseComponent/Pose';
import visibleImg from '../visible.svg';
import invisibleImg from '../invisible.svg';
import './PoseList.css';

// Represents a list that displays yoga poses

export default function PoseList({index, id, list, setActiveList, removePose, updateList, removeList, activeListIndex, showPoseNames}) {

  const [poses, setPoses] = useState([]);
  const [listName, setListName] = useState(list.name);
  const [hideName, setHideName] = useState(true);

  const removeBtnRef = useRef(null);
  const hideBtnRef = useRef(null);
  const listNameRef = useRef(null);

  useEffect(() => {
    setPoses(list.poses || []);
    setListName(list.name); 
  }, [list]);

  const handleReorder = (newOrder) => {
    setPoses(newOrder);
    updateList({ ...list, poses: newOrder }, id);
  };

  const handleRemove = () => {
    removeList(index);
  };

  const handleListNameChange = (e) => {
    const newName = (sanitizeHtml(e.currentTarget.innerHTML));
    setListName(newName);
    updateList({...list, name: newName}, id);
  };

  const handleHover = (hovering) => {
    const visibility = hovering ? 'visible' : 'hidden';
    if (removeBtnRef.current) removeBtnRef.current.style.visibility = visibility;
    if (hideBtnRef.current) hideBtnRef.current.style.visibility = visibility;
  };

  // Sets the active list upon clicking it

  const handleContainerClick = () => {
    setActiveList(index);
  };

  const toggleHideName = () => {
    const visibility = !hideName ? 'visible' : 'hidden';
    if (listNameRef.current) listNameRef.current.style.visibility = visibility;
    setHideName((prev) => !prev);
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`container${activeListIndex === index ? '-active' : ''}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <header className="list-header">
        <div
          ref={hideBtnRef}
          id={`hide-btn-${id}`}
          className="hide-btn-container"
          onClick={toggleHideName}
        >
          <img
            className="hide-btn"
            src={hideName ? visibleImg : invisibleImg}
            alt="Toggle list name visibility"
          ></img>
        </div>
        <ContentEditable
          className="list-name"
          id={`list-name-${index}`}
          html={listName}
          onChange={handleListNameChange}
          spellCheck="false"
          innerRef={listNameRef}
        />
      </header>
      <Reorder.Group
        axis="x"
        values={poses}
        onReorder={handleReorder}
      >
        {Array.isArray(poses) && poses.map((pose) => (
          <Pose
            className="pose"
            key={pose.id}
            pose={pose}
            removePose={removePose}
            showPoseNames={showPoseNames}
          />
        ))}
        <div
          className="remove-ul-btn"
          onClick={handleRemove}
          id={`remove-ul-button-${id}`}
          ref={removeBtnRef}
        >
          &times;
        </div>
      </Reorder.Group>
    </div>
  );
}