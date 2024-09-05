import React, { useContext } from 'react';
import { ChallengeContext } from '../Provider';
import './display.css';
import { useNavigate } from 'react-router-dom';

const Display = () => {
    const { challenges, searchTerm, filters } = useContext(ChallengeContext);
    const navigate = useNavigate();

    const handleClick = (challenge) => {
        navigate(`/challenge/${challenge.id}`, { state: { challenge } });
    };

    const startOfDay = (date) => new Date(date.setHours(0, 0, 0, 0));

    const getText = (challenge) => {
        const now = startOfDay(new Date());
        const startDate = startOfDay(new Date(challenge.startDate));
        const endDate = startOfDay(new Date(challenge.endDate));

        if (now < startDate) return 'Upcoming';
        if (now >= startDate && now <= endDate) return 'Active';
        return 'Past';
    };

    const getClass = (challenge) => {
        const status = getText(challenge);
        if (status === 'Upcoming') return 'upcoming';
        if (status === 'Active') return 'active';
        return 'past';
    };

    // Time calculation functions
    const getTiming = (challenge) => {
        const now = new Date();
        const startDate = new Date(challenge.startDate);
        const endDate = new Date(challenge.endDate);

        if (now < startDate) {
            return {
                statusText: "Starts in",
                timeText: formatTimeDifference(now, startDate),
                unitsText: "Days Hours Minutes"
            };
        } else if (now >= startDate && now <= endDate) {
            return {
                statusText: "Ends in",
                timeText: formatTimeDifference(now, endDate),
                unitsText: "Days Hours Minutes"
            };
        } else {
            return {
                statusText: `Ended on ${endDate.toLocaleString()}`,
                timeText: "",
                unitsText: ""
            };
        }
    };

    const formatTimeDifference = (date1, date2) => {
        let difference = date2 - date1;

        if (difference < 0) {
            return "0 : 0 : 0"; // Avoid negative time differences
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        return `${days} : ${hours} : ${minutes}`;
    };

    // Filter challenges based on search term and filters
    const filteredChallenges = challenges.filter((challenge) => {
        const matchesSearch = challenge.createName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filters.status === '' || getText(challenge) === filters.status;
        const matchesLevel = filters.level === '' || challenge.levelType === filters.level;

        return matchesSearch && matchesStatus && matchesLevel;
    });

    return (
        <div className='display'>
            <h2 className='display-title'>Created Challenges</h2>
            <div className="grid">
                {filteredChallenges.map((challenge, index) => {
                    const timing = getTiming(challenge); // Get timing info
                    return (
                        <div key={index} className='card'>
                            {challenge.image && <img src={challenge.image} alt="Challenge" className="image" />}
                            <div className="content">
                                <span className={`status-tag ${getClass(challenge)}`}>
                                    {getText(challenge)}
                                </span>
                                <h3>{challenge.createName}</h3>
                                <div className="timing">
                                    <p className='dis'>{timing.statusText}</p>
                                    {timing.timeText && <p className='time'>{timing.timeText}</p>}
                                    {timing.unitsText && <p className='text'>{timing.unitsText}</p>}
                                </div>
                                <button className='participate' onClick={() => handleClick(challenge, index)}>
                                    Participate Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Display;
