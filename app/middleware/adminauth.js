module.exports = options =>{
  return async function adminauth(ctx,next){
    console.log('adminauth.js=>',ctx.session.openId)
    if(ctx.session.openId){
      await next()
    }else{
      ctx.body = {
        code: '9900',
        msg: '用户未登陆',
        data: null
      }
    }
  }
}