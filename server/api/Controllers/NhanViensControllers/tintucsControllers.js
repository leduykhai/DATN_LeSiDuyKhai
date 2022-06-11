const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM tintucs ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getTinTucById: (req, res) => {
        let tin_tuc_id = req.params.id;
        let sql = 'SELECT * FROM tintucs where id = ?'
        db.query(sql, tin_tuc_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewTinTuc: (req, res) => {
        let data = req.body;
        console.log('addNewTinTuc: ', req.body)
        let sql = `INSERT INTO tintucs SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateTinTuc: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE tintucs SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteTinTucById: (req, res) => {
        let tin_tuc_id = req.params.id;
        let sql = 'DELETE FROM tintucs where id = ?'
        db.query(sql, tin_tuc_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteTinTucByAll: (req, res) => {
        let tintuc_all = req.params.id;
        let sql = 'DELETE FROM tintucs'
        db.query(sql, tintuc_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}