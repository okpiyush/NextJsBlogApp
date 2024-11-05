"use client";
import React, { useEffect, useRef } from 'react';
import styles from './ScrollingTextComponent.module.css';

const ScrollingTextComponent = () => {
  const animateTextRefs = useRef([]);

  useEffect(() => {
    animateTextRefs.current.forEach((el) => {
      el.style.width = `${el.children[0].clientWidth}px`;
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bgTextContainer}>
        <div
          className={styles.animateText}
          ref={(el) => (animateTextRefs.current[0] = el)}
        >
          <span>Latest Blogs&nbsp;</span>
          <span>Best Information&nbsp;</span>
        </div>
        <div
          className={`${styles.animateText} ${styles.left}`}
          ref={(el) => (animateTextRefs.current[1] = el)}
        >
          <span>Passionate Writers&nbsp;</span>
          <span>Mindful Readers&nbsp;</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.col}>
            <h1 className={styles.heading}>Blogger</h1>
            <p className={styles.paragraph}>
                Your Go-To Blogging Platform <br />
                Capture your audience with the best content<br/>
                Make yourself Heard
            </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollingTextComponent;
