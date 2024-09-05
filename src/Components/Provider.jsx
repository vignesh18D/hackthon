import React, { createContext, useState, useEffect } from 'react';

export const ChallengeContext = createContext();

export const Provider = ({ children }) => {
    const [challenges, setChallenges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ status: '', level: '' });

    useEffect(() => {
        const storedChallenges = localStorage.getItem('challenges');
        if (storedChallenges) {
            setChallenges(JSON.parse(storedChallenges));
        }
    }, []);

    const addChallenge = (challenge) => {
        const updatedChallenges = [...challenges, challenge];
        setChallenges(updatedChallenges);
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    };

    const updateChallenge = (id, updatedChallenge) => {
        const updatedChallenges = challenges.map((challenge) =>
            challenge.id === id ? updatedChallenge : challenge
        );
        setChallenges(updatedChallenges);
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    };

    const deleteChallenge = (id) => {
        const updatedChallenges = challenges.filter(challenge => challenge.id !== id);
        setChallenges(updatedChallenges);
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    };

    return (
        <ChallengeContext.Provider value={{ challenges, addChallenge, updateChallenge, deleteChallenge, searchTerm, setSearchTerm, filters, setFilters }}>
            {children}
        </ChallengeContext.Provider>
    );
};

export default Provider;
