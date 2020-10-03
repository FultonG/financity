
import React, { useEffect, useState } from 'react';
import ReactVivus from 'react-vivus';

const AnimatedIcon = ({ file, id, duration, hovered }) => {
  const [vivus, setVivus] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (hovered && vivus !== null && finished) {
      vivus.stop().reset().play(1);
      setFinished(false);
    }

  }, [hovered, finished]);

  return (
    <ReactVivus
      id={id}
      option={{
        file: file,
        animTimingFunction: 'EASE_OUT',
        type: 'oneByOne',
        duration: 300,
        onReady: function (v) {
          setVivus(v);
        }
      }}
      style={{ height: 20, width: 20 }}
      callback={(e) => {
        setFinished(true);
      }}
    />
  )
}

export default AnimatedIcon;