import React, { useState } from 'react';
import AnimationContext from './animationContext';

const AnimationState = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AnimationContext.Provider value={{ showLogin, setShowLogin }}>
      {props.children}
    </AnimationContext.Provider>
  );
};

export default AnimationState;
