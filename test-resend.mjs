import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // Replaced hardcoded key to prevent leak

async function test() {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'sarthak230504@gmail.com',
            subject: 'Hello World',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
