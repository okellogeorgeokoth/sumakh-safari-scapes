
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  travel_date?: string;
  group_size?: string;
  message: string;
}

const CONFIG = {
  from: "Sumakh Safaris <bookings@sumakhsafaris.com>",
  admin: "bookings@sumakhsafaris.com",
  cc: ["info@sumakhsafaris.com", "boniface@sumakhsafaris.com"],
  bookingSubject: "New Safari Booking Request",
  contactSubject: "New Contact Form Submission",
  confirmationSubject: "Your Message Received - Sumakh Safaris",
  bookingConfirmationSubject: "Your Booking Confirmation - Sumakh Safaris"
};

const generateBookingAdminEmail = (booking: BookingData) => `
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

const generateContactAdminEmail = (contact: ContactData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
    <h2 style="color: #8B5A2B;">📧 New Contact Form Submission</h2>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
      <p><strong>👤 Name:</strong> ${contact.name}</p>
      <p><strong>📧 Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
      ${contact.phone ? `<p><strong>📞 Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>` : ''}
      ${contact.travel_date ? `<p><strong>📅 Travel Date:</strong> ${contact.travel_date}</p>` : ''}
      ${contact.group_size ? `<p><strong>👥 Group Size:</strong> ${contact.group_size}</p>` : ''}
      
      <h3 style="color: #8B5A2B; margin-top: 15px;">Message</h3>
      <div style="background: white; padding: 10px; border-radius: 3px;">
        <p>${contact.message}</p>
      </div>
    </div>
    <p style="margin-top: 20px;">
      <a href="mailto:${contact.email}?subject=Re: Your Contact Form Submission"
          style="display: inline-block; background: #8B5A2B; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
        ✉️ Respond to Client
      </a>
    </p>
  </div>
`;

const generateBookingConfirmationEmail = (booking: BookingData) => `
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

const generateContactConfirmationEmail = (contact: ContactData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
    <h2 style="color: #8B5A2B;">✨ Thank You, ${contact.name}!</h2>
    
    <p>We've received your message and will get back to you as soon as possible.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #8B5A2B; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #8B5A2B;">Your Message</h3>
      <p>${contact.message}</p>
    </div>
    
    <p><strong>What Happens Next?</strong></p>
    <ul>
      <li>Our team will review your inquiry</li>
      <li>You'll receive a personalized response within 24 hours</li>
      <li>We'll provide detailed information about our safari options</li>
    </ul>
    
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
    console.log("Request data:", JSON.stringify(requestData, null, 2));
    
    const { type, data } = requestData;
    
    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Missing type or data in request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if we have the RESEND_API_KEY
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email configuration:", {
      from: CONFIG.from,
      to: CONFIG.admin,
      cc: CONFIG.cc,
      type: type
    });

    if (type === 'booking') {
      // Handle booking request
      const booking = data as BookingData;
      
      // Validate required fields for booking
      if (!booking.legal_name || !booking.email || !booking.nationality || 
          !booking.preferred_destination || !booking.check_in_date) {
        return new Response(
          JSON.stringify({ error: "Missing required booking fields" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log("Sending booking emails for:", booking.email);
      
      try {
        const [adminEmailResult, clientEmailResult] = await Promise.all([
          resend.emails.send({
            from: CONFIG.from,
            to: CONFIG.admin,
            cc: CONFIG.cc,
            subject: CONFIG.bookingSubject,
            html: generateBookingAdminEmail(booking)
          }),
          resend.emails.send({
            from: CONFIG.from,
            to: booking.email,
            subject: CONFIG.bookingConfirmationSubject,
            html: generateBookingConfirmationEmail(booking)
          })
        ]);
        
        console.log("Booking admin email result:", adminEmailResult);
        console.log("Booking client email result:", clientEmailResult);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Booking emails sent successfully",
            adminEmailResult,
            clientEmailResult
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (emailError: unknown) {
        console.error("Error sending booking emails:", emailError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Failed to send booking emails",
            details: emailError instanceof Error ? emailError.message : "Unknown error"
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else if (type === 'contact') {
      // Handle contact form submission
      const contact = data as ContactData;
      
      // Validate required fields for contact
      if (!contact.name || !contact.email || !contact.message) {
        return new Response(
          JSON.stringify({ error: "Missing required contact fields" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log("Sending contact emails for:", contact.email);
      
      try {
        const [adminEmailResult, clientEmailResult] = await Promise.all([
          resend.emails.send({
            from: CONFIG.from,
            to: CONFIG.admin,
            cc: CONFIG.cc,
            subject: CONFIG.contactSubject,
            html: generateContactAdminEmail(contact)
          }),
          resend.emails.send({
            from: CONFIG.from,
            to: contact.email,
            subject: CONFIG.confirmationSubject,
            html: generateContactConfirmationEmail(contact)
          })
        ]);
        
        console.log("Contact admin email result:", adminEmailResult);
        console.log("Contact client email result:", clientEmailResult);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Contact emails sent successfully",
            adminEmailResult,
            clientEmailResult
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (emailError: unknown) {
        console.error("Error sending contact emails:", emailError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Failed to send contact emails",
            details: emailError instanceof Error ? emailError.message : "Unknown error"
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid notification type. Must be 'booking' or 'contact'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error: unknown) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
