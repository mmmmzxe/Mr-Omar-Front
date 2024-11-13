import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../lesson1/lesson.module.css';

const VideoPage = () => {
  const location = useLocation();
  const { videoUrl, embeded } = location.state || {};

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoUrl && !embeded) {
      setError('لا يوجد فيديو لعرضه.');
    }
  }, [videoUrl, embeded]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="md:py-12 py-2">
      <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-8 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
        . شاهد الان
      </h2>
      <div className='container1'>

        {embeded ? (
          <div className="pointer-events-none" dangerouslySetInnerHTML={{ __html: embeded }} />
        ) : videoUrl ? (
          <div>
            <iframe
              className={`${styles.howToUse} md:w-[600px] md:h-[350px]`}
              src={`${videoUrl}?autoplay=1`}
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="lesson-video"
            />
          </div>
        ) : (
          <div>لا يوجد فيديو لعرضه.</div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
