import CustomerEditPage from "@/components/templates/CustomerEditPage";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

function index() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const {
    query: { customerId },
    isReady,
  } = router;

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
  if (data) return <CustomerEditPage data={data} id={customerId} />;
}

export default index;
