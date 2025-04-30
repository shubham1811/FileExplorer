import "./App.css";
import { useState } from "react";
import json from "./data/data.json";

const List = ({ data, addNodeList }) => {
  const [isExpended, setIsExpanded] = useState({});
  console.log(data);
  return data.map((listData) => {
    return (
      <>
        <div className="parentContainer">
          {listData.isFolder && (
            <>
              <span
                onClick={() => {
                  setIsExpanded((prev) => ({
                    ...prev,
                    [listData.name]: !prev[listData.name],
                  }));
                }}
              >
                {isExpended[listData.name] ? "-" : "+"}
              </span>
            </>
          )}

          {listData.name}
          {listData.isFolder && (
            <button
              className="Button"
              onClick={() => {
                addNodeList(listData.name);
              }}
            >
              Add
            </button>
          )}
        </div>
        <div className="childrenContainer">
          {listData?.children && isExpended[listData.name] && (
            <List data={listData?.children} addNodeList={addNodeList} />
          )}
        </div>
      </>
    );
  });
};

function App() {
  const [data, setData] = useState(json);
  const addNodeList = (parrentName) => {
    const name = prompt("Enter tyhe name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.name === parrentName) {
          console.log(node.name);
          return {
            ...node,
            children: [
              ...node.children,
              {
                name: name,
                children: [],
                isFolder: false,
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };
    console.log("FinalData", data);
    setData((prev) => updateTree(prev));
  };
  return (
    <div className="App">{<List data={data} addNodeList={addNodeList} />}</div>
  );
}

export default App;
