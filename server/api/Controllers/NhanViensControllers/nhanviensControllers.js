const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM nhanviens ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getNhanVienById: (req, res) => {
        let nv_id = req.params.id;
        let sql = 'SELECT * FROM nhanviens where id = ?'
        db.query(sql, nv_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getNhanVienByUserId: (req, res) => {
        let nv_id = req.params.id;
        let sql = 'SELECT * FROM nhanviens where user_id = ?'
        db.query(sql, nv_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewNhanVien: (req, res) => {
        let data = req.body;
        console.log('addNewNhanVien: ', req.body)
        let sql = `INSERT INTO nhanviens SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateNhanVien: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide ma_NV'
            });
        }
        let sql = `UPDATE nhanviens SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteNhanVienById: (req, res) => {
        let nv_id = req.params.id;
        let sql = 'DELETE FROM nhanviens where id = ?'
        db.query(sql, nv_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteNhanVienByAll: (req, res) => {
        let nv_all = req.params.id;
        let sql = 'DELETE FROM nhanviens'
        db.query(sql, nv_all, (err, response) => {
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