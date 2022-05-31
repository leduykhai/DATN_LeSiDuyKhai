const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')

const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM quoctichs'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getQuocTichById: (req, res) => {
        let qt_id = req.params.id;
        let sql = 'SELECT * FROM quoctichs where id = ?'
        db.query(sql, qt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewQuocTich: (req, res) => {
        let data = req.body;
        console.log('addNewQuocTich: ', req.body)
        let sql = `INSERT INTO quoctichs SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateQuocTich: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE quoctichs SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteQuocTichById: (req, res) => {
        let qt_id = req.params.id;
        let sql = 'DELETE FROM quoctichs where id = ?'
        db.query(sql, qt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteQuocTichByAll: (req, res) => {
        let qt_all = req.params.id;
        let sql = 'DELETE FROM quoctichs'
        db.query(sql, qt_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}