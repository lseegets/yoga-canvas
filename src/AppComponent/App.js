import './App.css';
import AddPoseForm from '../AddPoseFormComponent/AddPoseForm';
import PoseList from '../PoseListComponent/PoseList';
import { generateListId } from '../utilities';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {

  const [showPoseNames, setShowPoseNames] = useState(true);
  const [lists, setLists] = useState([[]]);
  const [activeListIndex, setActiveListIndex] = useState(0);
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('lesson.pdf');
    })
  }

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

  const togglePoseNameVisibility = () => {
    setShowPoseNames(!showPoseNames);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Asanas to add them to your lesson</h1>
        <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
      </header>

      <main>
        <div className="input">
        <button onClick={addList}>Add List</button>
        <AddPoseForm
          addPose={addPose}
          addList={addList}
        />
        <button
          className={`toggle-btn ${showPoseNames ? 'toggled' : ''}`}
          onClick={togglePoseNameVisibility}
        >
          <div className='circle'></div>
        </button>

        </div>

        <div
          className="lists-container"
          ref={pdfRef}
        >
          {lists && lists.map((list, index) => (
              <PoseList
                key={`pose-list-${index}`}
                //id={generateListId()}
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