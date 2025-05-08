// config/email.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const { createTransport } = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Validate required environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'ADMIN_EMAIL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Email configuration
const config = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  from: process.env.EMAIL_FROM || `Safari Bookings <${process.env.EMAIL_USER}>`,
  adminEmail: process.env.ADMIN_EMAIL,
  templatesDir: path.join(__dirname, '../email-templates'),
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
};

// Create transporter
const transporter = createTransport(config);

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('Error verifying email transporter:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// Load and compile email templates
const loadTemplate = (templateName) => {
  try {
    const templatePath = path.join(config.templatesDir, `${templateName}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    return handlebars.compile(templateSource);
  } catch (error) {
    console.error(`Error loading email template ${templateName}:`, error);
    throw new Error('Failed to load email template');
  }
};

// Pre-compile templates
const templates = {
  bookingConfirmation: loadTemplate('booking-confirmation'),
  adminNotification: loadTemplate('admin-notification'),
};

// Email sending functions
module.exports = {
  /**
   * Send booking confirmation to customer and admin
   * @param {Object} bookingData - Booking information
   * @returns {Promise<Object>} - Result of sending email
   */
  async sendBookingConfirmation(bookingData) {
    const { firstName, lastName, email, selectedSafari } = bookingData;
    
    // Get safari name
    const safariName = {
      'masai-mara': 'Masai Mara Adventure',
      'serengeti': 'Serengeti Explorer',
      'amboseli': 'Amboseli & Tsavo Safari',
      'kruger': 'Luxury Kruger Expedition',
      'tanzania': 'Tanzania Northern Circuit',
      'botswana': 'Botswana Delta Safari',
      'custom': 'Custom Safari Package'
    }[selectedSafari] || selectedSafari;

    try {
      // Send to customer
      const customerMailOptions = {
        from: config.from,
        to: email,
        subject: 'Your Safari Booking Confirmation',
        html: templates.bookingConfirmation({
          ...bookingData,
          safariName,
          currentYear: new Date().getFullYear(),
        }),
      };

      // Send to admin
      const adminMailOptions = {
        from: config.from,
        to: config.adminEmail,
        subject: `New Booking: ${firstName} ${lastName} - ${safariName}`,
        html: templates.adminNotification({
          ...bookingData,
          safariName,
          currentYear: new Date().getFullYear(),
        }),
      };

      // Send both emails in parallel
      const [customerResult, adminResult] = await Promise.all([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);

      return {
        success: true,
        customerMessageId: customerResult.messageId,
        adminMessageId: adminResult.messageId,
      };
    } catch (error) {
      console.error('Error sending booking confirmation emails:', error);
      throw new Error('Failed to send booking confirmation emails');
    }
  },

  /**
   * Test email connection and configuration
   * @returns {Promise<boolean>} - True if test succeeds
   */
  async testConnection() {
    try {
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('Email connection test failed:', error);
      return false;
    }
  },

  // Expose transporter for custom emails
  transporter,
};