import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/app/emails/contact-form-template';
import { render } from '@react-email/render';
import React from 'react';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export async function POST(request: Request) {
  try {

    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is missing' },
        { status: 500 }
      );
    }

    if (!resendApiKey.startsWith('re_')) {
      return NextResponse.json(
        { error: 'Invalid Resend API key format' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const requestBody = await request.text();

    let jsonBody;

    try {
      jsonBody = JSON.parse(requestBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }

    const { name, email, company, subject, message } =
      jsonBody as ContactFormData;

    
    if (!name || !email || !message) {
      const errorMsg = 'Name, email, and message are required';
      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMsg = 'Please enter a valid email address';
      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    try {
      const formData = {
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() || 'Not provided',
        subject: subject?.trim() || 'No subject',
        message: message.trim(),
      };

      const emailHtml = await render(
        React.createElement(ContactFormEmail, formData)
      );

      const recipientEmail = 'stchybridiitp@gmail.com';
      const fromEmail = 'STC IITP <onboarding@resend.dev>';
      
      const emailSubject = formData.subject === 'No subject' 
        ? `New Contact Form Submission from ${formData.name}` 
        : formData.subject;
      
      const emailData = {
        from: fromEmail,
        to: [recipientEmail],
        reply_to: formData.email,
        subject: emailSubject,
        html: emailHtml,
      };
      
      const { data, error } = await resend.emails.send(emailData);

      if (error) {
        if (error.message?.includes('not authorized')) {
          return NextResponse.json(
            { 
              error: 'Email sending is not authorized. Please check your API key.',
              details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 403 }
          );
        }
        
        if (error.message?.includes('domain not verified')) {
          return NextResponse.json(
            { 
              error: 'The sending domain is not verified. Please verify your domain in Resend.',
              details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 403 }
          );
        }
        
        return NextResponse.json(
          { 
            error: 'Failed to send email. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error : undefined
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ 
        success: true,
        message: 'Your message has been sent successfully!',
        data
      });
      
    } catch (emailError) {
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      return NextResponse.json(
        { 
          error: 'Failed to process email. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      );
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
