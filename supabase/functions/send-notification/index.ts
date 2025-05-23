
import express, { Request, Response } from "express";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingData {
  legal_name: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  nationality: string;
  preferred_destination: string;
  check_in_date: string;
  check_out_date?: string | null;
  adults: string;
  children?: string | null;
  children_ages?: string | null;
  accommodation_type: string;
  special_requirements?: string | null;
  notes?: string | null;
}

const CONFIG = {
  from: "Sumakh Safaris <bookings@sumakhsafaris.com>",
  admin: "bookings@sumakhsafaris.com", // Updated primary recipient
  cc: ["info@sumakhsafaris.com", "boniface@sumakhsafaris.com"], // Added multiple CC recipients
  bookingSubject: "New Safari Booking Request",
  confirmationSubject: "Your Booking Confirmation - Sumakh Safaris"
};

const generateAdminEmail = (booking: BookingData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
    <h2 style="color: #8B5A2B;">📋 New Booking Request</h2>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
      <p><strong>👤 Legal Name:</strong> ${booking.legal_name}</p>
      ${booking.first_name ? `<p><strong>👤 First Name:</strong> ${booking.first_name}</p>` : ''}
      ${booking.last_name ? `<p><strong>👤 Last Name:</strong> ${booking.last_name}</p>` : ''}
      <p><strong>📧 Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
      ${booking.phone ? `<p><strong>📞 Phone:</strong> <a href="tel:${booking.phone}">${booking.phone}</a></p>` : ''}
      <p><strong>🌍 Nationality:</strong> ${booking.nationality}</p>
      
      <h3 style="color: #8B5A2B; margin-top: 15px;">Safari Details</h3>
      <p><strong>🌍 Destination:</strong> ${booking.preferred_destination}</p>
      <p><strong>📅 Dates:</strong> ${booking.check_in_date} to ${booking.check_out_date || 'Not specified'}</p>
      <p><strong>🏨 Accommodation:</strong> ${booking.accommodation_type}</p>
      
      <h3 style="color: #8B5A2B; margin-top: 15px;">Group Details</h3>
      <p><strong>👥 Travelers:</strong> ${booking.adults} adults${booking.children ? `, ${booking.children} children` : ''}</p>
      ${booking.children_ages ? `<p><strong>👶 Children Ages:</strong> ${booking.children_ages}</p>` : ''}
      
      ${booking.special_requirements ? `
      <div style="margin-top: 15px; padding: 10px; background: #fff8e1; border-left: 3px solid #ffc107;">
        <strong>❗ Special Requirements:</strong>
        <p>${booking.special_requirements}</p>
      </div>
      ` : ''}
    </div>
    <p style="margin-top: 20px;">
      <a href="mailto:${booking.email}?subject=Re: Safari Booking for ${booking.legal_name}"
          style="display: inline-block; background: #8B5A2B; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
        ✉️ Respond to Client
      </a>
    </p>
  </div>
`;

const generateConfirmationEmail = (booking: BookingData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
    <h2 style="color: #8B5A2B;">✨ Thank You, ${booking.first_name || booking.legal_name.split(' ')[0]}!</h2>
    
    <p>We've received your request for a <strong>${booking.preferred_destination}</strong> safari.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #8B5A2B; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #8B5A2B;">Booking Summary</h3>
      <p><strong>📅 Selected Dates:</strong> ${booking.check_in_date} to ${booking.check_out_date || 'Not specified'}</p>
      <p><strong>👥 Travelers:</strong> ${booking.adults} adults${booking.children ? `, ${booking.children} children` : ''}</p>
      ${booking.children_ages ? `<p><strong>👶 Children Ages:</strong> ${booking.children_ages}</p>` : ''}
      <p><strong>🏨 Accommodation Preference:</strong> ${booking.accommodation_type}</p>
      ${booking.special_requirements ? `<p><strong>❗ Special Requirements:</strong> ${booking.special_requirements}</p>` : ''}
    </div>
    
    <p><strong>What Happens Next?</strong></p>
    <ol>
      <li>Our safari specialist will review your request</li>
      <li>You'll receive a personalized itinerary within 24 hours</li>
      <li>We'll discuss any special requirements</li>
      <li>Finalize your booking with secure payment</li>
    </ol>
    
    <p><strong>Need immediate assistance?</strong><br>
    📧 <a href="mailto:info@sumakhsafaris.com">info@sumakhsafaris.com</a><br>
    📞 +254 792 465156</p>
    
    <p style="margin-top: 30px;">Warm regards,<br>
    <strong>The Sumakh Safaris Team</strong></p>
    
    <div style="margin-top: 40px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
      <p>Sumakh Safaris<br>Nairobi, Kenya</p>
    </div>
  </div>
`;

const handler = async (req: Request): Promise<Response> => {
  // Enable CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log("Received notification request");
    const requestData = await req.json();
    console.log("Request data:", JSON.stringify(requestData));
    
    // Extract booking data
    const booking = requestData.data;
    
    // Validate required fields
    if (!booking.legal_name || !booking.email || !booking.nationality || 
        !booking.preferred_destination || !booking.check_in_date) {
      return new Response(
        JSON.stringify({ error: "Missing required fields", details: { booking } }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log("Sending emails for booking from:", booking.email);
    
    // Log email configuration
    console.log("Email configuration:", {
      from: CONFIG.from,
      to: CONFIG.admin,
      cc: CONFIG.cc
    });

    // Send emails in parallel
    try {
      const [adminEmailResult, clientEmailResult] = await Promise.all([
        resend.emails.send({
          from: CONFIG.from,
          to: CONFIG.admin,
          cc: CONFIG.cc,
          subject: CONFIG.bookingSubject,
          html: generateAdminEmail(booking)
        }),
        resend.emails.send({
          from: CONFIG.from,
          to: booking.email,
          subject: CONFIG.confirmationSubject,
          html: generateConfirmationEmail(booking)
        })
      ]);
      
      console.log("Admin email result:", adminEmailResult);
      console.log("Client email result:", clientEmailResult);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Emails sent successfully",
          adminEmailResult,
          clientEmailResult
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (emailError: unknown) {
      console.error("Error sending emails:", emailError);
      let errorMessage = "Unknown email error";
      if (emailError && typeof emailError === "object" && "message" in emailError) {
        errorMessage = (emailError as { message?: string }).message || errorMessage;
      }
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to send emails",
          details: errorMessage
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error: unknown) {
    console.error("Error in send-notification function:", error);
    let errorMessage = "Failed to process request";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message?: string }).message || errorMessage;
    }
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);
function serve(handler: (req: Request) => Promise<Response>) {
  throw new Error("Function not implemented.");
}

