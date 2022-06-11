const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM cosoluutrus ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getCSLTById: (req, res) => {
        let cslt_id = req.params.id;
        let sql = 'SELECT * FROM cosoluutrus where id = ?'
        db.query(sql, cslt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewCSLT: (req, res) => {
        let data = req.body;
        console.log('addNewCSLT: ', req.body)
        let sql = `INSERT INTO cosoluutrus SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateCSLT: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE cosoluutrus SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteCSLTById: (req, res) => {
        let cslt_id = req.params.id;
        let sql = 'DELETE FROM cosoluutrus where id = ?'
        db.query(sql, cslt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteCSLTByAll: (req, res) => {
        let cslt_all = req.params.id;
        let sql = 'DELETE FROM cosoluutrus'
        db.query(sql, cslt_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}