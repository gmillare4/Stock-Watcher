import { render } from "@testing-library/react";

import { Form, Input } from "reactstrap";

export const TickerSearch = () => {
  return (
    <Form>
      <Input placeholder="Search Ticker Symbol Ex: GME" />
    </Form>
  );
};
