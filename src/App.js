import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
//  const [people, setPeople] = useState([]);
    const [allData, setallData] = useState([]);
//name + homeowldname + filsm names
   let Details_array = {};
   let promises = [];
   useEffect(()=>{
    axios.get("https://swapi.dev/api/people").then((response)=>{
        response.data.results.map((y)=>{
        Details_array[y.name] ={};
        Details_array[y.name]["gender"] =  y.gender;
        // console.log(Details_array)
        promises.push(axios.get(y.homeworld).then((res)=>{

          // Home_array.push(y.name + "#$#"+ res.data.name );
          Details_array[y.name]['home_world'] = res.data.name;
          // Details_array[y.name]['home_names'] = res.data.name;
        }));

         y.films.map((z)=>{
          Details_array[y.name]['movie_titles'] = [];
          promises.push(axios.get(z).then((re)=>{
             Details_array[y.name]['movie_titles'].push(re.data.title);
            }));
         });
       });

       Promise.all(promises).then(() =>{
            setallData(Details_array)

       }
      );
      //setPeople(response.data.results);
       
});
},[]);


// const items = people.map((x)=>{
//   return <li>{x.name}</li>
// })

const items2 = Object.entries(allData).map(item => {
  var movies_list = item[1]['movie_titles'].join(",");
//  console.log(item);
  return <li>{item[0]}---{item[1]['home_world']} --- {movies_list}</li> 
})

const genderDta = [];


  const result = Object.entries(allData).map((one)=> {
    if(one[1]['gender'] == "male"){
      var movies_list = one[1]['movie_titles'].join(",");
    //  genderDta.push(one);
      return <li>{one[0]}---{one[1]['home_world']} --- {movies_list}</li> 
    }

  });
  console.log(genderDta);

return (
  <div className="App">
    <h1>Hai</h1>
  {/* <ul>{items}</ul> */}
    <ul>{result}</ul>
  </div>
);
}

export default App;