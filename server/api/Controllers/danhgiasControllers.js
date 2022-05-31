const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM danhgias'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getDanhGiaById: (req, res) => {
        let danhgia_id = req.params.id;
        let sql = 'SELECT * FROM danhgias where id = ?'
        db.query(sql, danhgia_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewDanhGia: (req, res) => {
        let data = req.body;
        console.log('addNewDanhGia: ', req.body)
        let sql = `INSERT INTO danhgias SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateDanhGia: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE danhgias SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteDanhGiaById: (req, res) => {
        let danhgia_id = req.params.id;
        let sql = 'DELETE FROM danhgias where id = ?'
        db.query(sql, danhgia_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteDanhGiaByAll: (req, res) => {
        let danhgia_all = req.params.id;
        let sql = 'DELETE FROM danhgias'
        db.query(sql, danhgia_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}