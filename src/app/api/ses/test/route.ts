
import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export async function POST(req: NextRequest) {
  const { accessKeyId, secretAccessKey, region, email } = await req.json();

  if (!accessKeyId || !secretAccessKey || !region || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const sesClient = new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const params = {
    Source: email,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: 'This is a test email from your application to confirm your Amazon SES configuration is working correctly.',
        },
      },
      Subject: {
        Data: 'Amazon SES Test Email',
      },
    },
  };

  try {
    await sesClient.send(new SendEmailCommand(params));
    return NextResponse.json({ message: `Test email sent to ${email}` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to send test email' }, { status: 500 });
  }
} 