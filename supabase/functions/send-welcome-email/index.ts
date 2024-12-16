import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to } = await req.json() as EmailRequest;
    console.log("Sending welcome email to:", to);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7C3AED; text-align: center;">Welcome to Our Newsletter! 🎉</h1>
        
        <p style="font-size: 16px; line-height: 1.5; color: #4B5563;">
          Hey there! 👋 We're absolutely thrilled to have you join our community! ✨
        </p>
        
        <p style="font-size: 16px; line-height: 1.5; color: #4B5563;">
          Get ready for: 
          <br>• Amazing remote job opportunities 💼
          <br>• Expert career tips 🚀
          <br>• Work-life balance insights 🌟
          <br>• Industry trends and updates 📈
        </p>
        
        <p style="font-size: 16px; line-height: 1.5; color: #4B5563;">
          Stay tuned for our next update! We can't wait to share awesome opportunities with you! 🎯
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6B7280; font-size: 14px;">
            With excitement! 🤗<br>
            The Remote Work Hub Team 💪
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Remote Work Hub <onboarding@resend.dev>",
        to: [to],
        subject: "Welcome to Our Newsletter! 🎉",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);