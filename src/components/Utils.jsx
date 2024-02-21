import React from 'react';

const Utils = {
  showResponseDialog: (message, title) => {
    window.alert(`${title}\n\n${message}`);
  },
};

export default Utils;
