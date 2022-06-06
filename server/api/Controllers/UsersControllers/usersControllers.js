const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM users'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getUserByIdMax: (req, res) => {
        let user_id = req.params.id;
        console.log('ID: ', user_id)
        let sql = 'SELECT * FROM users WHERE id = (SELECT MAX(id) FROM users)'
        db.query(sql, user_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getUserById: (req, res) => {
        let user_id = req.params.id;
        console.log('ID: ', user_id)
        let sql = 'SELECT * FROM users where id = ?'
        db.query(sql, user_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewUser: (req, res) => {
        let data = req.body;
        console.log('addNewUser: ', data)
        let sql = `INSERT INTO users SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateUser: (req, res) => {
        let data = req.body;
        console.log('updateUser: ', data)
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE users SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteUserById: (req, res) => {
        let user_id = req.params.id;
        console.log('deleteUser ID: ', user_id)
        let sql = 'DELETE FROM users where id = ?'
        db.query(sql, user_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteUserByAll: (req, res) => {
        let user_all = req.params.id;
        let sql = 'DELETE FROM users'
        db.query(sql, user_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    login: (req, res) => {
        let data = req.body;
        console.log('login: ', data);
        let sql = 'SELECT * FROM users where email = ? and password = ?'
        db.query(sql, [data.email, data.password], (err, response) => {
            if (err) {
                res.json({
                    status: "ERROR_IN_QUERY",
                    message: 'Error in login'
                });
            } else {
                console.log(response)
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