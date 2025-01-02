import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", error: error.message });
  }

  if (req.method === "GET") {
    const { customerId } = req.query;

    try {
        const customer = await Customer.findOne({ _id: customerId });
        res.status(200).json({ status: "Success", data: customer });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }
}
