import React, { useState } from "react";
import { Navbar } from "../components";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { createSubscription } from "react-redux/es/utils/Subscription";
import { createSubsription } from "../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { planType } = useParams();

  const initialState = {
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    bankName: "",
    IFSCCode: "",
    accountNo: "",
    customerID: "",
    plan: planType,
  };
  const [formData, setFormData] = useState(initialState);
  const [type, setType] = useState("debit");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createSubsription(formData);
      console.log(data);
      toast.success("Payment submitted successfully! Thank you");
      dispatch(
        setAuth({
          isAuth: true,
          user: data?.user,
        })
      );
      navigate("/protected/explore-profiles");
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="heading textCenter my-8">
        <h1>Enter Your Payment Details</h1>
      </div>

      <div
        className="paymentWrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="sidebar">
          <div className="list">
            <p
              className={`listOption ${
                type === "credit" && "listOptionActive"
              }`}
              onClick={() => {
                setType("credit");
              }}
            >
              Credit Card
            </p>
            <p
              className={`listOption ${type === "debit" && "listOptionActive"}`}
              onClick={() => {
                setType("debit");
              }}
            >
              Debit Card
            </p>
            <p
              className={`listOption ${
                type === "netbanking" && "listOptionActive"
              }`}
              onClick={() => {
                setType("netbanking");
              }}
            >
              Netbanking
            </p>
          </div>
        </div>

        {type === "credit" || type === "debit" ? (
          <form className="form" onSubmit={handlePaymentSubmit}>
            <div className="formControl">
              <label>Cardholder Name:</label>
              <input
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formControl">
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formControl">
              <label>Expiration Date:</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formControl">
              <label>CVV:</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={handleInputChange}
                name="cvv"
                required
              />
            </div>

            <div className="textRight">
              <button type="submit" className="btn btnPrimary my-8">
                checkout now
              </button>
            </div>
          </form>
        ) : (
          <form className="form" onSubmit={handlePaymentSubmit}>
            <div className="formControl">
              <label>Bank Name:</label>
              <input
                type="text"
                value={formData.bankName}
                name="bankName"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formControl">
              <label>IFSC Code:</label>
              <input
                type="text"
                value={formData.IFSCCode}
                onChange={handleInputChange}
                name="IFSCCode"
                required
              />
            </div>
            <div className="formControl">
              <label>Customer ID:</label>
              <input
                type="text"
                value={formData.customerID}
                onChange={handleInputChange}
                name="customerID"
                required
              />
            </div>
            <div className="formControl">
              <label>Account Number</label>
              <input
                type="text"
                value={formData.accountNo}
                name="accountNo"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="textRight">
              <button type="submit" className="btn btnPrimary my-8">
                checkout now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
