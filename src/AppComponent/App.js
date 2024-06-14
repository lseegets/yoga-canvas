import './App.css';
import AddPoseForm from '../AddPoseFormComponent/AddPoseForm';
import PoseList from '../PoseListComponent/PoseList';
import { generateListId } from '../utilities';
import { useState } from 'react';

export default function App() {

  const [toggled, setToggled] = useState(false);
  const [lists, setLists] = useState([[]]);
  const [activeListIndex, setActiveListIndex] = useState(0);

  const addPose = (pose) => {
    setLists((prevLists) => {
      const newLists = prevLists.map((list, index) => {
        if (index === activeListIndex) {
          return [...list, pose];
        }
        return list;
      });
      return newLists;
    });
  }

  const addList = () => {
    setLists((prevLists) => {
      const newLists = [...prevLists, []];
      return newLists;
    });
    setActiveListIndex(lists.length);
  }

  const setActiveList = (index) => {
    setActiveListIndex(index);
  }

  const updateListOrder = (updatedList, updatedListIndex) => {
    const updatedLists = lists.map((list, index) =>
      index === updatedListIndex ? updatedList : list
    	);
    setLists(updatedLists);
  }

  const removePose = (id) => {
    // Update lists based on current orderedPoses state
    const updatedLists = lists.map((list) =>
      list.filter((pose) => pose.id !== id)
    );
    setLists(updatedLists);
  };

  const removeList = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(index, 1); // Remove list at index
      return updatedLists;
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Asanas to add them to your lesson</h1>
      </header>
      <main>
        <div className="input">
        <button onClick={addList}>Add New List</button>
          <AddPoseForm
            addPose={addPose}
          />

          <button
            className={`toggle-btn ${toggled ? 'toggled' : ''}`}
            onClick={() => setToggled(!toggled)}
          >
            <div className='circle'>

            </div>
          </button>

        </div>

        <div>
          {lists && lists.map((list, index) => (
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
          ))}
        </div>        
      </main>
    </div>
  );
}

/*

const removePose = (id) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.filter((pose) => pose.id !== id)
      )
    );
  };


<ul className="poses">
          {poses.map((pose) => (
            <Pose
              key={pose.id}
              pose={pose}
              removePose={removePose}
            />
          ))}
        </ul>
        
        
        
<Reorder.Group axis="x" values={poses} onReorder={setPoses}>
          {poses.map((pose) => (
                <Pose
                  key={pose.id}
                  pose={pose}
                  removePose={removePose}
                />
            ))}
        </Reorder.Group>*/