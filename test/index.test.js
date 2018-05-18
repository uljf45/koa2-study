/*执行测试用例方法
 * ./node_modules/.bin/mocha --harmony  node.js<=7.5.x不支持async/await就需要加上--harmony
 * ./node_modules/.bin/mocha  node.js=7.6.0
 * 如果全局安装了mocha 直接在当前项目目录下执行 mocha 命令 会自动读取 ./test目录下的测试用例文件
 *
 */
const supertest = require('supertest')
const chai = require('chai')
const app = require('./../index')

const expect = chai.expect
const request = supertest(app.listen())

//测试套件/组
describe('开始测试demo的GET请求', () => {
  //测试用例
  it('测试/getString.json请求', (done) => {
    request
      .get('/getString.json')
      .expect(200)
      .end((err, res) => {
        //断言判断结果是否为object类型
        expect(res.body).to.be.an('object')
        expect(res.body.success).to.be.an('boolean')
        expect(res.body.data).to.be.an('string')
        done()
      })
  })
})
