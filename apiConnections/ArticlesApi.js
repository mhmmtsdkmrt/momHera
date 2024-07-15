import {useState, useEffect} from 'react';
import axios from 'axios';


const ArticlesApi = () => {

    const [data, setData] = useState([]);

         useEffect(() => {
            const fetchData = async() => {
                try {
                const response = await axios({
                    method: 'get',
                    url: "https://api.momhera.com/api/Categories",
                    params: {
                        Language : 'en',
                        PageIndex : 0,
                        PageSize: 6,
                    }, 
            });  

             setData(response.data.data.items);
 

            } 
            catch (e) {
                setError(e);
            };
            
        };

        fetchData();
        console.log(data);

    },[]);

    return [data];

};

export default ArticlesApi;






