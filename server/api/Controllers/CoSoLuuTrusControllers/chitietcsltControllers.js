const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM chitietcosoluutrus'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getCHITIETCSLTById: (req, res) => {
        let ct_cslt_id = req.params.id;
        let sql = 'SELECT * FROM chitietcosoluutrus where id = ?'
        db.query(sql, ct_cslt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewCHITIETCSLT: (req, res) => {
        let data = req.body;
        console.log('addNewCHITIETCSLT: ', req.body)
        let sql = `INSERT INTO chitietcosoluutrus SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateCHITIETCSLT: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE chitietcosoluutrus SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteCHITIETCSLTById: (req, res) => {
        let ct_cslt_id = req.params.id;
        let sql = 'DELETE FROM chitietcosoluutrus where id = ?'
        db.query(sql, ct_cslt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteCHITIETCSLTByAll: (req, res) => {
        let ct_cslt_all = req.params.id;
        let sql = 'DELETE FROM chitietcosoluutrus'
        db.query(sql, ct_cslt_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}