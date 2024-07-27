import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "./components/core/TButton";
import PageComponent from "./components/PageComponent";
import SurveysListItem from "./components/SurveysListItem";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "./components/PaginationLinks";

function Survey(){
  // const { surveys } = useStateContext()
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const {showToast} = useStateContext();

  const getSurveys = (url) => {
    url = url || '/surveys';
    setLoading(true)
    axiosClient.get(url)
    .then(({data}) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false)
    });
  }


  const onDeleteClick = (id) =>{
    if (window.confirm('Are you sure you want to delete this survey?')) {
      axiosClient.delete(`surveys/${id}`)
      .then(() => {
        getSurveys();
        showToast( 'Survey deleted successfully', 'error');
      })
    }
    
  }

  const onPageClick = (link) => {
    getSurveys(link.url);
  }

  useEffect(()=>{
    getSurveys();
  }, []);

  return(
      <PageComponent title="Survey" 
        buttons={(<TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2"></PlusCircleIcon>
          Create new
        </TButton>)}
      >
        {loading && 
          <div className="text-center text-2xl">
            loading...
          </div>
        }

        {!loading &&
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You don't have surveys created
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {surveys.map(survey => (
                  <SurveysListItem key={survey.id} survey={survey}  onDeleteClick={onDeleteClick} />
              ))}
          </div>
          {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
        </div>
        }
      </PageComponent>
  )
}

export default Survey;

