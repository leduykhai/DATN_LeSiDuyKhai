const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM khaibaotruoc_status'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getKBTStatusById: (req, res) => {
        let kbt_s_id = req.params.id;
        let sql = 'SELECT * FROM khaibaotruoc_status where id = ?'
        db.query(sql, kbt_s_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewKBTStatus: (req, res) => {
        let data = req.body;
        console.log('addNewKBTStatus: ', req.body)
        let sql = `INSERT INTO khaibaotruoc_status SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateKBTStatus: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE khaibaotruoc_status SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteKBTStatusById: (req, res) => {
        let kbt_s_id = req.params.id;
        let sql = 'DELETE FROM khaibaotruoc_status where id = ?'
        db.query(sql, kbt_s_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteKBTStatusByAll: (req, res) => {
        let kbt_s_all = req.params.id;
        let sql = 'DELETE FROM khaibaotruoc_status'
        db.query(sql, kbt_s_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}