import React, { useRef, useLayoutEffect } from 'react';

import wapy from '../src'

export default {
  title: 'Text',
  component: <div />,
};

export const Text = () => {
  const divRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    const dom = divRef.current;
    const keyframes = {
      animate: {
        x: 100
      }
    }
    const { animation, element } = wapy(dom, keyframes);

    setTimeout(() => animation.play(), 1000);
  }, []);

  return <div ref={divRef} className="testing">Hello World</div>;
};
