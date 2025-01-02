import CustomerDetailsPage from "@/components/templates/CustomerDetailsPage";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";


function Index() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const {
    query: { customerId },
    isReady,
  } = router;

//   effects
  useEffect(() => {
    if (isReady) {
      axios
        .get(`/api/customer/${customerId}`)
        .then((res) => setData(res.data.data));
    }
  }, [isReady]);


  if (!data)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GridLoader color="#36d7b7" size={60} />
      </div>
    );
  if (data) return <CustomerDetailsPage data={data} />;
}

export default Index;
