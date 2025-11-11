import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, orderId, total } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Elsaket" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: `
        <h2>Hey ${name}, your order was received! ❤</h2>
        <p>Thank you for your order. Your Order is coming for you soon. ✨</p>
        <p><b>Order ID:</b> #${orderId}</p>
        <p><b>Total:</b> ${total} EPG</p>
        <p>We'll notify you when it's on the way 🚀</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ status: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email Error:", error);
    return Response.json({ status: false, message: "Failed to send email" });
  }
}
