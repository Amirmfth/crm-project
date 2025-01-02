import { useState } from "react";
import Card from "../modules/Card";

function HomePage({ customers }) {
    const [customersList, setCustomersList] = useState(customers);
  return <div>{
    customersList.map((customer) => (<Card key={customer._id} customer={customer} setCustomersList={setCustomersList}/>))
    }</div>;
}

export default HomePage;
