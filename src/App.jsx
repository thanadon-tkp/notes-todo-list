import React, { useState } from "react";
import { useEffect } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [select, setSelect] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {

    if(localStorage.getItem('saveList')){
      let _data = localStorage.getItem('saveList')
      const data_json = JSON.parse(_data)
      setNotes(data_json.reverse())
      setData(data_json)
    }
    console.log('object');
  }, [])

  const OnSaveList = (even ,note) => {
    if(even.target.checked){
      note.save = true;
      let new_arr = [...data, note]
      setData(new_arr)
      localStorage.setItem('saveList', JSON.stringify(new_arr))
    }
    else {
      note.save = false;
      let new_arr = data.filter((item) => item.id !== note.id)
      setData(new_arr)
      localStorage.setItem('saveList', JSON.stringify(new_arr))
    }
  }

  const OnSave = () => {
    if (title != "") {
      if (select != null) {
        //update

        const idx = notes.findIndex((note) => {
          return note.id == select;
        });

        notes[idx].title = title;
        notes[idx].content = content;
      } else {
        setNotes((data) => [
          { id: notes.length, title: title, content: content, save: false },
          ...data,
        ]);
      }

      setTitle("");
      setContent("");
      setSelect(null);
    }
  };

  const OnDelete = (index, note) => {
    let new_arr = data.filter((item) => item.id !== note.id)
      setData(new_arr)
      localStorage.setItem('saveList', JSON.stringify(new_arr))

    const newArr = notes.filter((object) => {
      return object.id !== notes[index].id;
    });

    setNotes(newArr);
  };

  const OnEdit = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setSelect(notes[index].id);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="w-25 overflow-hidden">
        {notes.map((note, index) => {
          return (
            <div key={index} className="border-bottom p-3 bg-light">
              <div className="d-flex justify-content-start align-items-center">
                <div className="mb-1">
                <input className="form-check-input mx-2" type="checkbox" checked={note.save}
                onChange={(even) => OnSaveList(even, note)} />
                </div>
                <div>
                  <h4>
                    {note.title.length > 20
                      ? note.title.slice(0, 20) + "..."
                      : note.title}
                  </h4>
                </div>
              </div>
              <span className="text-muted">
                {note.content.length > 50
                  ? note.content.slice(0, 50) + "..."
                  : note.content}
              </span>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => OnEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => OnDelete(index, note)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border p-3 w-50 h-100">
        <div>
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(even) => {
              setTitle(even.target.value);
            }}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="content">
            Content:
          </label>
          <textarea
            className="form-control"
            type="text"
            id="content"
            value={content}
            onChange={(even) => {
              setContent(even.target.value);
              setHistory((data) => [
                ...data,
                { title: title, content: even.target.value },
              ]);
            }}
          />
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button
            className="btn btn-secondary me-3"
            disabled={select == null}
            onClick={() => {
              setTitle("");
              setContent("");
              setSelect(null);
              setHistory([]);
            }}
          >
            Cancel
          </button>
          <button onClick={() => OnSave()} className="btn btn-success">
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
