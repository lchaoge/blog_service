'use strict'

const Controller = require('egg').Controller;

class MainController extends Controller{
  
  async index (){
    this.ctx.body = 'hello egg'
  }

  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = `
      SELECT userName FROM admin_user 
      WHERE userName = '${userName}' AND password = '${password}'
    `
    console.log(sql)
    const result = await this.app.mysql.query(sql)

    if(result.length>0){
      let openId = new Date().getTime()
      this.ctx.session.openId = {
        'openId': openId
      }
      this.ctx.body = {code: '0000',msg: '登陆成功',data:{
        openId
      }}
    }else{
      this.ctx.body = {code: '9999',msg: '登陆失败',data:null}
    }

  }

  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {code: '0000',data:result,msg:'成功'}
  }

  async addArticle(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article',tempArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      code: insertSuccess ? '0000' : '9999',
      data:{
        insertId
      },
      msg: '成功'
    }
  }

  async updateArticle(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article',tempArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      code: updateSuccess ? '0000' : '9999',
      data:null,
      msg: '成功'
    }
  }

}

module.exports = MainController
