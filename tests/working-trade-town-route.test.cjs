const {test,before,after}=require('node:test');const {setup,game}=require('./support/living-city.cjs');const {fundedSupplier}=require('./support/funded-supplier.cjs');let env;
before(async()=>env=await setup());after(async()=>env?.close());
test('Complete supplier loop uses gathered resources, paid native construction and actual production',async t=>{const p=await game(t,env,'home');await fundedSupplier(p);});
