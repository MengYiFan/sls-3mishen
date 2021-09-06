require("dotenv").config()
const fs = require('fs')
const path = require('path')
const readline = require('readline')

export const pmsGetInitSQLString = () => {
  return new Promise((resolve) => {
    let sqlList = []
    let sql = ''
    const rl = readline.createInterface({
      input: fs.createReadStream(
        path.join(__dirname, process.env.INIT_SQL_PATH)
      ),
      terminal: false
    })

    rl.on('line', (chunk) => {
      chunk = chunk.toString('ascii').replace(/\n/g, '').trim()
      if (chunk && chunk.indexOf('--') !== 0) {
        if (chunk.indexOf('SET') === 0 | chunk.indexOf('DROP') === 0) {
          sqlList.push(chunk)
          sql = ''
        } else {
          sql += chunk
        }
      } else {
        sql && sqlList.push(sql)
        sql = ''
      }
    })
    
    rl.on('close', () => {
      resolve(sqlList)
    })
  })
}