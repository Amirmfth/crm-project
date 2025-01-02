import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function CustomerDetailsPage({ data }) {
  const router = useRouter();
  const deleteCustomer = useMutation({
    mutationFn: async (customerId) => {
      return axios.delete(`/api/delete/${customerId}`).then((res) => res.data);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  // handlers
  const deleteHandler = async () => {
    deleteCustomer.mutate(data._id);
    toast.success(`Customer //${data._id}// deleted`);
  };
  return (
    <div className="customer-detail">
      <h4>Customer's Details</h4>
      <div className="customer-detail__main">
        <div className="customer-detail__item">
          <span>Name: </span>
          <p>{data.name}</p>
        </div>
        <div className="customer-detail__item">
          <span>Last Name: </span>
          <p>{data.lastName}</p>
        </div>
        <div className="customer-detail__item">
          <span>Email: </span>
          <p>{data.email}</p>
        </div>
        <div className="customer-detail__item">
          <span>Phone: </span>
          <p>{data.phone}</p>
        </div>
        <div className="customer-detail__item">
          <span>Address: </span>
          <p>{data.address}</p>
        </div>
        <div className="customer-detail__item">
          <span>Postal Code: </span>
          <p>{data.postalCode}</p>
        </div>
        <div className="customer-detail__item">
          <span>Date: </span>
          <p>{moment(data.date).utc().format("YYYY-MM-DD")}</p>
        </div>
      </div>
      <div className="customer-detail__products">
        <p>Name</p>
        <p>Price</p>
        <p>Qty</p>
        {data.products.map((product, index) => (
          <React.Fragment key={index}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.qty}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="customer-detail__buttons">
        <p>Edit or Delete</p>
        <button onClick={deleteHandler} disabled={deleteCustomer.isPending}>
          {deleteCustomer.isPending && <ClipLoader color="#36d7b7" size={15} />}
          Delete
        </button>
        <Link href={`/edit/${data._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;
