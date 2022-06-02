const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM nguoinuocngoais'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getNNNById: (req, res) => {
        let nnn_id = req.params.id;
        let sql = 'SELECT * FROM nguoinuocngoais where id = ?'
        db.query(sql, nnn_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewNNN: (req, res) => {
        let data = req.body;
        console.log('addNewNNN: ', req.body)
        let sql = `INSERT INTO nguoinuocngoais SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateNNN: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE nguoinuocngoais SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteNNNById: (req, res) => {
        let nnn_id = req.params.id;
        let sql = 'DELETE FROM nguoinuocngoais where id = ?'
        db.query(sql, nnn_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteNNNByAll: (req, res) => {
        let nnn_all = req.params.id;
        let sql = 'DELETE FROM nguoinuocngoais'
        db.query(sql, nnn_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}