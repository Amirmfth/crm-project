import { useState } from "react";
import Form from "../modules/Form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { ClipLoader } from "react-spinners";

function CustomerEditPage({ data, id }) {
  const date = data.date ? moment(data.date).utc().format("YYYY-MM-DD") : "";
  const [form, setForm] = useState({
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    postalCode: data.postalCode || "",
    products: data.products || [],
    date,
  });

  const router = useRouter();

  const editCustomer = useMutation({
    mutationFn: async () => {
      return axios
        .patch(`/api/edit/${id}`, { data: form } || {})
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Customer edited");
      router.push("/");
    },
  });

  //   handler
  const cancelHandler = () => {
    router.push("/");
  };

  const editHandler = async () => {
    editCustomer.mutate();
  };

  return (
    <div className="customer-page">
      <h4>Edit Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button
          className="second"
          onClick={editHandler}
          disabled={editCustomer.isPending}
        >
          {editCustomer.isPending && <ClipLoader color="#36d7b7" size={15} />}
          Edit
        </button>
      </div>
    </div>
  );
}

export default CustomerEditPage;
