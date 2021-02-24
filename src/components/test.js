import "../App.css";

export const Test = (props) => {
  console.log("status", props.status);
  return (
    <div>
      <h1 className={props.status}>${props.price}</h1>
    </div>
  );
};
