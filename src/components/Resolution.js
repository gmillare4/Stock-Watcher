import { React, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";

export const Resolution = (props) => {
  const [color, setColor] = useState("");

  //   if (props.status === "up") {
  //     setColor("green");
  //   } else if (props.status === "down") {
  //     setColor("red");
  //   } else {
  //     setColor("");
  //   }

  return (
    <ButtonGroup>
      <Button color="success">1</Button>
      <Button color="success">5</Button>
      <Button color="success">15</Button>
      <Button color="success">30</Button>
      <Button color="success">60</Button>
      <Button color="success">D</Button>
      <Button color="success">W</Button>
      <Button color="success">M</Button>
    </ButtonGroup>
  );
};
