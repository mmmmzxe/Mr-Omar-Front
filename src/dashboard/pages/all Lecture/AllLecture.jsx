import React, { useState, useEffect } from 'react';
import styles from '../quiz/quiz.module.css';
import style from './vedio.module.css';
import styless from '../../dashboard.module.css';
import Loader from '../../../pages/upload/Loader';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';

const AllLecture = () => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        fetch('https://omarroshdy.com/api/v1/admlessons', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                setLectures(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className={styless.header_Dashboard}><TopBar /></div>
            <div className='flex'>
                <SideBar />
                <div className={`${styles.quiz} overflow-hidden w-full factoryActioncontent`}>
                    <h1 className={`${styles.dashboard_Title} text-2xl font-semibold m-[20px_20px_40px] text-[#f26a40] relative`}>
                        جميع المحاضرات
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-6">
                        {loading ? (
                            <Loader />
                        ) : (
                            lectures.map((lecture) => (
                                <div key={lecture.id} className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-numberNotfound duration-200 cursor-pointer">
                                    <div className="w-full h-60 relative p-2 group">
                                        <span className="bg-[#AABED11A] text-numberNotfound absolute left-0 right-0 w-16 text-base text-center py-1 rounded-md font-semibold inline-block z-10">
                                            Year : {lecture.study_year}
                                        </span>
                                        {lecture.embeded ? (
                                            <div className={style.all_vedio}
                                                height="200"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture"
                                                allowFullScreen
                                                dangerouslySetInnerHTML={{ __html: lecture.embeded }} />
                                        ) : (
                                            <div>لا يوجد فيديو لعرضه</div>
                                        )}
                                    </div>
                                    <div className="px-2 pb-2 mt-8">
                                        <h2 className="text-lg font-bold line-clamp-2 text-black dark:text-white">
                                            {lecture.title}
                                        </h2>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllLecture;
