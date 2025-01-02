import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

function Card({ customer, setCustomersList }) {
  const deleteCustomer = useMutation({
    mutationFn: async (customerId) => {
      return axios.delete(`/api/delete/${customerId}`).then((res) => res.data);
    },
    onSuccess: () =>
      setCustomersList((prevCustomers) =>
        prevCustomers.filter((c) => c._id !== customer._id)
      ),
  });

  // handler
  const deleteHandler = async () => {
    deleteCustomer.mutate(customer._id);
    toast.success("Customer deleted")
  };
  return (
    <div className="card">
      <div className="card__details">
        <p>
          {customer.name} {customer.lastName}
        </p>
        <p>{customer.email}</p>
      </div>
      <div className="card__buttons">
        <button
          onClick={deleteHandler}
          disabled={deleteCustomer.isPending ? true : false}
        >
          {deleteCustomer.isPending ? "Deleting..." : "Delete"}
        </button>
        <Link href={`/edit/${customer._id}`}>Edit</Link>
        <Link href={`/customer/${customer._id}`}>Details</Link>
      </div>
    </div>
  );
}

export default Card;
