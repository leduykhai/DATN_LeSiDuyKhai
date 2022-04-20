const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM nguoidungs'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getNguoiDungById: (req, res) => {
        let ma_tknd = req.params.ma_tknd;
        let sql = 'SELECT * FROM nguoidungs where ma_tknd = ?'
        db.query(sql, ma_tknd, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewNguoiDung: (req, res) => {
        let data = req.body;
        console.log('addNewNguoiDung: ', req.body)
        let sql = `INSERT INTO nguoidungs SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateNguoiDung: (req, res) => {
        let data = req.body;
        if (!data.ma_tknd) {
            return res.status(400).send({
                error: true,
                message: 'Please provide ma_tknd'
            });
        }
        let sql = `UPDATE nguoidungs SET ? WHERE ma_tknd = ?`
        db.query(sql, [data, data.ma_tknd], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteNguoiDungById: (req, res) => {
        let ma_tknd = req.params.ma_tknd;
        let sql = 'DELETE FROM nguoidungs where ma_tknd = ?'
        db.query(sql, ma_tknd, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteNguoiDungByAll: (req, res) => {
        let nguoidung_all = req.params.ma_tknd;
        let sql = 'DELETE FROM nguoidungs'
        db.query(sql, nguoidung_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    login: (req, res) => {
        let data = req.body;
        console.log('login: ', data);
        let sql = 'SELECT * FROM nguoidungs where ma_tknd = ? and mat_khau = ?'
        db.query(sql, [data.ma_tknd, data.mat_khau], (err, response) => {
            if (err) {
                res.json({
                    status: "ERROR_IN_QUERY",
                    message: 'Error in login'
                });
            } else {
                if (response.length > 0) {
                    res.json({
                        status: 'SUCCESS',
                        data: response
                    });
                } else {
                    res.json({
                        status: 'ERROR_IN_LOGIN',
                        message: 'Account or mat_khau wrong'
                    });
                }
            }
        })
    }
}