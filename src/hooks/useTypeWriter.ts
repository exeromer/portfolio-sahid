import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) => {
  const [text, setText] = useState('');
  
  const textRef = useRef('');
  const isDeletingRef = useRef(false);
  const loopNumRef = useRef(0);

  useEffect(() => {
    let timer: number;

    const handleTyping = () => {
      const i = loopNumRef.current % words.length;
      const fullText = words[i];

      if (isDeletingRef.current) {
        textRef.current = fullText.substring(0, textRef.current.length - 1);
      } else {
        textRef.current = fullText.substring(0, textRef.current.length + 1);
      }

      setText(textRef.current);

      let delta = isDeletingRef.current ? deletingSpeed : typingSpeed;

      if (!isDeletingRef.current && textRef.current === fullText) {
        delta = pauseTime;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && textRef.current === '') {
        isDeletingRef.current = false;
        loopNumRef.current++;
        delta = 500;
      }

      timer = setTimeout(handleTyping, delta);
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [words, typingSpeed, deletingSpeed, pauseTime]);

  return { text };
};