import './App.css';
import AddPoseForm from '../AddPoseFormComponent/AddPoseForm';
import PoseList from '../PoseListComponent/PoseList';
import { generateListId } from '../utilities';
import { useState, useRef } from 'react';

export default function App() {
  const [showPoseNames, setShowPoseNames] = useState(true);
  const [lists, setLists] = useState([]);
  const [activeListIndex, setActiveListIndex] = useState(0);
  const pdfRef = useRef();

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

  const updateList = (updatedList, updatedListId) => {
    const updatedLists = lists.map((list) =>
      list.id === updatedListId ? updatedList : list
      //index === updatedListIndex ? updatedList : list
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
      updatedLists.splice(index, 1); // Remove list at index
      return updatedLists;
    });
  };

  const togglePoseNameVisibility = () => {
    setShowPoseNames(!showPoseNames);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Asanas to add them to your lesson</h1>
      </header>

      <main>
        <div className="input">
          <button onClick={addList}>New List</button>
          <AddPoseForm addPose={addPose} addList={addList} />
          <button
            className={`toggle-btn ${showPoseNames ? 'toggled' : ''}`}
            onClick={togglePoseNameVisibility}
          >
            <div className="circle"></div>
          </button>
        </div>

        <div className="lists-container" ref={pdfRef}>
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

/*

<h3
              id={generateListId()}
              key={index}
              className={`container${activeListIndex === index ? '-active' : ''}`}
              onClick={() => setActiveList(index)}
            >
              List {index + 1}
              <PoseList
                key={`pose-list-${index}`}
                id={`pose-list-${index}`}
                index={index}
                list={list}
                setActiveList={setActiveList}
                removePose={removePose}
                updateListOrder={updateListOrder}
                removeList={removeList}
              />
            </h3>
        
        
        
<Reorder.Group className="lists-container" axis="y" values={lists} onReorder={setLists}>
          {lists && lists.map((list, index) => (
              <PoseList
                key={`pose-list-${index}`}
                id={generateListId()}
                index={index}
                list={list}
                setActiveList={setActiveList}
                removePose={removePose}
                updateListOrder={updateListOrder}
                removeList={removeList}
                activeListIndex={activeListIndex}
                showPoseNames={showPoseNames}
              />
          ))}
        </Reorder.Group> */