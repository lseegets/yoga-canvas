import React, { useState, useEffect } from 'react';
import { Reorder } from "framer-motion"
import Pose from '../PoseComponent/Pose';

export default function PoseList({ index, list, removePose, updateListOrder }) {

    const [poses, setPoses] = useState([]);

      useEffect(() => {
        setPoses(list);
      }, [list]);

      const handleReorder = (newOrder) => {
        setPoses(newOrder);
        updateListOrder(newOrder, index);
      };

    return (
        <Reorder.Group axis="x" values={poses} onReorder={handleReorder}>
            {Array.isArray(list) && poses.map((pose) => (
                <Pose
                    key={pose.id}
                    pose={pose}
                    removePose={removePose}
              />
            ))}
        </Reorder.Group>
    );
}

/*
<Reorder.Group axis="x" values={poses} onReorder={setPoses}>
          {poses.map((pose) => (
                <Pose
                  key={pose.id}
                  pose={pose}
                  removePose={removePose}
                />
            ))}
        </Reorder.Group>

        const removePose = (id) => {
        setPoses((poses) => 
          poses.filter((pose) => pose.id !== id)
        );
      }

      {Array.isArray(list) && list.map((pose) => (
                <Pose
                    key={pose.id}
                    pose={pose}
                    removePose={removePose}
              />
            ))}
*/