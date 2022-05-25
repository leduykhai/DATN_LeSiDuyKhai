const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM nhatkyluutrus'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getNhatKyLuuTruById: (req, res) => {
        let nklt_id = req.params.id;
        let sql = 'SELECT * FROM nhatkyluutrus where id = ?'
        db.query(sql, nklt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewNhatKyLuuTru: (req, res) => {
        let data = req.body;
        console.log('addNewNhatKyLuuTru: ', req.body)
        let sql = `INSERT INTO nhatkyluutrus SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateNhatKyLuuTru: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE nhatkyluutrus SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteNhatKyLuuTruById: (req, res) => {
        let nklt_id = req.params.id;
        let sql = 'DELETE FROM nhatkyluutrus where id = ?'
        db.query(sql, nklt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteNhatKyLuuTruByAll: (req, res) => {
        let nklt_all = req.params.id;
        let sql = 'DELETE FROM nhatkyluutrus'
        db.query(sql, nklt_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}