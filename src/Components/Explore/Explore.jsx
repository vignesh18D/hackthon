import React, { useState, useContext, useRef, useEffect } from 'react';
import './Explore.css';
import { IoSearch } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { ChallengeContext } from '../Provider';

const Explore = () => {
    const [showFilters, setShowFilters] = useState(false);
    const { setSearchTerm, filters, setFilters } = useContext(ChallengeContext);
    const filterRef = useRef(null); 

    const toggleFilters = () => {
        setShowFilters(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

       
        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilters]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value 
        });
    };

    return (
        <div className='explore'>
            <h1>Explore Challenges</h1>
            <div className="explore-main">
                <div className="exp">
                    <IoSearch className='exp-icon' />
                    <input
                        type='text'
                        placeholder='Search'
                        className='name-search'
                        onChange={handleSearch} 
                    />
                </div>
                <div className="but" onClick={toggleFilters}>
                    <button className='butt'>Filter</button>
                    {showFilters ? <FaChevronUp className='down' /> : <FaChevronDown className='down' />}
                </div>
            </div>
            {showFilters && (
                <div className="filter-dropdown" ref={filterRef}> 
                    <div className="filter-section">
                        <h3>Status</h3>
                        <div>
                            <input type='radio' name='status' value='' onChange={handleFilterChange} checked={filters.status === ''}/> All
                        </div>
                        <div>
                            <input type='radio' name='status' value='Active' onChange={handleFilterChange} checked={filters.status === 'Active'}/> Active
                        </div>
                        <div>
                            <input type='radio' name='status' value='Upcoming' onChange={handleFilterChange} checked={filters.status === 'Upcoming'}/> Upcoming
                        </div>
                        <div>
                            <input type='radio' name='status' value='Past' onChange={handleFilterChange} checked={filters.status === 'Past'}/> Past
                        </div>
                    </div>
                    <div className="filter-section">
                        <h3>Level</h3>
                        <div>
                            <input type='radio' name='level' value='' onChange={handleFilterChange} checked={filters.level === ''}/> All
                        </div>
                        <div>
                            <input type='radio' name='level' value='Easy' onChange={handleFilterChange} checked={filters.level === 'Easy'}/> Easy
                        </div>
                        <div>
                            <input type='radio' name='level' value='Medium' onChange={handleFilterChange} checked={filters.level === 'Medium'}/> Medium
                        </div>
                        <div>
                            <input type='radio' name='level' value='Hard' onChange={handleFilterChange} checked={filters.level === 'Hard'}/> Hard
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Explore;
