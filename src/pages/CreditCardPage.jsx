import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/CreditCardPage.css";

// Format card number: 1234 5678 9012 3456
const formatCardNumber = (value) =>
  value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

// Format expiry: MM/YY
const formatExpiry = (value) => {
  const raw = value.replace(/\D/g, "").slice(0, 4);
  return raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
};

// Detect card type
const detectCardType = (number) => {
  const raw = number.replace(/\D/g, "");
  if (/^5[1-5]/.test(raw) || /^2(2[2-9][1-9]|2[3-9]|[3-6]|7[01]|720)/.test(raw)) return "mastercard";
  if (/^3[47]/.test(raw)) return "amex";
  if (/^6(011|5|22)/.test(raw)) return "discover";
  return "visa"; // ✅ Visa is default
};

// Card logos
const cardLogos = {
  visa: "https://img.icons8.com/color/48/visa.png",
  mastercard: "https://img.icons8.com/color/48/mastercard-logo.png",
  amex: "https://img.icons8.com/color/48/amex.png",
  discover: "https://img.icons8.com/color/48/discover.png",
};

// Validation
const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .required("Card number required")
    .matches(/^\d{16}$/, "Must be 16 digits"),
  expiry: Yup.string()
    .required("Expiry required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid MM/YY"),
  cvv: Yup.string()
    .required("CVV required")
    .matches(/^[0-9]{3}$/, "Invalid CVV"),
  name: Yup.string().required("Name required"),
});

export default function CreditCardPage() {
  const navigate = useNavigate();
  const [cardType, setCardType] = useState("visa");

  const formik = useFormik({
    initialValues: { cardNumber: "", expiry: "", cvv: "", name: "" },
    validationSchema,
    onSubmit: (values) => {
      const order = {
        cardNumber: values.cardNumber, // raw 16 digits
        expiry: values.expiry,
        cvv: values.cvv,
        name: values.name,
        total: localStorage.getItem("cartTotal") || "0.00",
        date: new Date().toLocaleString(),
        cardType: detectCardType(values.cardNumber),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      navigate("/confirmation");
    },
  });

  return (
    <Box className="credit-card-page">
      <form onSubmit={formik.handleSubmit} className="credit-form">
        {/* Card Number */}
        <TextField
          fullWidth
          name="cardNumber"
          label="Card Number"
          value={formatCardNumber(formik.values.cardNumber)}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
            formik.setFieldValue("cardNumber", raw);
            setCardType(detectCardType(raw));
          }}
          error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          inputProps={{ maxLength: 19 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={cardLogos[cardType]} alt={cardType} width="40" />
              </InputAdornment>
            ),
          }}
        />

        {/* Expiry + CVV */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="expiry"
              label="Expiry"
              value={formik.values.expiry}
              onChange={(e) => {
                e.target.value = formatExpiry(e.target.value);
                formik.handleChange(e);
              }}
              error={formik.touched.expiry && Boolean(formik.errors.expiry)}
              helperText={formik.touched.expiry && formik.errors.expiry}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="cvv"
              label="CVV"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
              inputProps={{ maxLength: 3 }}
            />
          </Grid>
        </Grid>

        {/* Cardholder Name */}
        <TextField
          fullWidth
          name="name"
          label="Cardholder Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mt: 2 }}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
          Place Order
        </Button>
      </form>
    </Box>
  );
}
