import { useState } from "react";
import Form from "../modules/Form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function AddCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    date: "",
    products: [],
  });

  const router = useRouter();

  const postCustomer = useMutation({
    mutationFn: async (customerData) => {
      return axios
        .post("/api/customer", customerData || {})
        .then((res) => res.data);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  // handlers
  const saveHandler = async () => {
    postCustomer.mutate({ data: form });
    toast.success("Customer added");
  };

  const cancelHandler = () => {
    setForm({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      date: "",
      products: [],
    });
    router.push("/");
  };
  return (
    <div className="customer-page">
      <h4>Add New Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button
          className="second"
          onClick={saveHandler}
          disabled={postCustomer.isPending ? true : false}
        >
          {postCustomer.isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
