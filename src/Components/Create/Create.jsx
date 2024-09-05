import React, { useState, useRef, useContext, useEffect } from 'react';
import Nav from '../Nav/Nav';
import "./Create.css";
import { ChallengeContext } from '../Provider';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import cloud from '../../assets/assets/icons/bxs_cloud-upload.svg'

const Create = () => {
  const [createName, setCreateName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [levelType, setLevelType] = useState("Easy");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false); 
  const fileInput = useRef(null);
  const { addChallenge, updateChallenge } = useContext(ChallengeContext);
  const location = useLocation();
  const challengeToEdit = location.state?.challenge;

  useEffect(() => {
    if (challengeToEdit) {
      setCreateName(challengeToEdit.createName);
      setStartDate(challengeToEdit.startDate);
      setEndDate(challengeToEdit.endDate);
      setDescription(challengeToEdit.description);
      setLevelType(challengeToEdit.levelType);
      setPreviewImage(challengeToEdit.image);
    }
  }, [challengeToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      setPreviewImage(newPreview);
      setIsEditingImage(false); 
    }
  };

  const submit = (e) => {
    e.preventDefault();
    
    const challengeData = {
      id: challengeToEdit ? challengeToEdit.id : uuidv4(),
      createName,
      startDate,
      endDate,
      description,
      levelType,
      image: previewImage 
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        challengeData.image = reader.result; 

        if (challengeToEdit) {
          updateChallenge(challengeData.id, challengeData);
        } else {
          addChallenge(challengeData);
        }
        resetForm();
      };
      reader.readAsDataURL(image);
    } else {
      if (challengeToEdit) {
        updateChallenge(challengeData.id, challengeData);
      } else {
        addChallenge(challengeData);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setCreateName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setLevelType('Easy');
    setImage(null);
    setPreviewImage(null);
    setIsEditingImage(false); 

    if (fileInput.current) {
      fileInput.current.value = null;
    }
  };

  return (
    <div>
      <Nav />
      <div className="create-main">
        <div className="box-1">
          <h2>{challengeToEdit ? 'Edit Challenge' : 'Create Challenge'}</h2>
        </div>
        <form onSubmit={submit} className='submit-form'>
          <label>Challenge Name</label>
          <input
            type="text"
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
          />
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <label>Image</label>
          {previewImage && !isEditingImage ? (
            <div className='preview-image'>
              <img src={previewImage} alt="Preview" className="image-preview" />
              <button type="button" onClick={() => setIsEditingImage(true)} className='change'>
                Change Image
              </button>
            </div>
          ) : (
            <div onClick={() => fileInput.current.click()}>
             <div className="cloud">
              <h4>Upload</h4>
              <img src={cloud} alt='cloud'/>
             <input
                type="file"
                ref={fileInput}
                onChange={handleImageChange}
                className='img-input'
                style={{ display: 'none' }}
               
              />
             </div>
            </div>
          )}

          <label>Level Type</label>
          <select
            value={levelType}
            onChange={(e) => setLevelType(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <br />
          <button type="submit" className="create-button">
            {challengeToEdit ? 'Save Changes' : 'Create Challenge'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
