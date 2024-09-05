import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Nav from '../Nav/Nav';
import level from "../../assets/assets/icons/carbon_skill-level-basic.svg";
import './Hack.css';
import { ChallengeContext } from '../Provider';
import { useContext, useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa";

const Hack = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { challenges, deleteChallenge } = useContext(ChallengeContext);
    const [challenge, setChallenge] = useState(null);

    useEffect(() => {
        const foundChallenge = challenges.find(ch => ch.id === id);
        if (foundChallenge) {
            setChallenge(foundChallenge);
        } else {
            // Handle case where challenge is not found
        }
    }, [id, challenges]);

    const handleEdit = () => {
        navigate('/create', { state: { challenge } }); // Navigate to create page with challenge data
    };

    const handleDelete = () => {
        deleteChallenge(id); // Use the ID for deletion
        navigate('/'); // Redirect to the Display page
    };

    const formatDateToIST = (dateString) => {
        const date = new Date(dateString);
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return date.toLocaleString('en-IN', options);
    };

    const getStatusMessage = (challenge) => {
        const now = new Date();
        const startDate = new Date(challenge.startDate);
        const endDate = new Date(challenge.endDate);

        if (now < startDate) {
            return `Starts on ${formatDateToIST(startDate)}`;
        } else if (now >= startDate && now <= endDate) {
            return `Ends on ${formatDateToIST(endDate)}`;
        } else {
            return `Ended on ${formatDateToIST(endDate)}`;
        }
    };

    if (!challenge) return <p>Loading...</p>; // Show loading state while fetching data

    return (
        <>
            <Nav />
            <div className="card-detail">
                <div className="card-box">
                    <p className='time-status'><FaRegClock />{getStatusMessage(challenge)}</p>
                    <h1>{challenge.createName}</h1>
                    <div className="para">
                        <p>{challenge.description}</p>
                    </div>
                    <div className="levell">
                        <img src={level} alt='level'/>
                        <h4>{challenge.levelType}</h4>
                    </div>
                </div>
                <div className="box-2">
                    <div className="little">
                        <div className="pa">
                            <p>Overview</p>
                            <div className="lll"></div>
                        </div>
                        <div className="btts">
                            <button className='edit' onClick={handleEdit}>Edit</button>
                            <button className='del' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="paragraph">
                    <p className='p-1'>Airline passenger satisfaction is a critical factor in determining the overall success of an airline. In today’s competitive market, customer feedback plays a vital role in shaping an airline’s reputation and loyalty. With multiple touchpoints during a journey, from booking to boarding and in-flight service, understanding what drives satisfaction can help airlines improve their operations. By analyzing data from passengers, airlines can identify patterns and trends that directly influence the passenger experience. This approach ensures targeted improvements, enhancing the quality of service and customer retention.</p>
                    <p>The challenge of predicting airline passenger satisfaction involves working with various data points, such as flight delays, seat comfort, and service quality. Each of these variables contributes differently to how passengers rate their overall experience. By applying data science techniques, it becomes possible to build models that can predict whether a passenger is likely to be satisfied or not. This predictive capability allows airlines to proactively address areas of concern, such as reducing delays or improving customer service, ultimately increasing satisfaction scores across the board.</p>
                </div>
            </div>
        </>
    );
}

export default Hack;
