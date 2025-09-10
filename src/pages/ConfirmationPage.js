import React from "react";

export default function ConfirmationPage() {
  const order = JSON.parse(localStorage.getItem("lastOrder") || "{}");

  const maskedCard = order.cardNumber
    ? "**** **** **** " + order.cardNumber.slice(-4)
    : "N/A";

  return (
    <section className="confirmation-page">
      <div className="form-container">
        <h2>Order Confirmed</h2>
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Total:</strong> ${order.total}</p>
        <p><strong>Card:</strong> {maskedCard}</p>
        <p><strong>Date:</strong> {order.date}</p>
      </div>
    </section>
  );
}
