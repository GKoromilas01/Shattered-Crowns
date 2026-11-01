module.exports=async function* (source){
 for await(const {type,data} of source)if(type==='test:pass'||type==='test:fail')yield JSON.stringify({type,name:data.name,file:data.file,durationMs:data.details?.duration_ms})+'\n';
};
