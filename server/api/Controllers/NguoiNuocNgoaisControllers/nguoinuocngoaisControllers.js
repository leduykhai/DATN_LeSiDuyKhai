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
        let nnn_id = req.params.id;
        let sql = 'SELECT * FROM nguoinuocngoais where id = ?'
        db.query(sql, nnn_id, (err, response) => {
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

    deleteNguoiNuocNgoaiById: (req, res) => {
        let nnn_id = req.params.id;
        let sql = 'DELETE FROM nguoinuocngoais where id = ?'
        db.query(sql, nnn_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteNguoiNuocNgoaiByAll: (req, res) => {
        let nguoinuocngoai_all = req.params.id;
        let sql = 'DELETE FROM nguoinuocngoais'
        db.query(sql, nguoinuocngoai_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    // login: (req, res) => {
    //     let data = req.body;
    //     console.log('login: ', data);
    //     let sql = 'SELECT * FROM users where email = ? and password = ?'
    //     db.query(sql, [data.email, data.password], (err, response) => {
    //         if (err) {
    //             res.json({
    //                 status: "ERROR_IN_QUERY",
    //                 message: 'Error in login'
    //             });
    //         } else {
    //             console.log(response)
    //             if (response.length > 0) {
    //                 res.json({
    //                     status: 'SUCCESS',
    //                     data: response
    //                 });
    //             } else {
    //                 res.json({
    //                     status: 'ERROR_IN_LOGIN',
    //                     message: 'Account or password wrong'
    //                 });
    //             }
    //         }
    //     })
    // }
}