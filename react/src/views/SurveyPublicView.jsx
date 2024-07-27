import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';
import PublicQuestionsView from './PublicQuestionsView';
import NotFound from './components/NotFound';

function SurveyPublicView() {
  const answers = {};
  const [surveyFinished, setSurveyFinished] = useState(false);
  const [survey, setSurvey] = useState({
    questions: []
  });
  const { id } = useParams();
  const [loading, setLoading] = useState(false); 


  function answerChanged(question, value) {
    answers[question.id] = value;
    console.log(question, value);
  }

  function onSubmit(ev) {
    ev.preventDefault();

    axiosClient
    .post(`/survey/${survey.id}/answer`, {
      answers,
    })
    .then((response) => {
      setSurveyFinished(true);
    });
  }

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/public/survey/${id}`)
    .then(({data}) => {
      setSurvey(data.data);
      setLoading(false);
    })
    .catch((error) => {
      if(error.response.status === 404) {
        setNotFound(true);
      }
      setLoading(false)
    })
  },[])

  return (
    <div>
      {notFound && <div> <NotFound /></div>}
      {!notFound &&<div> 
        {loading && <div className='flex justify-center '>Loading</div>}
        {!loading && 
        <form onSubmit={ev => onSubmit(ev)} className='container mx-auto my-4 p-4 bg-white shadow-md sm:w-2/4'>
          <div className='flex items-center flex-col mb-4'>

            {survey.image_url && <div className='mr-4'>
              <img src={survey.image_url} />
            </div>}

            <div className='col-span-5'>
              <h1 className="text-3xl mb-3">{survey.title}</h1>
              <p className="text-gray-500 text-sm mb-3">Expire Date: {survey.expire_date}</p>
              <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
            </div>

            {!surveyFinished && (
            <div>
              
              <div>
                {survey.questions.map((question, index) => (
                  <PublicQuestionsView
                    key={question.id}
                    question={question}
                    index={index} 
                    answerChanged={(val) => answerChanged(question, val)}
                  />
                ))}
              </div>
              {survey.questions.length && <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>}
              {!survey.questions.length
              && <p className="text-gray-500 text-sm mb-3">No Questions added for this survey</p>}

            </div>
          )}
          </div>
          
          {surveyFinished && (
            <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
              Thank you for participating in the survey
            </div>
          )}
          
        </form>}
      </div>}
    </div>
  );
}

export default SurveyPublicView;
