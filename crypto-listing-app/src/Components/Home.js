import React, { useEffect, useState } from 'react'
import CryptoDetails from "./Crypto/CryptoDetails";
import ReactPaginate from "react-paginate";
import Header from "./header/Header"
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Home = () => {

  const cryptoperpage = 5;
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [holder, setHolder] = useState([]);
  const [pageNumber, setNumber] = useState(0);
  const [viewstate, setViewState] = useState([])
  const [viewed, setViewed] = useState([])
  const [filterData,setFilterData]=useState([])


  const pagevisited = pageNumber * cryptoperpage;

  const handleChange = (e) => {
    setSearch(e.target.value);
    setHolder(crypto)
    FilterFunction(holder)
  };

   function FilterFunction(res){
      setFilterData ( res.filter((data) =>{
      return  data.name.toLowerCase().includes(search.toLowerCase())
      }
      ))
   }

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((result) => {
        setCrypto(result.data);
        setHolder(result.data);
        FilterFunction(result.data)
      })
      .catch((err) => console.log(err));
    try {
      fetch("http://localhost:4000/cryptoData/getcrypto")
        .then((result) => {
          return result.json()
        }).then(res => {
          setViewState(res)
          setViewed(res)
        }
        )
    } catch (err) {
      console.log(err)
    }
  }, []);



  const pageCount = Math.ceil(holder.length / cryptoperpage);
  const changePage = ({ selected }) => {
    setNumber(selected);
  };

  function handleDragEnd(result) { 
    const currentpage= filterData.slice(pagevisited, pagevisited + cryptoperpage)
    let sourceindex =result.source.index;
    let destiny= result.destination.index;
    const source=filterData.findIndex((filter)=>{return filter.id===currentpage[sourceindex].id})
    const DestinyIndex=filterData.findIndex((filter)=>{return filter.id===currentpage[destiny].id})
    const items = Array.from(filterData);
    const [reorderdItem] = items.splice(source, 1);
    items.splice(DestinyIndex, 0, reorderdItem);
    setFilterData(items)
  }


  return (
    <div>
      <div className="App">
        <Header change={handleChange} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable  droppableId="characters">
            {(provided) => (
              <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {filterData
                  .slice(pagevisited, pagevisited + cryptoperpage)
                  .map((crypto, index) => {
                    let view = false
                    viewed.map((ele) => {
                      if (crypto.id === ele.Name) {
                        view = true;
                      }
                      return 0
                    })
                    return (
                      <Draggable key={crypto.id} draggableId={crypto.id} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <CryptoDetails
                              key={crypto.id}
                              image={crypto.image}
                              Name={crypto.id}
                              symbol={crypto.symbol}
                              price={crypto.current_price}
                              viewed={view}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"nextbutton"}
          disabledClassName={"disabledpagination"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  )
}

export default Home