const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM users_roles'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getUsersRoleById: (req, res) => {
        let ur_id = req.params.id;
        let sql = 'SELECT * FROM users_roles where id = ?'
        db.query(sql, ur_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewUsersRole: (req, res) => {
        let data = req.body;
        console.log('addNewUsersRole: ', req.body)
        let sql = `INSERT INTO users_roles SET ?`
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },

    updateUsersRole: (req, res) => {
        let data = req.body;
        if (!data.id) {
            return res.status(400).send({
                error: true,
                message: 'Please provide id'
            });
        }
        let sql = `UPDATE users_roles SET ? WHERE id = ?`
        db.query(sql, [data, data.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },

    deleteUsersRoleById: (req, res) => {
        let ur_id = req.params.id;
        let sql = 'DELETE FROM users_roles where id = ?'
        db.query(sql, ur_id, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },
    deleteUsersRoleByAll: (req, res) => {
        let ur_all = req.params.id;
        let sql = 'DELETE FROM users_roles'
        db.query(sql, ur_all, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    }
}