import React from "react";

function TodoItem(props) {
  let checked = props.isDone === true ? "true" : "";
  console.log(props.isDone);
  return (
    <div className="">
      <li>
        <div style={{ float: "left", width: "80%" }}>
          <input
            type="checkbox"
            onClick={() => {
              props.toggleTaskCompleted(props.id);
            }}
            checked={checked}
          />
          <span
            style={{ textDecoration: props.isDone ? "line-through" : "none" }}
          >
            {" "}
            {props.name}{" "}
          </span>
        </div>
        <div style={{ float: "right", width: "20%" }}>
          <span>
            {" "}
            <i
              className="fas fa-trash-alt"
              onClick={() => {
                props.onChecked(props.id);
              }}
            ></i>
          </span>
          <span>
            {" "}
            <i
              class="fas fa-pen"
              onClick={() => {
                props.changeTodoItem(props.id);
              }}
            ></i>
          </span>
        </div>
      </li>

      {/* <li style={{textDecoration:   props.isDone ? "line-through": "none"}} onClick={() => {
            props.toggleTaskCompleted(props.id)
        }}  ><input type="checkbox" />  {props.name} </li>
            <div>
               <i className="fas fa-trash-alt" 
                    onClick= {() => {
                        props.onChecked(props.id);
                    }}
                ></i>
            </div>
            <div>
               <i class="fas fa-pen" 
                    onClick= {() => {
                        props.changeTodoItem(props.id);
                    }}
                ></i>
            </div> */}
    </div>
  );
}

export default TodoItem;
