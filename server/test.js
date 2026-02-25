import fetch from 'node-fetch';

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Contact Form',
  message: 'This is a test message to verify the contact form is working correctly.'
};

console.log('🧪 Testing Contact Form API...\n');
console.log('Sending test data:', testData);
console.log('\n⏳ Please wait...\n');

fetch('http://localhost:3008/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('✅ SUCCESS!');
      console.log('📧 Emails sent successfully!');
      console.log('\nCheck your inbox at: softwareredian@gmail.com');
      console.log('Also check: test@example.com (if it exists)');
    } else {
      console.log('❌ FAILED!');
      console.log('Error:', data.message);
    }
  })
  .catch(error => {
    console.log('❌ ERROR!');
    console.log('Make sure the backend server is running on port 3008');
    console.log('Error details:', error.message);
  });
