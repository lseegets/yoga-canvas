import React, { useState, useEffect } from 'react';
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import { Reorder } from "framer-motion";
import Pose from '../PoseComponent/Pose';
import './PoseList.css';

export default function PoseList({ index, list, setActiveList, removePose, updateListOrder, removeList, activeListIndex, showPoseNames }) {

    const [poses, setPoses] = useState([]);
    const [listName, setListName] = useState('New List');
    const [hideName, setHideName] = useState(true);


    useEffect(() => {
      setPoses(list);
    }, [list]);

    const handleReorder = (newOrder) => {
      setPoses(newOrder);
      updateListOrder(newOrder, index);
    };

    const handleRemove = () => {
      removeList(index);
    }

    const onListNameChange = (e) => {
      setListName(sanitizeHtml(e.currentTarget.innerHTML));
    }

    const handleHover = (e) => {
      const visibility = e.type === 'mouseenter' ? 'visible' : 'hidden';
      document.getElementById(`remove-ul-button-${index}`).style.visibility = visibility;
      document.getElementById(`hide-btn-${index}`).style.visibility = visibility;
    };

    const handleContainerClick = () => {
      setActiveList(index);
    }

    const toggleHideName = () => {
      const visibility = !hideName ? 'visible' : 'hidden';
      let listName = document.getElementById(`list-name-${index}`);
      listName.style.visibility = visibility;
      setHideName((prev) => !prev);
    }

    return (
      <div
        onClick={handleContainerClick}
        className={`container${activeListIndex === index ? '-active' : ''}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <header>
          <div
            id={`hide-btn-${index}`}
            className="hide-btn"
            onClick={toggleHideName}
          >
            {hideName ? "(o)" : "(-)"}
          </div>
          <ContentEditable
            className="list-name"
            id={`list-name-${index}`}
            html={listName}
            onChange={onListNameChange}
            spellCheck="false"
          />
        </header>
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