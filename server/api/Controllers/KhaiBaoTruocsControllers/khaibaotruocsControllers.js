const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM khaibaotruocs ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getKhaiBaoTruocById: (req, res) => {
        let kbt_id = req.params.id;
        let sql = 'SELECT * FROM khaibaotruocs where id = ?'
        db.query(sql, kbt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getKhaiBaoTruocByCSLTId: (req, res) => {
        let kbt_id = req.params.id;
        let sql = 'SELECT * FROM khaibaotruocs where cslt_id = ? ORDER BY id DESC'
        db.query(sql, kbt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewKhaiBaoTruoc: (req, res) => {
        let data = req.body;
        console.log('addNewKhaiBaoTruoc: ', req.body)
        let sql = `INSERT INTO khaibaotruocs SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateKhaiBaoTruoc: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE khaibaotruocs SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteKhaiBaoTruocById: (req, res) => {
        let kbt_id = req.params.id;
        let sql = 'DELETE FROM khaibaotruocs where id = ?'
        db.query(sql, kbt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteKhaiBaoTruocByAll: (req, res) => {
        let kbt_all = req.params.id;
        let sql = 'DELETE FROM khaibaotruocs'
        db.query(sql, kbt_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}