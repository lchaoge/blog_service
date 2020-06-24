'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi';
  }
  async getArticleList(){
    let sql = `SELECT 
      article.id as id,
      article.title as title,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
      article.view_count as view_count,
      type.typeName as typeName
    FROM article LEFT JOIN type on article.type_id = type.id
    `
    const resultList = await this.app.mysql.query(sql)
    this.ctx.body = {data:resultList}
  }

  async getArticleById(){
    let id = this.ctx.params.id
    let sql = `SELECT 
      article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.article_content as article_content,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
      article.view_count as view_count,
      type.typeName as typeName,
      type.id as typeId 
    FROM article LEFT JOIN type on article.type_id = type.id
    WHERE article.id = ${id}
    `
    const resultList = await this.app.mysql.query(sql)
    this.ctx.body = {data:resultList}
  }

  // 获取类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data: result}
  }

  // 根据列表id获取列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = `SELECT 
      article.id as id,
      article.title as title,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
      article.view_count as view_count,
      type.typeName as typeName
    FROM article LEFT JOIN type on article.type_id = type.id
    WHERE type_id = ${id}
    `
    const resultList = await this.app.mysql.query(sql)
    this.ctx.body = {data:resultList}
  }

}

module.exports = HomeController;
