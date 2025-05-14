
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "booking" | "contact";
  data: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: NotificationRequest = await req.json();
    
    // Define admin email address to receive notifications
    const adminEmail = "info@sumakhsafaris.com";
    let emailResponse;
    
    if (type === "booking") {
      // Handle booking notification
      const bookingData = data;
      
      // Send notification to admin
      emailResponse = await resend.emails.send({
        from: "Sumakh Safaris <onboarding@resend.dev>", // Update with your verified domain when ready
        to: [adminEmail],
        subject: "New Safari Booking Request",
        html: `
          <h1>New Safari Booking Request</h1>
          <p>A new booking request has been submitted with the following details:</p>
          <ul>
            <li><strong>Name:</strong> ${bookingData.first_name || ""} ${bookingData.last_name || ""} ${bookingData.legal_name ? `(${bookingData.legal_name})` : ""}</li>
            <li><strong>Email:</strong> ${bookingData.email}</li>
            <li><strong>Phone:</strong> ${bookingData.phone || "Not provided"}</li>
            <li><strong>Safari:</strong> ${bookingData.selected_safari || bookingData.preferred_destination || "Not specified"}</li>
            <li><strong>Check-in Date:</strong> ${bookingData.check_in_date}</li>
            <li><strong>Check-out Date:</strong> ${bookingData.check_out_date}</li>
            <li><strong>Group Size:</strong> ${bookingData.adults} adults, ${bookingData.children || "0"} children</li>
            <li><strong>Accommodation Type:</strong> ${bookingData.accommodation_type}</li>
            <li><strong>Special Requirements:</strong> ${bookingData.special_requirements || "None"}</li>
          </ul>
          <p>Please respond to this client as soon as possible.</p>
        `,
      });
      
      // Send confirmation to the customer
      await resend.emails.send({
        from: "Sumakh Safaris <onboarding@resend.dev>", // Update with your verified domain when ready
        to: [bookingData.email],
        subject: "Your Safari Booking Request - Sumakh Safaris",
        html: `
          <h1>Thank you for your safari booking request!</h1>
          <p>Dear ${bookingData.first_name || bookingData.legal_name || "Valued Customer"},</p>
          <p>We have received your safari booking request and our team will review it shortly. 
          A member of our team will be in touch with you within 24-48 hours to discuss your safari plans further.</p>
          
          <h2>Your Request Details:</h2>
          <ul>
            <li><strong>Safari:</strong> ${bookingData.selected_safari || bookingData.preferred_destination || "Custom Safari"}</li>
            <li><strong>Dates:</strong> ${bookingData.check_in_date} to ${bookingData.check_out_date}</li>
            <li><strong>Group Size:</strong> ${bookingData.adults} adults, ${bookingData.children || "0"} children</li>
          </ul>
          
          <p>If you have any immediate questions, please contact us directly:</p>
          <p>Email: info@sumakhsafaris.com<br>
          Phone: +254 792 465156</p>
          
          <p>We look forward to creating an unforgettable African safari experience for you!</p>
          
          <p>Warm regards,<br>
          The Sumakh Safaris Team</p>
        `,
      });
      
    } else if (type === "contact") {
      // Handle contact form notification
      const contactData = data;
      
      // Send notification to admin
      emailResponse = await resend.emails.send({
        from: "Sumakh Safaris <onboarding@resend.dev>", // Update with your verified domain when ready
        to: [adminEmail],
        subject: "New Contact Form Submission",
        html: `
          <h1>New Contact Form Submission</h1>
          <p>A new message has been submitted through the contact form:</p>
          <ul>
            <li><strong>Name:</strong> ${contactData.name}</li>
            <li><strong>Email:</strong> ${contactData.email}</li>
            <li><strong>Phone:</strong> ${contactData.phone || "Not provided"}</li>
            <li><strong>Travel Date:</strong> ${contactData.travel_date || "Not specified"}</li>
            <li><strong>Group Size:</strong> ${contactData.group_size || "Not specified"}</li>
          </ul>
          <h2>Message:</h2>
          <p>${contactData.message}</p>
          <p>Please respond to this inquiry as soon as possible.</p>
        `,
      });
      
      // Send confirmation to the person who submitted the form
      await resend.emails.send({
        from: "Sumakh Safaris <onboarding@resend.dev>", // Update with your verified domain when ready
        to: [contactData.email],
        subject: "We've received your message - Sumakh Safaris",
        html: `
          <h1>Thank you for contacting Sumakh Safaris!</h1>
          <p>Dear ${contactData.name},</p>
          <p>We have received your message and appreciate your interest in our safari experiences. 
          A member of our team will get back to you within 24-48 hours.</p>
          
          <p>If you have any urgent inquiries, please feel free to contact us directly:</p>
          <p>Email: info@sumakhsafaris.com<br>
          Phone: +254 792 465156</p>
          
          <p>We look forward to helping you plan your African adventure!</p>
          
          <p>Warm regards,<br>
          The Sumakh Safaris Team</p>
        `,
      });
    }

    console.log("Email notification sent successfully");
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
