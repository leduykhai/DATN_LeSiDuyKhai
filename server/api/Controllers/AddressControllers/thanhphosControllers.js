const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')

const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM thanhphos'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getThanhPhoById: (req, res) => {
        let tp_id = req.params.id;
        let sql = 'SELECT * FROM thanhphos where id = ?'
        db.query(sql, tp_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getThanhPhoById: (req, res) => {
        let tp_id = req.params.id;
        let sql = 'SELECT * FROM thanhphos where quoc_tich_id = ?'
        db.query(sql, tp_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewThanhPho: (req, res) => {
        let data = req.body;
        console.log('addNewThanhPho: ', req.body)
        let sql = `INSERT INTO thanhphos SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateThanhPho: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE thanhphos SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteThanhPhoById: (req, res) => {
        let tp_id = req.params.id;
        let sql = 'DELETE FROM thanhphos where id = ?'
        db.query(sql, tp_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteThanhPhoByAll: (req, res) => {
        let qt_all = req.params.id;
        let sql = 'DELETE FROM thanhphos'
        db.query(sql, qt_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}