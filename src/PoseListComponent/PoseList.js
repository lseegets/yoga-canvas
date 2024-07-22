import React, { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import ContentEditable from 'react-contenteditable';
import { Reorder } from 'framer-motion';
import Pose from '../PoseComponent/Pose';
import visibleImg from '../visible.svg';
import invisibleImg from '../invisible.svg';
import './PoseList.css';

export default function PoseList({index, id, list, setActiveList, removePose, updateList, removeList, activeListIndex, showPoseNames}) {

  const [poses, setPoses] = useState([]);
  const [listName, setListName] = useState(list.name);
  const [hideName, setHideName] = useState(true);

  useEffect(() => {
    setPoses(list.poses || []); // Ensure poses is an array
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
    document.getElementById(`remove-ul-button-${id}`).style.visibility = visibility;
    document.getElementById(`hide-btn-${id}`).style.visibility = visibility;
  };

  const handleContainerClick = () => {
    setActiveList(index);
  };

  const toggleHideName = () => {
    const visibility = !hideName ? 'visible' : 'hidden';
    document.getElementById(`list-name-${index}`).style.visibility = visibility;
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
        >
          &times;
        </div>
      </Reorder.Group>
    </div>
  );
}

/**
 * <Reorder.Item
        onClick={handleContainerClick}
        className={`container${activeListIndex === index ? '-active' : ''}`}
        as="h3"
        value={list}
        dragListener={false}
        dragControls={controls}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <ContentEditable
          className="list-name"
          html={listName}
          onChange={onListNameChange}
        />
        <Reorder.Group
          axis="x" values={poses}
          onReorder={handleReorder}
        >
          {Array.isArray(list) && poses.map((pose) => (
            <Pose
              className="pose"
              key={pose.id}
              pose={pose}
              removePose={removePose}
              showPoseNames={showPoseNames}
            />
          ))}
          <div
            className='remove-ul-btn'
            onClick={handleRemove}
            id={`remove-ul-button-${index}`}
          >
            &times;
          </div>
        </Reorder.Group>
        <div className='move-list-btn' onPointerDown={(e) => controls.start(e)}>|||</div>

      </Reorder.Item>
 */