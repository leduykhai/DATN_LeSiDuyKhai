const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM luutrus'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getLuuTruById: (req, res) => {
        let ma_lt = req.params.ma_lt;
        let sql = 'SELECT * FROM luutrus where ma_lt = ?'
        db.query(sql, ma_lt, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewLuuTru: (req, res) => {
        let data = req.body;
        console.log('addNewLuuTru: ', req.body)
        let sql = `INSERT INTO luutrus SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateLuuTru: (req, res) => {
        let data = req.body;
        if (!data.ma_lt) {
            return res.status(400).send({
                error: true,
                message: 'Please provide ma_lt'
            });
        }
        let sql = `UPDATE luutrus SET ? WHERE ma_lt = ?`
        db.query(sql, [data, data.ma_lt], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteLuuTruById: (req, res) => {
        let ma_lt = req.params.ma_lt;
        let sql = 'DELETE FROM luutrus where ma_lt = ?'
        db.query(sql, ma_lt, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteLuuTruByAll: (req, res) => {
        let luutru_all = req.params.ma_lt;
        let sql = 'DELETE FROM luutrus'
        db.query(sql, luutru_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}