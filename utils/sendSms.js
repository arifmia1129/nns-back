const axios = require('axios');
require('dotenv').config();

module.exports = (mobile, message) => {
  const greenwebsms = new URLSearchParams();
  greenwebsms.append('token', process.env.SMS_TOKEN);
  greenwebsms.append('to', mobile);
  greenwebsms.append('message', message);
  axios
    .post('http://api.greenweb.com.bd/api.php', greenwebsms)
    .then((response) => {
      //   console.log(response.data);
    });
};
