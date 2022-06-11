const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM chucosoluutrus ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getChuCSLTById: (req, res) => {
        let chu_cslt_id = req.params.id;
        let sql = 'SELECT * FROM chucosoluutrus where id = ?'
        db.query(sql, chu_cslt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewChuCSLT: (req, res) => {
        let data = req.body;
        console.log('addNewChuCSLT: ', req.body)
        let sql = `INSERT INTO chucosoluutrus SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateChuCSLT: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE chucosoluutrus SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteChuCSLTById: (req, res) => {
        let chu_cslt_id = req.params.id;
        let sql = 'DELETE FROM chucosoluutrus where id = ?'
        db.query(sql, chu_cslt_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteChuCSLTByAll: (req, res) => {
        let chu_cslt_all = req.params.id;
        let sql = 'DELETE FROM chucosoluutrus'
        db.query(sql, chu_cslt_all, (err, response) => {
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