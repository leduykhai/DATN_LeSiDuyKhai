const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM luutru_status'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getLTStatusById: (req, res) => {
        let lt_s_id = req.params.id;
        let sql = 'SELECT * FROM luutru_status where id = ?'
        db.query(sql, lt_s_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewLTStatus: (req, res) => {
        let data = req.body;
        console.log('addNewLTStatus: ', req.body)
        let sql = `INSERT INTO luutru_status SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateLTStatus: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE luutru_status SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteLTStatusById: (req, res) => {
        let lt_s_id = req.params.id;
        let sql = 'DELETE FROM luutru_status where id = ?'
        db.query(sql, lt_s_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteLTStatusByAll: (req, res) => {
        let lt_s_all = req.params.id;
        let sql = 'DELETE FROM luutru_status'
        db.query(sql, lt_s_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}