import './App.css';
import AddPoseForm from '../AddPoseFormComponent/AddPoseForm';
import PoseList from '../PoseListComponent/PoseList';
import { generateListId } from '../utilities';
import { useState } from 'react';

export default function App() {
  const [showPoseNames, setShowPoseNames] = useState(true);
  const [lists, setLists] = useState([]);
  const [activeListIndex, setActiveListIndex] = useState(0);

  // Adds a new pose to the active list

  const addPose = (pose) => {
    setLists((prevLists) => {
      const newLists = prevLists.map((list, index) => {
        if (index === activeListIndex) {
          return {
            ...list,
            poses: [...list.poses, pose],
          };
        }
        return list;
      });
      return newLists;
    });
  };

  const addList = () => {
    setLists((prevLists) => [
      ...prevLists,
      {
        id: generateListId(),
        name: 'New List',
        poses: []
      },
    ]);
    setActiveListIndex(lists.length);
  };

  const setActiveList = (index) => {
    setActiveListIndex(index);
  };

  // Updates a list after reordering its pose items

  const updateList = (updatedList, updatedListId) => {
    const updatedLists = lists.map((list) =>
      list.id === updatedListId ? updatedList : list
    );
    setLists(updatedLists);
  };

  const removePose = (id) => {
    const updatedLists = lists.map((list) => ({
      ...list,
      poses: list.poses.filter((pose) => pose.id !== id),
    }));
    setLists(updatedLists);
  };

  const removeList = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(index, 1);
      return updatedLists;
    });
  };

  const togglePoseNameVisibility = () => {
    setShowPoseNames(!showPoseNames);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Yoga Canvas</h1>
        <h2>Search Asanas to add them to your lesson</h2>
      </header>

      <main>
        <div className="controls">
          <div>
            <button
              className="add-list-btn"
              onClick={addList}
            >
              New List
            </button>
          </div>
          <div>
            <AddPoseForm
              addPose={addPose}
              addList={addList}
            />
          </div>
          <div
            className="toggle-btn-container"
          >
            Toggle Asana names
            <button
              className={`toggle-btn ${showPoseNames ? 'toggled' : ''}`}
              onClick={togglePoseNameVisibility}
            >
              <div className="circle"></div>
            </button>
          </div>
        </div>

        <div className="lists-container">
          {lists &&
            lists.map((list, index) => (
              <PoseList
                key={list.id}
                index={index}
                id={list.id}
                list={list}
                setActiveList={setActiveList}
                removePose={removePose}
                updateList={updateList}
                removeList={removeList}
                activeListIndex={activeListIndex}
                showPoseNames={showPoseNames}
              />
            ))}
        </div>
      </main>
    </div>
  );
}