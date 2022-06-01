const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')

const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM quans'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getQuanById: (req, res) => {
        let q_id = req.params.id;
        let sql = 'SELECT * FROM quans where id = ?'
        db.query(sql, q_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getQuanById: (req, res) => {
        let q_id = req.params.id;
        let sql = 'SELECT * FROM quans where thanh_pho_id = ?'
        db.query(sql, q_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewQuan: (req, res) => {
        let data = req.body;
        console.log('addNewQuan: ', req.body)
        let sql = `INSERT INTO quans SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateQuan: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE quans SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteQuanById: (req, res) => {
        let q_id = req.params.id;
        let sql = 'DELETE FROM quans where id = ?'
        db.query(sql, q_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteQuanByAll: (req, res) => {
        let q_all = req.params.id;
        let sql = 'DELETE FROM quans'
        db.query(sql, q_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}