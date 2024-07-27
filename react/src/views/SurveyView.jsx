import React, { useEffect, useState } from 'react';
import { ClipboardIcon, LinkIcon, PhotoIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from './components/PageComponent';
import TButton from "./components/core/TButton";
import axiosClient from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyQuestions from './components/SurveyQuestions';
import { useStateContext } from '../contexts/ContextProvider';

function SurveyView() {

  const navigate = useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = useState(false); 
  const [errors, setError] = useState("");
  const {showToast} = useStateContext();


  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  })

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result,
      });

      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    
    const payLoad = { ...survey };
    if(payLoad.image) {
      payLoad.image = payLoad.image_url;
    }
    delete payLoad.image_url;


    let res = null;

    if(id) {
      res = axiosClient.put(`/surveys/${id}`, payLoad)
    } 
    else {
      res = axiosClient.post(`/surveys`, payLoad)
    } 
    
    res
    .then((res) => {
      navigate('/surveys');
      showToast(id ? 'Survey updated successfully' : 'Survey created successfully');
    })
    .catch((error) => {
      console.error(error.response.data.errors);
      if(error && error.response) {
        setError(error.response.data.message);
      }
    });
    
  };

  function onQuestionsUpdate(questions) {
    setSurvey({
      ...survey,
      questions,
    });
  }

  function onDelete(){
    
  }

  useEffect(() => {
    if(id){
      setLoading(true);
      axiosClient.get(`/surveys/${id}`)
      .then(({data}) => {
        setSurvey(data.data)
        setLoading(false)
      })
    }
  }, []) 

  const handleCopyLink = () => {
    const link = `https://surveys.al-manara.io/public/survey/${survey.id}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard');
    }).catch((err) => {
      console.error('Failed to copy link: ', err);
    });
  };

  const onDeleteClick = (id) =>{
    if (window.confirm('Are you sure you want to delete this survey?')) {
      axiosClient.delete(`surveys/${id}`)
      .then(() => {
        navigate('/surveys');
        showToast( 'Survey deleted successfully', 'error');
      })
    }
    
  }

  return (
    <PageComponent  
      title={!id ? 'Create new Survey' : 'Update Survey'}
      buttons={
        <div className='flex gap-2 '>
          <TButton color='green' to={`/public/survey/${survey.id}`}>
            <LinkIcon className='h-6 w-6 mr-2'/>
            Public
          </TButton>
          <TButton color='red' onClick={ev => onDeleteClick(survey.id)}>
            <TrashIcon className='h-6 w-6 mr-2'/>
            Delete
          </TButton>
          <TButton type="button" color="indigo" onClick={handleCopyLink}>
            <ClipboardIcon className="h-6 w-6 " />
          </TButton>
        </div>
      }
    >
      {loading &&
        <h3 className='text-center mt-4'>Loading...</h3>
      }
      {!loading && <form onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {errors && (
                <div className="bg-red-500 text-white py-3 px-3">{errors}</div>
              )}

              {/*Image*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {survey.image_url && (
                    <img
                      src={survey.image_url}
                      alt=""
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  {!survey.image_url && (
                    <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-8 h-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={onImageChoose}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/*Image*/}

              {/*Title*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Survey Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title}
                  onChange={(ev) =>
                    setSurvey({ ...survey, title: ev.target.value })
                  }
                  placeholder="Survey Title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/*Title*/}

              {/*Description*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                <textarea
                  name="description"
                  id="description"
                  value={survey.description || ""}
                  onChange={(ev) =>
                    setSurvey({ ...survey, description: ev.target.value })
                  }
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/*Description*/}

              {/*Expire Date*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="expire_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expire Date
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="expire_date"
                  value={survey.expire_date}
                  onChange={(ev) =>
                    setSurvey({ ...survey, expire_date: ev.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                  ${errors.expire_date ? 'border-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`}"
                />
              </div>
              {/*Expire Date*/}

              {/*Active*/}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    checked={survey.status}
                    onChange={(ev) =>
                      setSurvey({ ...survey, status: ev.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make survey publicly available
                  </p>
                </div>
              </div>
              {/*Active*/}

              {/* <button type="button" onClick={addQuestion}>
                Add question
              </button> */}
              <SurveyQuestions
                questions={survey.questions}
                onQuestionsUpdate={onQuestionsUpdate} 
              />
            </div>
            <div className="bg-gray-50 flex justify-between px-4 py-3 text-right sm:px-6">
              <TButton type="submit">{!id ? 'Save' : 'Update' }</TButton>
              
            </div>
          </div>
      </form>}
    </PageComponent>
  );
}

export default SurveyView;
