import { Sequelize, Model } from 'sequelize-typescript'
import { dbConfig, dbInterface } from '/config/index.ts'

const {

}: dbInterface = dbConfig.defualt

const sequelize: Sequelize = new Sequelize(

)