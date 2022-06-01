const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM users_status'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getUserStatusById: (req, res) => {
        let us_id = req.params.id;
        let sql = 'SELECT * FROM users_status where id = ?'
        db.query(sql, us_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewUserStatus: (req, res) => {
        let data = req.body;
        console.log('addNewUserStatus: ', req.body)
        let sql = `INSERT INTO users_status SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateUserStatus: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE users_status SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteUserStatusById: (req, res) => {
        let us_id = req.params.id;
        let sql = 'DELETE FROM users_status where id = ?'
        db.query(sql, us_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteUserStatusByAll: (req, res) => {
        let us_all = req.params.id;
        let sql = 'DELETE FROM users_status'
        db.query(sql, us_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}