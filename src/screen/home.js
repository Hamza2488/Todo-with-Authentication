import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "../component/Input";
import { checkUser, getData, sendData } from "../firebase/firebasemethod";

const Home = () => {
  const [text, setText] = useState("");
  const [id, setUserId] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate()
  const params = useParams()




  let add = () => {
    if (!text) {
      return;
    }
    sendData({
      text: text,
      time: new Date(),
      id: id
    }, `todos/${id}`).then((id) => {
      console.log(id)
    }).catch((err) => {
      console.log(err)
    })

    setList([...list, text]);
    setText([""]);

    // console.log(list)
  };


  let goTodosData = ()=>{
    getData(`todos/${id}`).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }



  useEffect(() => {
    checkUser().then((res) => {
      if (params.id == res) {
        setUserId(res);
      } else {

      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  let del = (i) => {
    const newList = list.filter((element, index) => index !== i);
    //   console.log(newList)
    setList(newList);
  };

  let edit = (i) => {
    let a = prompt("Enter Text", list[i]);
    list[i] = a;
    setList([...list]);
  };
  return (
    <>
      <div className="App">
        <div className="nam">
          <h1>Todo App</h1>
          <div className="inp">
            <Box sx={{ mx: 5 }}>
              <Input
                sx={{ mx: 5 }}
                lable="Add Task"
                // type="text"
                variant="contained"
                className="input"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />

              <Button

                className="button1"
                variant="contained"
                onClick={add}
                lable="Add Task"
              />
            </Box>
          </div>
          <div className="list">
            <ul>
              {list.map((e, i) => {
                return (
                  <li key={i}>
                    {" "}
                    <span className="li">{e}</span>
                    <Button
                      className="button1"
                      onClick={() => edit(i)}
                      variant="contained"
                      lable="Edit"
                    />
                    <Button
                      className="button1"
                      onClick={() => del(i)}
                      lable="Delete"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
