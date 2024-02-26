import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProgressGraph({ progress= 0.5 }) {
  const radius = 80;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const newOffset = (1 - progress) * circumference;
    setOffset(newOffset);
  }, [progress, circumference]);

  return (
    <div style={styles.container}>
      <svg width={2 * (radius + strokeWidth)} height={2 * (radius + strokeWidth)} style={{ backgroundColor: 'transparent' }}>
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#EAEAEA"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#007AFF"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          animate={{ rotate: -90 }}
          fill="none"
        />
      </svg>
      <div style={styles.progressText}>{progress * 100}%</div>
    </div>
  );
}

const styles = {
  // container: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 20,
  // },
  progressText: {
    marginTop: -140,
    paddingRight: 120,
    textAlign: 'center',
    fontSize: 35,
    position: 'absolute',
  },
};
