const SECRET_KEY = '8f6b90cb73257d5e99def98e0564bb57a4289b80a90f10076519fd0b35fb7786';

const regexLink = /^https?:\/\/(www\.)?[0-9a-zA-Z]+([.|-]{1}[0-9a-zA-Z]+)*\.[0-9a-zA-Z-]+(\/[0-9a-zA-Z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/;

module.exports = {
  SECRET_KEY,
  regexLink,
};
