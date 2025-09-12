import ticketBasic from "../assets/icons/ticket-basic.png";
import ticketGold from "../assets/icons/ticket-gold.png";
import ticketPremium from "../assets/icons/ticket-premium.png";
import social from "../assets/icons/social.png";
import shirt from "../assets/icons/shirt.png";
import techplosion from "../assets/icons/techplosion.png";
import techmerizing from "../assets/icons/techmerizing.png";
import caseIcon from "../assets/icons/case.png";

const list = [
  { id: 1, service: "Basic Subscription", serviceInfo: "For one User", price: 4.99, img: ticketBasic, amount: 1 },
  { id: 2, service: "Gold Subscription", serviceInfo: "Share with Family", price: 9.99, img: ticketGold, amount: 1 },
  { id: 3, service: "Premium Subscription", serviceInfo: "Share with the World", price: 12.99, img: ticketPremium, amount: 1 },
  { id: 4, service: "Social Media Sharing Subscription", serviceInfo: "Share your list", price: 2.99, img: social, amount: 1 },
  { id: 5, service: "EZ Tech T-Shirt", serviceInfo: "Show your List to the World!!!", price: 25.99, img: shirt, amount: 2000 },
  { id: 6, service: "EZ Techplosion", serviceInfo: "Share your List to all!!!", price: 25.99, img: techplosion, amount: 1400 },
  { id: 7, service: "EZ Techmerizing", serviceInfo: "Techmerize your friends", price: 25.99, img: techmerizing, amount: 1090 },
  { id: 8, service: "EZ Tech Case", serviceInfo: "Mesmerize your friends", price: 20.99, img: caseIcon, amount: 10090 },
];

export default list;
