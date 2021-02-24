import { render } from "@testing-library/react";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const TickerSearch = () => {
  return (
    <Form>
      <Input placeholder="Search Ticker Symbol Ex: GME" />
    </Form>
  );
};
