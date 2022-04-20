const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
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

    getNguoiNuocNgoaiById: (req, res) => {
        let ma_tknnn = req.params.ma_tknnn;
        let sql = 'SELECT * FROM nguoinuocngoais where ma_tknnn = ?'
        db.query(sql, ma_tknnn, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewNguoiNuocNgoai: (req, res) => {
        let data = req.body;
        console.log('addNewNguoiNuocNgoai: ', req.body)
        let sql = `INSERT INTO nguoinuocngoais SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateNguoiNuocNgoai: (req, res) => {
        let data = req.body;
        if (!data.ma_tknnn) {
            return res.status(400).send({
                error: true,
                message: 'Please provide ma_tknnn'
            });
        }
        let sql = `UPDATE nguoinuocngoais SET ? WHERE ma_tknnn = ?`
        db.query(sql, [data, data.ma_tknnn], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteNguoiNuocNgoaiById: (req, res) => {
        let ma_tknnn = req.params.ma_tknnn;
        let sql = 'DELETE FROM nguoinuocngoais where ma_tknnn = ?'
        db.query(sql, ma_tknnn, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteNguoiNuocNgoaiByAll: (req, res) => {
        let nguoinuocngoai_all = req.params.ma_tknnn;
        let sql = 'DELETE FROM nguoinuocngoais'
        db.query(sql, nguoinuocngoai_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    login: (req, res) => {
        let data = req.body;
        console.log('login: ', data);
        let sql = 'SELECT * FROM nguoinuocngoais where ma_tknnn = ? and mat_khau = ?'
        db.query(sql, [data.ma_tknnn, data.mat_khau], (err, response) => {
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