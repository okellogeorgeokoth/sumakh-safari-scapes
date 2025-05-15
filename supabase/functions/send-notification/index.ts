import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  legal_name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  nationality: string;
  preferred_destination: string;
  preferred_month: string;
  check_in_date: string;
  check_out_date: string;
  adults: string;
  children?: string;
  children_ages?: string;
  accommodation_type: string;
  special_requirements?: string;
}

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
      <p><strong>📅 Preferred Month:</strong> ${booking.preferred_month}</p>
      <p><strong>📅 Dates:</strong> ${booking.check_in_date} to ${booking.check_out_date}</p>
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
  </div>
`;

const generateConfirmationEmail = (booking: BookingData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
    <h2 style="color: #8B5A2B;">✨ Thank You, ${booking.first_name || booking.legal_name.split(' ')[0]}!</h2>
    
    <p>We've received your request for a <strong>${booking.preferred_destination}</strong> safari.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #8B5A2B; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #8B5A2B;">Booking Summary</h3>
      <p><strong>📅 Preferred Travel Month:</strong> ${booking.preferred_month}</p>
      <p><strong>📅 Selected Dates:</strong> ${booking.check_in_date} to ${booking.check_out_date}</p>
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
  </div>
`;

export default async (req: { body: BookingData }) => {
  try {
    const booking = req.body;

    // Validate required fields
    if (!booking.legal_name || !booking.email || !booking.nationality || 
        !booking.preferred_destination || !booking.check_in_date) {
      throw new Error("Missing required fields");
    }

    // Send emails
    await Promise.all([
      resend.emails.send({
        from: "Sumakh Safaris <bookings@sumakhsafaris.com>",
        to: "boniface@sumakhsafaris.com",
        cc: ["info@sumakhsafaris.com"],
        subject: "New Safari Booking Request",
        html: generateAdminEmail(booking)
      }),
      resend.emails.send({
        from: "Sumakh Safaris <bookings@sumakhsafaris.com>",
        to: booking.email,
        subject: "Your Booking Confirmation - Sumakh Safaris",
        html: generateConfirmationEmail(booking)
      })
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process request" 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};