const util = require('util')
const mysql = require('mysql2')
const db = require('../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM admins'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getAdminById: (req, res) => {
        let admin_id = req.params.id;
        console.log('ID: ', admin_id)
        let sql = 'SELECT * FROM admins where id = ?'
        db.query(sql, admin_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewAdmin: (req, res) => {
        let data = req.body;
        console.log('addNewAdmin: ', data)
        let sql = `INSERT INTO admins SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateAdmin: (req, res) => {
        let data = req.body;
        console.log('updateAdmin: ', data)
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE admins SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteAdminById: (req, res) => {
        let admin_id = req.params.id;
        console.log('deleteAdmin ID: ', admin_id)
        let sql = 'DELETE FROM admins where id = ?'
        db.query(sql, admin_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteAdminByAll: (req, res) => {
        let admin_all = req.params.id;
        let sql = 'DELETE FROM admins'
        db.query(sql, admin_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    login: (req, res) => {
        let data = req.body;
        console.log('login: ', data);
        let sql = 'SELECT * FROM admins where username = ? and password = ?'
        db.query(sql, [data.username, data.password], (err, response) => {
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
                        message: 'Account or password wrong'
                    });
                }
            }
        })
    }
}