let modbus = require('modbus')



plc = modbus('169.254.162.22',502,1)
console.log("Hello",plc)
test()

async function test(){

    let res = await plc.read('ir0',function(callBack,resq){
	console.log(callBack,resq);

})

    //console.log(res)

    //await plc.write('hr100',175)

}
