// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const CryptoJs = require('crypto-js')
const secret = require('./config')

function CryptoJsEncode(string) {
  return CryptoJs.AES.encrypt(string, secret).toString()
}

function CryptoJsDecode(string) {
  const bytes = CryptoJs.AES.decrypt(string, secret)
  return bytes.toString(CryptoJs.enc.Utf8)
}

module.exports = {
  CryptoJsEncode,
  CryptoJsDecode
}
