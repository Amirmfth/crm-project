import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", error: error.message });
  }

  if (req.method === "DELETE") {
    const { customerId } = req.query;

    try {
      await Customer.deleteOne({ _id: customerId });
      res
        .status(200)
        .json({ status: "Success", message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }
}
