const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM khuvucs'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getKhuVucById: (req, res) => {
        let khu_vuc_id = req.params.id;
        let sql = 'SELECT * FROM khuvucs where id = ?'
        db.query(sql, khu_vuc_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewKhuVuc: (req, res) => {
        let data = req.body;
        console.log('addNewKhuVuc: ', req.body)
        let sql = `INSERT INTO khuvucs SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateKhuVuc: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE khuvucs SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteKhuVucById: (req, res) => {
        let khu_vuc_id = req.params.id;
        let sql = 'DELETE FROM khuvucs where id = ?'
        db.query(sql, khu_vuc_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteKhuVucByAll: (req, res) => {
        let khuvuc_all = req.params.id;
        let sql = 'DELETE FROM khuvucs'
        db.query(sql, khuvuc_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}