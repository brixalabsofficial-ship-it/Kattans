export const RESTAURANT_INFO = {
  name: "CKB Kattans",
  tagline: "LOVE YOUR FOOD EVERY DAY.",
  whatsappNumber: "917902882660", // Active WhatsApp ordering number: 7902882660
  displayPhone: "7902882660",
  address: "Feroke, Kozhikode, Keralam 673631",
  openingHours: "Sun - Thu, Sat: 12:00 PM – 12:00 AM | Fri: 12:00 PM – 12:30 AM",
  email: "hello@ckbkattans.com",
  googleMapsUrl: "https://maps.google.com/?q=CEE+KEY+BEES+KATTANS,+Feroke,+Kozhikode,+Keralam+673631",
  googleReviewsUrl: "https://www.google.com/search?hl=en-IN&gl=in&q=CEE+KEY+BEES+KATTANS,+Feroke,+Kozhikode,+Keralam+673631&ludocid=17474558870722743472&lsig=AB86z5UMYzQyI1vX7d51r8djNA0p#lrd=0x3ba6510062d7478b:0xf2821ab570148cb0,3"
};

export const generateWhatsAppOrderUrl = ({ customer, items, subtotal, deliveryCharge, total, orderType, specialNotes }) => {
  const number = RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '');

  let text = `*NEW ORDER - CKB KATTANS* 🍽️\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `*Order Type:* ${orderType === 'delivery' ? '🛵 Home Delivery' : '🥡 Takeaway / Pickup'}\n`;
  text += `*Customer:* ${customer.name}\n`;
  text += `*Phone:* ${customer.phone}\n`;
  if (orderType === 'delivery') {
    text += `*Delivery Address:* ${customer.address}\n`;
    if (customer.landmark) text += `*Landmark:* ${customer.landmark}\n`;
  }
  if (specialNotes) {
    text += `*Special Note:* ${specialNotes}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `*ITEMS ORDERED:*\n`;

  items.forEach((item, index) => {
    text += `\n${index + 1}. *${item.name}* x ${item.quantity} — ₹${item.totalPrice || item.price * item.quantity}\n`;
    if (item.selectedVariant) {
      text += `   ▫ Size: ${item.selectedVariant.name}\n`;
    }
    if (item.selectedAddons && item.selectedAddons.length > 0) {
      text += `   ▫ Add-ons: ${item.selectedAddons.map(a => `${a.name} (+₹${a.price})`).join(', ')}\n`;
    }
    if (item.instructions) {
      text += `   ▫ Note: ${item.instructions}\n`;
    }
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `*Subtotal:* ₹${subtotal}\n`;
  if (orderType === 'delivery') {
    text += `*Delivery Fee:* ₹${deliveryCharge}\n`;
  }
  text += `*Grand Total: ₹${total}*\n`;
  text += `*Payment Mode:* ${orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay at Counter'}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `_Please confirm my order and share the estimated preparation time. Thank you!_`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};
