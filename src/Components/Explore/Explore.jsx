import React, { useState, useContext, useRef, useEffect } from 'react';
import './Explore.css';
import { IoSearch } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { ChallengeContext } from '../Provider';

const Explore = () => {
    const [showFilters, setShowFilters] = useState(false);
    const { setSearchTerm, filters, setFilters } = useContext(ChallengeContext);
    const filterRef = useRef(null); 

    // Toggle filter visibility
    const toggleFilters = () => {
        setShowFilters(prev => !prev);
    };

    // Handle outside click to close the filter box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        // Add the event listener when the filter box is open
        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener when the component unmounts or filter box is closed
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilters]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Update search term in context
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value // Update filters in context
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
                        onChange={handleSearch} // Update search term
                    />
                </div>
                <div className="but" onClick={toggleFilters}>
                    <button className='butt'>Filter</button>
                    {showFilters ? <FaChevronUp className='down' /> : <FaChevronDown className='down' />}
                </div>
            </div>
            {showFilters && (
                <div className="filter-dropdown" ref={filterRef}> {/* Apply ref here */}
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
