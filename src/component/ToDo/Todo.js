import React ,{useEffect, useState} from 'react';
import "./style.css";

const getlocalStorage = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists) {
        return JSON.parse(lists);
    }else {
        return [];
    }
}


const Todo = () => {
    const[inputData , setinputData] = useState("");
    const[items , setItems] = useState(getlocalStorage());
    const[isEditedItem , setIsEditedItem] = useState("");
    const[toggleButton , setToggleButton] = useState(false)

    const addItem = () => {
        if(!inputData) {
            alert("Plz fill the data");
        }else if(inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditedItem) {
                        return{...curElem , name:inputData};
                    } 
                    return curElem;
                })
            );

            setinputData("");
            setIsEditedItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name : inputData
            };
            setItems([...items , myNewInputData]);
            setinputData("");
        }

    };

    // edit the items

    const editItems = (index) => {
        const item_to_edited = items.find((curElem) => {
            return curElem.id = index;

        });
        setinputData(item_to_edited.name);
        setIsEditedItem(index);
        setToggleButton(true);
    }

    const  deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
            
    });
       setItems(updatedItem);

    };
    // removing all elements
    const deleteAll = () => {
        setItems([]);
    };

    // adding localspace
    useEffect(() => {
        localStorage.setItem("mytodolist" , JSON.stringify(items));
    }, [items]);

    return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.png" alt="Todologo"/>
                <figcaption>Add Your List Here</figcaption>
            </figure>
             <div className='addItems'>
                <input type = "text" placeholder='✍ Add Item' className='form-control'
                value={inputData }
                onChange={(event)=> setinputData(event.target.value)}/>
                {toggleButton ? ( <i className="far fa-edit add-btn" onClick={addItem}></i>)
                 : ( <i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                
             </div>

              <div className='showItems'>
                {items.map((curElem) => {
                     return (
                        <div className='eachItem' key = {curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                         <i className="far fa-edit add-btn" onClick={() => editItems(curElem.id)}></i>
                         <i className="far fa-trash-alt  add-btn"
                          onClick={()=> deleteItem(curElem.id)}></i>
                        </div>
                        </div>
                      );}
                 )}
                </div>

             <div className='showItems'>
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
                    <span>CHECK LIST</span></button>
             </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
