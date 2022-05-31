const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM phanhoidanhgias'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getPhanHoiDGById: (req, res) => {
        let phanhoi_dg_id = req.params.id;
        let sql = 'SELECT * FROM phanhoidanhgias where id = ?'
        db.query(sql, phanhoi_dg_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewPhanHoiDG: (req, res) => {
        let data = req.body;
        console.log('addNewPhanHoiDG: ', req.body)
        let sql = `INSERT INTO phanhoidanhgias SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updatePhanHoiDG: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE phanhoidanhgias SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deletePhanHoiDGById: (req, res) => {
        let phanhoi_dg_id = req.params.id;
        let sql = 'DELETE FROM phanhoidanhgias where id = ?'
        db.query(sql, phanhoi_dg_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deletePhanHoiDGByAll: (req, res) => {
        let phanhoi_dg_all = req.params.id;
        let sql = 'DELETE FROM phanhoidanhgias'
        db.query(sql, phanhoi_dg_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}