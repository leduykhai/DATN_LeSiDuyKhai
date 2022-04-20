const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM chitietluutrus'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getChiTietLuuTruById: (req, res) => {
        let ma_chi_tiet_lt = req.params.ma_chi_tiet_lt;
        let sql = 'SELECT * FROM chitietluutrus where ma_chi_tiet_lt = ?'
        db.query(sql, ma_chi_tiet_lt, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewChiTietLuuTru: (req, res) => {
        let data = req.body;
        console.log('addNewChiTietLuuTru: ', req.body)
        let sql = `INSERT INTO chitietluutrus SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateChiTietLuuTru: (req, res) => {
        let data = req.body;
        if (!data.ma_chi_tiet_lt) {
            return res.status(400).send({
                error: true,
                message: 'Please provide ma_chi_tiet_lt'
            });
        }
        let sql = `UPDATE chitietluutrus SET ? WHERE ma_chi_tiet_lt = ?`
        db.query(sql, [data, data.ma_chi_tiet_lt], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteChiTietLuuTruById: (req, res) => {
        let ma_chi_tiet_lt = req.params.ma_chi_tiet_lt;
        let sql = 'DELETE FROM chitietluutrus where ma_chi_tiet_lt = ?'
        db.query(sql, ma_chi_tiet_lt, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteChiTietLuuTruByAll: (req, res) => {
        let chitietluutru_all = req.params.ma_chi_tiet_lt;
        let sql = 'DELETE FROM chitietluutrus'
        db.query(sql, chitietluutru_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}