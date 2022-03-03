import axios from 'axios'
import CryptoAES from 'crypto-js/aes'
import CryptoENC from 'crypto-js/enc-utf8'
import credential from '../../credentials.json'

var AES_KEY = credential[0]['AES_KEY']
const accessToken = decrypt(localStorage.getItem('a-t'))

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer ' + accessToken,
}

var instance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: headers,
})

export function decrypt(cypher) {
  try {
    return CryptoAES.decrypt(cypher, AES_KEY).toString(CryptoENC)
  } catch (error) {
    return null
  }
}

export function encrypt(plaintext) {
  try {
    return CryptoAES.encrypt(plaintext, AES_KEY)
  } catch (error) {
    return null
  }
}

export default instance
