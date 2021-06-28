'use strict'

var http = require('http')
const modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const options = {
  'host': '169.254.162.22',
  'port': '502',
  'retryTime' : 1000, // 1s for every retry
  'retryAlways' : true // retry even if the connection was closed on purpose	
}
const client = new modbus.client.TCP(socket)

http.createServer()
let Reconnect = require('./net-reconnect.js')
    let recon = new Reconnect(socket, options)

socket.on('connect', function () {
  client.readInputRegisters(0, 1)
    .then(function (resp) {
      console.log(JSON.stringify(resp, null, 2))
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
  client.writeSingleRegister(0, 555)

    .then(function (resp) {

      console.log(resp)

      socket.end()

    }).catch(function () {

      console.error(arguments)

      socket.end()

    })
})

socket.on('error', console.error)
socket.connect(options)
socket.listen(8082)
