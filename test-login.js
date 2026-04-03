const http = require('http');

function testLogin() {
  const postData = JSON.stringify({
    username: 'duc123',
    password: 'Despasito123!'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('Login successful!');
        console.log('Token:', response.token);
        console.log('User ID:', response.user._id);
        console.log('Username:', response.user.username);
      } catch (error) {
        console.error('Parse error:', error);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Request failed:', error.message);
  });

  req.write(postData);
  req.end();
}

// Run the test
testLogin();