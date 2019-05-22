const os = require('os');
const crypto = require('crypto');

// const {emailConfiguration} = require('config');
// const mailgun = require('mailgun-js')(
// {apiKey: emailConfiguration.api, domain: emailConfiguration.domain}
// );

// something to print ip wherever
function printIp() {
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;

    ifaces[ifname].forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // eslint-disable-next-line no-console
        console.log(`${ifname}:${alias}`, iface.address);
      } else {
        // this interface has only one ipv4 adress
        // eslint-disable-next-line no-console
        console.log(ifname, iface.address);
      }
      alias += 1;
    });
  });
}

// something to show stack traces of async exceptions
function handleAsyncExceptions() {
  if (handleAsyncExceptions.hooked === false) {
    process.on('unhandledRejection', (err) => {
      throw err;
    });

    handleAsyncExceptions.hooked = true;
  }
}

handleAsyncExceptions.hooked = false;

function batchReduce(items, batchSize = 10, op) {
  const reducer = (i) => {
    const batch = items.slice(i, i + batchSize);
    if (batch.length > 0) {
      return op(batch).then(() => reducer(i + batchSize));
    }
    return Promise.resolve();
  };

  return reducer(0);
}

// function sendEmail({to, from, subject, text}) {
//   const data = {
//     from,
//     to,
//     subject,
//     text
//   };
//   return new Promise((resolve, reject) => {
//     mailgun.messages().send(data, (error, body) => {
//       console.log({body, error})
//       return resolve(body);
//     });
//   });
// }

async function createPassword(length, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
  return new Promise((resolve, reject) => {
    const charsLength = chars.length;
    if (charsLength > 256) {
      reject(new Error('parm chars length greater than 256 characters'
        + ' masks desired key unpredictability'));
    }
    const randomBytes = crypto.randomBytes(length);
    const result = new Array(length);
    let cursor = 0;
    for (let i = 0; i < length; i++) {
      cursor += randomBytes[i];
      result[i] = chars[cursor % charsLength];
    }
    resolve(result.join(''));
  });
}

function wrapAsync(fn) {
  return (req, res, next) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

module.exports = {
  printIp,
  handleAsyncExceptions,
  batchReduce,
  // sendEmail,
  createPassword,
  wrapAsync,
};
