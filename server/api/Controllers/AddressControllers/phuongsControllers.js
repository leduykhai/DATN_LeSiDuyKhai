const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM phuongs'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getPhuongById: (req, res) => {
        let p_id = req.params.id;
        let sql = 'SELECT * FROM phuongs where id = ?'
        db.query(sql, p_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getPhuongById: (req, res) => {
        let p_id = req.params.id;
        let sql = 'SELECT * FROM phuongs where quan_id = ?'
        db.query(sql, p_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewPhuong: (req, res) => {
        let data = req.body;
        console.log('addNewPhuong: ', req.body)
        let sql = `INSERT INTO phuongs SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updatePhuong: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE phuongs SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deletePhuongById: (req, res) => {
        let p_id = req.params.id;
        let sql = 'DELETE FROM phuongs where id = ?'
        db.query(sql, p_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deletePhuongByAll: (req, res) => {
        let p_all = req.params.id;
        let sql = 'DELETE FROM phuongs'
        db.query(sql, p_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}