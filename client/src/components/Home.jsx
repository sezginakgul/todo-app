import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { BiSortAlt2 } from "react-icons/bi";

const Home = () => {
  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState("");
  const [doc, setDoc] = useState(null);
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [sortFlag, setSortFlag] = useState(true);

  useEffect(() => {
    getTodo();
  }, []);
  // console.log("file");
  const getTodo = () => {
    axios
      .get("http://localhost:4000/todos", { withCredentials: true })
      .then((response) => {
        setTodos(response.data);
      });
  };

  if (!userInfo.email) {
    return "Your need to be logged in to see this page";
  }

  const addTodo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", inputVal);
    formData.append("document", doc);
    // console.log("Formdata", formData);
    axios
      .put("http://localhost:4000/todos", formData, { withCredentials: true })
      .then((response) => {
        console.log("res", response.data);
        setTodos([...todos, response.data]);
        setInputVal("");
      });
  };
  console.log("file", doc);

  const updateTodo = (todo) => {
    console.log("todo", todo);
    const data = { id: todo._id, done: !todo.done };
    axios
      .post("http://localhost:4000/todos", data, { withCredentials: true })
      .then(() => {
        const newTodos = todos.map((t) => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  };

  const deleteTodo = async (todo) => {
    const { _id } = todo;
    axios
      .delete("http://localhost:4000/todos/" + _id, {
        withCredentials: true,
      })
      .then(() => {
        const newT = todos.filter((t) => t._id !== todo._id);
        console.log("newT", newT);
        setTodos([...newT]);
      });
  };

  const editTask = (todo) => {
    setEdit(true);
    setInputVal(todo.text);
    deleteTodo(todo);
  };

  const clickFunc = () => {
    setEdit(false);
  };

  const sortData = (data) => {
    data.sort((a, b) => {
      const nameA = a.text.toLowerCase();
      const nameB = b.text.toLowerCase();
      if (sortFlag) {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    });
    setSortFlag(!sortFlag);
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={(e) => addTodo(e)}>
        <input
          className="text"
          placeholder={"What do you want to do?"}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />

        <input
          className="text"
          type="file"
          required
          name="image"
          onChange={(e) => setDoc(e.target.files[0])}
        />
        <button type="submit" onClick={clickFunc}>
          {edit ? "Edit Todo" : "Add Todo"}
        </button>
      </form>
      <hr style={{ margin: ".5rem 0 " }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "120px", padding: "2px 4px" }}
        />
        <BiSortAlt2
          style={{ fontSize: "22px" }}
          onClick={() => sortData(todos)}
        />
      </div>
      <hr style={{ margin: ".5rem 0 " }} />
      <ul>
        {todos
          .filter(
            (l) =>
              l.text.toLowerCase().includes(search.toLowerCase()) ||
              search === ""
          )
          .map((todo, i) => (
            <li key={i}>
              <div>
                <input
                  style={{ margin: "0 .4rem 0 0  " }}
                  type={"checkbox"}
                  defaultChecked={todo.done}
                  onClick={() => updateTodo(todo)}
                />
                {todo.done ? <del>{todo.text}</del> : todo.text}
              </div>
              <div>
                <BiEditAlt
                  style={{ margin: "0 .3rem 0 0 " }}
                  onClick={() => editTask(todo)}
                />
                <FaTrash onClick={() => deleteTodo(todo)} />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
