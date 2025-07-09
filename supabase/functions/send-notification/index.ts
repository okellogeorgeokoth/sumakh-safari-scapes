
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
  admin: "okoth603@gmail.com",
  cc: ["info@sumakhsafaris.com", "boniface@sumakhsafaris.com"],
  bookingSubject: "🦁 New Safari Booking Request - Sumakh Safaris",
  contactSubject: "📧 New Contact Form Submission - Sumakh Safaris",
  confirmationSubject: "✨ Your Message Received - Sumakh Safaris",
  bookingConfirmationSubject: "🎉 Your Safari Booking Confirmation - Sumakh Safaris"
};

const generateBookingAdminEmail = (booking: BookingData) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #8B5A2B 0%, #D2691E 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🦁 New Safari Booking</h1>
    <p style="color: #FFF8DC; margin: 10px 0 0 0; font-size: 16px;">Sumakh Safaris - Authentic African Adventures</p>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px;">
    <div style="background: #F5F5DC; padding: 20px; border-radius: 8px; border-left: 5px solid #8B5A2B; margin-bottom: 25px;">
      <h2 style="color: #8B5A2B; margin: 0 0 15px 0; font-size: 20px;">👤 Guest Information</h2>
      <p style="margin: 8px 0; color: #333;"><strong>Legal Name:</strong> ${booking.legal_name}</p>
      ${booking.first_name ? `<p style="margin: 8px 0; color: #333;"><strong>First Name:</strong> ${booking.first_name}</p>` : ''}
      ${booking.last_name ? `<p style="margin: 8px 0; color: #333;"><strong>Last Name:</strong> ${booking.last_name}</p>` : ''}
      <p style="margin: 8px 0; color: #333;"><strong>📧 Email:</strong> <a href="mailto:${booking.email}" style="color: #8B5A2B;">${booking.email}</a></p>
      ${booking.phone ? `<p style="margin: 8px 0; color: #333;"><strong>📞 Phone:</strong> <a href="tel:${booking.phone}" style="color: #8B5A2B;">${booking.phone}</a></p>` : ''}
      <p style="margin: 8px 0; color: #333;"><strong>🌍 Nationality:</strong> ${booking.nationality}</p>
    </div>
    
    <div style="background: #F0F8FF; padding: 20px; border-radius: 8px; border-left: 5px solid #4169E1; margin-bottom: 25px;">
      <h2 style="color: #4169E1; margin: 0 0 15px 0; font-size: 20px;">🌍 Safari Details</h2>
      <p style="margin: 8px 0; color: #333;"><strong>Destination:</strong> ${booking.preferred_destination}</p>
      <p style="margin: 8px 0; color: #333;"><strong>📅 Check-in:</strong> ${booking.check_in_date}</p>
      <p style="margin: 8px 0; color: #333;"><strong>📅 Check-out:</strong> ${booking.check_out_date || 'Not specified'}</p>
      <p style="margin: 8px 0; color: #333;"><strong>🏨 Accommodation:</strong> ${booking.accommodation_type}</p>
    </div>
    
    <div style="background: #F0FFF0; padding: 20px; border-radius: 8px; border-left: 5px solid #32CD32; margin-bottom: 25px;">
      <h2 style="color: #32CD32; margin: 0 0 15px 0; font-size: 20px;">👥 Group Information</h2>
      <p style="margin: 8px 0; color: #333;"><strong>Adults:</strong> ${booking.adults}</p>
      ${booking.children ? `<p style="margin: 8px 0; color: #333;"><strong>Children:</strong> ${booking.children}</p>` : ''}
      ${booking.children_ages ? `<p style="margin: 8px 0; color: #333;"><strong>Children Ages:</strong> ${booking.children_ages}</p>` : ''}
    </div>
    
    ${booking.special_requirements ? `
    <div style="background: #FFF8DC; padding: 20px; border-radius: 8px; border-left: 5px solid #DAA520; margin-bottom: 25px;">
      <h2 style="color: #DAA520; margin: 0 0 15px 0; font-size: 20px;">⚠️ Special Requirements</h2>
      <p style="margin: 0; color: #333; line-height: 1.6;">${booking.special_requirements}</p>
    </div>
    ` : ''}
    
    ${booking.notes ? `
    <div style="background: #F8F8FF; padding: 20px; border-radius: 8px; border-left: 5px solid #9370DB; margin-bottom: 25px;">
      <h2 style="color: #9370DB; margin: 0 0 15px 0; font-size: 20px;">📝 Additional Notes</h2>
      <p style="margin: 0; color: #333; line-height: 1.6;">${booking.notes}</p>
    </div>
    ` : ''}
    
    <!-- Action Button -->
    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:${booking.email}?subject=Re: Safari Booking Inquiry from ${booking.legal_name}&body=Dear ${booking.first_name || booking.legal_name.split(' ')[0]},%0D%0A%0D%0AThank you for your interest in Sumakh Safaris..."
         style="display: inline-block; background: linear-gradient(135deg, #8B5A2B 0%, #D2691E 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(139,90,43,0.3);">
        ✉️ Reply to ${booking.first_name || booking.legal_name.split(' ')[0]}
      </a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #8B5A2B; padding: 20px; text-align: center;">
    <p style="color: white; margin: 0; font-size: 14px;">🌍 Sumakh Safaris - Creating Unforgettable African Adventures</p>
    <p style="color: #FFF8DC; margin: 5px 0 0 0; font-size: 12px;">Samburu County, Kenya | +254 792 465156</p>
  </div>
</div>
`;

const generateContactAdminEmail = (contact: ContactData) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #4169E1 0%, #1E90FF 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">📧 New Contact Message</h1>
    <p style="color: #E6F3FF; margin: 10px 0 0 0; font-size: 16px;">Sumakh Safaris - Customer Inquiry</p>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px;">
    <div style="background: #F0F8FF; padding: 20px; border-radius: 8px; border-left: 5px solid #4169E1; margin-bottom: 25px;">
      <h2 style="color: #4169E1; margin: 0 0 15px 0; font-size: 20px;">👤 Contact Information</h2>
      <p style="margin: 8px 0; color: #333;"><strong>Name:</strong> ${contact.name}</p>
      <p style="margin: 8px 0; color: #333;"><strong>📧 Email:</strong> <a href="mailto:${contact.email}" style="color: #4169E1;">${contact.email}</a></p>
      ${contact.phone ? `<p style="margin: 8px 0; color: #333;"><strong>📞 Phone:</strong> <a href="tel:${contact.phone}" style="color: #4169E1;">${contact.phone}</a></p>` : ''}
      ${contact.travel_date ? `<p style="margin: 8px 0; color: #333;"><strong>📅 Travel Date:</strong> ${contact.travel_date}</p>` : ''}
      ${contact.group_size ? `<p style="margin: 8px 0; color: #333;"><strong>👥 Group Size:</strong> ${contact.group_size}</p>` : ''}
    </div>
    
    <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; border-left: 5px solid #666; margin-bottom: 25px;">
      <h2 style="color: #666; margin: 0 0 15px 0; font-size: 20px;">💬 Message</h2>
      <div style="background: white; padding: 15px; border-radius: 5px; line-height: 1.6; color: #333;">
        ${contact.message.replace(/\n/g, '<br>')}
      </div>
    </div>
    
    <!-- Action Button -->
    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:${contact.email}?subject=Re: Your Safari Inquiry&body=Dear ${contact.name},%0D%0A%0D%0AThank you for contacting Sumakh Safaris..."
         style="display: inline-block; background: linear-gradient(135deg, #4169E1 0%, #1E90FF 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(65,105,225,0.3);">
        ✉️ Reply to ${contact.name}
      </a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #4169E1; padding: 20px; text-align: center;">
    <p style="color: white; margin: 0; font-size: 14px;">🌍 Sumakh Safaris - Creating Unforgettable African Adventures</p>
    <p style="color: #E6F3FF; margin: 5px 0 0 0; font-size: 12px;">Samburu County, Kenya | +254 792 465156</p>
  </div>
</div>
`;

const generateBookingConfirmationEmail = (booking: BookingData) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #8B5A2B 0%, #D2691E 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎉 Safari Booking Received!</h1>
    <p style="color: #FFF8DC; margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing Sumakh Safaris</p>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #8B5A2B; margin: 0 0 10px 0; font-size: 24px;">Hello ${booking.first_name || booking.legal_name.split(' ')[0]}! 👋</h2>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">We've received your booking request for an amazing <strong>${booking.preferred_destination}</strong> safari adventure!</p>
    </div>
    
    <div style="background: #F5F5DC; padding: 25px; border-radius: 8px; border-left: 5px solid #8B5A2B; margin-bottom: 25px;">
      <h3 style="color: #8B5A2B; margin: 0 0 15px 0; font-size: 20px;">📋 Your Booking Summary</h3>
      <div style="display: grid; gap: 8px;">
        <p style="margin: 0; color: #333;"><strong>🌍 Destination:</strong> ${booking.preferred_destination}</p>
        <p style="margin: 0; color: #333;"><strong>📅 Dates:</strong> ${booking.check_in_date} ${booking.check_out_date ? `to ${booking.check_out_date}` : ''}</p>
        <p style="margin: 0; color: #333;"><strong>👥 Travelers:</strong> ${booking.adults} adults${booking.children && booking.children !== '0' ? `, ${booking.children} children` : ''}</p>
        ${booking.children_ages ? `<p style="margin: 0; color: #333;"><strong>👶 Children Ages:</strong> ${booking.children_ages}</p>` : ''}
        <p style="margin: 0; color: #333;"><strong>🏨 Accommodation:</strong> ${booking.accommodation_type}</p>
        ${booking.special_requirements ? `<p style="margin: 0; color: #333;"><strong>⚠️ Special Requirements:</strong> ${booking.special_requirements}</p>` : ''}
      </div>
    </div>
    
    <div style="background: #E8F5E8; padding: 25px; border-radius: 8px; border-left: 5px solid #4CAF50; margin-bottom: 25px;">
      <h3 style="color: #4CAF50; margin: 0 0 15px 0; font-size: 20px;">🚀 What Happens Next?</h3>
      <div style="color: #333; line-height: 1.8;">
        <p style="margin: 0 0 12px 0;">✅ <strong>Step 1:</strong> Our expert safari consultants will review your request</p>
        <p style="margin: 0 0 12px 0;">📋 <strong>Step 2:</strong> You'll receive a personalized itinerary within 24 hours</p>
        <p style="margin: 0 0 12px 0;">💬 <strong>Step 3:</strong> We'll discuss any special requirements or preferences</p>
        <p style="margin: 0 0 0 0;">💳 <strong>Step 4:</strong> Secure your adventure with our easy booking process</p>
      </div>
    </div>
    
    <div style="background: #FFF8E1; padding: 25px; border-radius: 8px; border-left: 5px solid #FFC107; margin-bottom: 30px;">
      <h3 style="color: #F57C00; margin: 0 0 15px 0; font-size: 20px;">📞 Need Immediate Assistance?</h3>
      <p style="margin: 0 0 10px 0; color: #333;">Our team is here to help make your safari dreams come true!</p>
      <p style="margin: 0; color: #333;">
        📧 <a href="mailto:info@sumakhsafaris.com" style="color: #8B5A2B; text-decoration: none;">info@sumakhsafaris.com</a><br>
        📞 <a href="tel:+254792465156" style="color: #8B5A2B; text-decoration: none;">+254 792 465156</a>
      </p>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #F8F8F8; border-radius: 8px;">
      <p style="margin: 0 0 15px 0; color: #666; font-style: italic;">"Experience the wild beauty of Africa with authentic Samburu culture"</p>
      <p style="margin: 0; color: #8B5A2B; font-weight: bold;">The Sumakh Safaris Team 🦁</p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #8B5A2B; padding: 20px; text-align: center;">
    <p style="color: white; margin: 0 0 5px 0; font-size: 14px;">🌍 Sumakh Safaris - Authentic African Adventures</p>
    <p style="color: #FFF8DC; margin: 0; font-size: 12px;">Samburu County, Kenya | Follow us for safari updates!</p>
  </div>
</div>
`;

const generateContactConfirmationEmail = (contact: ContactData) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #4169E1 0%, #1E90FF 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">✨ Message Received!</h1>
    <p style="color: #E6F3FF; margin: 10px 0 0 0; font-size: 16px;">Thank you for contacting Sumakh Safaris</p>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #4169E1; margin: 0 0 10px 0; font-size: 24px;">Hello ${contact.name}! 👋</h2>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">We've received your message and are excited to help you plan your African safari adventure!</p>
    </div>
    
    <div style="background: #F0F8FF; padding: 25px; border-radius: 8px; border-left: 5px solid #4169E1; margin-bottom: 25px;">
      <h3 style="color: #4169E1; margin: 0 0 15px 0; font-size: 20px;">📝 Your Message</h3>
      <div style="background: white; padding: 15px; border-radius: 5px; color: #333; line-height: 1.6;">
        ${contact.message.replace(/\n/g, '<br>')}
      </div>
    </div>
    
    <div style="background: #E8F5E8; padding: 25px; border-radius: 8px; border-left: 5px solid #4CAF50; margin-bottom: 25px;">
      <h3 style="color: #4CAF50; margin: 0 0 15px 0; font-size: 20px;">🚀 What Happens Next?</h3>
      <div style="color: #333; line-height: 1.8;">
        <p style="margin: 0 0 12px 0;">✅ Our safari experts will review your inquiry</p>
        <p style="margin: 0 0 12px 0;">📞 You'll receive a personalized response within 24 hours</p>
        <p style="margin: 0 0 0 0;">🌍 We'll provide detailed information about our safari experiences</p>
      </div>
    </div>
    
    <div style="background: #FFF8E1; padding: 25px; border-radius: 8px; border-left: 5px solid #FFC107; margin-bottom: 30px;">
      <h3 style="color: #F57C00; margin: 0 0 15px 0; font-size: 20px;">📞 Need Immediate Assistance?</h3>
      <p style="margin: 0; color: #333;">
        📧 <a href="mailto:info@sumakhsafaris.com" style="color: #4169E1; text-decoration: none;">info@sumakhsafaris.com</a><br>
        📞 <a href="tel:+254792465156" style="color: #4169E1; text-decoration: none;">+254 792 465156</a>
      </p>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #F8F8F8; border-radius: 8px;">
      <p style="margin: 0 0 15px 0; color: #666; font-style: italic;">"Every safari tells a story - let us help write yours"</p>
      <p style="margin: 0; color: #4169E1; font-weight: bold;">The Sumakh Safaris Team 🦁</p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #4169E1; padding: 20px; text-align: center;">
    <p style="color: white; margin: 0 0 5px 0; font-size: 14px;">🌍 Sumakh Safaris - Authentic African Adventures</p>
    <p style="color: #E6F3FF; margin: 0; font-size: 12px;">Samburu County, Kenya | Follow us for safari inspiration!</p>
  </div>
</div>
`;

const validateBookingData = (booking: BookingData): string[] => {
  const errors: string[] = [];
  
  if (!booking.legal_name?.trim()) errors.push("Legal name is required");
  if (!booking.email?.trim()) errors.push("Email is required");
  if (!booking.nationality?.trim()) errors.push("Nationality is required");
  if (!booking.preferred_destination?.trim()) errors.push("Preferred destination is required");
  if (!booking.check_in_date?.trim()) errors.push("Check-in date is required");
  if (!booking.accommodation_type?.trim()) errors.push("Accommodation type is required");
  if (!booking.adults?.trim()) errors.push("Number of adults is required");
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (booking.email && !emailRegex.test(booking.email)) {
    errors.push("Invalid email format");
  }
  
  return errors;
};

const validateContactData = (contact: ContactData): string[] => {
  const errors: string[] = [];
  
  if (!contact.name?.trim()) errors.push("Name is required");
  if (!contact.email?.trim()) errors.push("Email is required");
  if (!contact.message?.trim()) errors.push("Message is required");
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (contact.email && !emailRegex.test(contact.email)) {
    errors.push("Invalid email format");
  }
  
  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  console.log(`[${new Date().toISOString()}] Received ${req.method} request to send-notification`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }
  
  if (req.method !== "POST") {
    console.log(`Method ${req.method} not allowed`);
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  
  try {
    // Check API key availability
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Email service not configured",
          details: "RESEND_API_KEY is missing"
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Resend with API key
    const resend = new Resend(resendApiKey);
    console.log("Resend client initialized successfully");
    
    // Parse request body
    let requestData;
    try {
      const body = await req.text();
      console.log("Raw request body:", body);
      requestData = JSON.parse(body);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Invalid JSON in request body",
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error"
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log("Parsed request data:", JSON.stringify(requestData, null, 2));
    
    const { type, data } = requestData;
    
    if (!type || !data) {
      console.error("Missing type or data in request:", { type, hasData: !!data });
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Missing required fields",
          details: "Both 'type' and 'data' are required"
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Processing ${type} notification`);
    
    if (type === 'booking') {
      console.log("Processing booking request");
      const booking = data as BookingData;
      
      // Validate booking data
      const validationErrors = validateBookingData(booking);
      if (validationErrors.length > 0) {
        console.error("Booking validation failed:", validationErrors);
        return new Response(
          JSON.stringify({ 
            success: false,
            error: "Validation failed",
            details: validationErrors
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log(`Sending booking emails for: ${booking.email}`);
      
      try {
        // Send admin notification email
        console.log("Sending admin notification email...");
        const adminEmailResult = await resend.emails.send({
          from: CONFIG.from,
          to: [CONFIG.admin],
          cc: CONFIG.cc,
          subject: CONFIG.bookingSubject,
          html: generateBookingAdminEmail(booking)
        });
        
        console.log("Admin email sent successfully:", adminEmailResult);
        
        // Send client confirmation email
        console.log("Sending client confirmation email...");
        const clientEmailResult = await resend.emails.send({
          from: CONFIG.from,
          to: [booking.email],
          subject: CONFIG.bookingConfirmationSubject,
          html: generateBookingConfirmationEmail(booking)
        });
        
        console.log("Client email sent successfully:", clientEmailResult);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Booking emails sent successfully",
            adminEmailId: adminEmailResult.data?.id,
            clientEmailId: clientEmailResult.data?.id,
            timestamp: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      } catch (emailError) {
        console.error("Error sending booking emails:", emailError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Failed to send booking emails",
            details: emailError instanceof Error ? emailError.message : "Unknown email error",
            timestamp: new Date().toISOString()
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
    } else if (type === 'contact') {
      console.log("Processing contact request");
      const contact = data as ContactData;
      
      // Validate contact data
      const validationErrors = validateContactData(contact);
      if (validationErrors.length > 0) {
        console.error("Contact validation failed:", validationErrors);
        return new Response(
          JSON.stringify({ 
            success: false,
            error: "Validation failed",
            details: validationErrors
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log(`Sending contact emails for: ${contact.email}`);
      
      try {
        // Send admin notification email
        console.log("Sending admin notification email...");
        const adminEmailResult = await resend.emails.send({
          from: CONFIG.from,
          to: [CONFIG.admin],
          cc: CONFIG.cc,
          subject: CONFIG.contactSubject,
          html: generateContactAdminEmail(contact)
        });
        
        console.log("Admin email sent successfully:", adminEmailResult);
        
        // Send client confirmation email
        console.log("Sending client confirmation email...");
        const clientEmailResult = await resend.emails.send({
          from: CONFIG.from,
          to: [contact.email],
          subject: CONFIG.confirmationSubject,
          html: generateContactConfirmationEmail(contact)
        });
        
        console.log("Client email sent successfully:", clientEmailResult);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Contact emails sent successfully",
            adminEmailId: adminEmailResult.data?.id,
            clientEmailId: clientEmailResult.data?.id,
            timestamp: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      } catch (emailError) {
        console.error("Error sending contact emails:", emailError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Failed to send contact emails",
            details: emailError instanceof Error ? emailError.message : "Unknown email error",
            timestamp: new Date().toISOString()
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
    } else {
      console.error("Invalid notification type:", type);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Invalid notification type",
          details: "Type must be either 'booking' or 'contact'",
          receivedType: type
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
  } catch (error) {
    console.error("Unexpected error in send-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
