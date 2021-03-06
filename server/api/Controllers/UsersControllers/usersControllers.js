const util = require('util')
const mysql = require('mysql2')
const db = require('../../Config/database')
const {
    response
} = require('express')
// const { response } = require('../../index')

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM users ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getAccC: (req, res) => {
        let sql = 'SELECT * FROM users WHERE role_id = 3 ORDER BY id DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    getAccN: (req, res) => {
        let sql = 'SELECT * FROM users WHERE role_id = 4 ORDER BY id DESC'
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

    getUserByEmail: (req, res) => {
        let user_email = req.params.id;
        console.log('ID: ', user_email)
        let sql = 'SELECT * FROM users where email = ?'
        db.query(sql, user_email, (err, response) => {
            if (err) throw err
            res.json(response);
        })
    },

    addNewUser: (req, res) => {
        let data = req.body;
        // const salt = genSaltSync(10);
        // data.password = hashSync(data.password, salt);
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
        // const salt = genSaltSync(10);
        // data.password = hashSync(data.password, salt);
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
        // const salt = genSaltSync(10);
        // data.password = hashSync(data.password, salt);

        console.log('login: ', data);
        let sql = 'SELECT * FROM users where email = ? and password = ?'
        db.query(sql, [data.email, data.password], (err, response) => {
            if (err) {
                res.json({
                    status: "ERROR_IN_QUERY",
                    message: 'L???i ????ng Nh???p'
                });
            }
            else {
                // console.log(response[0].ho_ten)
                console.log(response.length)

                if (response.length > 0) {

                    const jsontoken = sign({
                        id: response[0].id,
                        email: response[0].email,
                        password: response[0].password,
                        ho_ten: response[0].ho_ten,
                        user_status_id: response[0].user_status_id,
                        role_id: response[0].role_id,
                        sdt: response[0].sdt,
                    }, "nfb32iur32ibfqfvi3vf932bg932g932", {
                        expiresIn: "360000"
                    });

                    if (response[0].user_status_id === 1) {
                        if (response[0].role_id === 1) {

                            res.json({
                                // role: 'ADMIN',
                                // data: response
                                success: 1,
                                message: "????ng nh???p th??nh c??ng",
                                accessToken: jsontoken,
                                user: response
                            });
                        } else if (response[0].role_id === 2) {
                            res.json({
                                // role: 'NHANVIEN',
                                // data: response
                                success: 2,
                                message: "????ng nh???p th??nh c??ng",
                                accessToken: jsontoken,
                                user: response
                            });
                        } else if (response[0].role_id === 3) {
                            res.json({
                                // role: 'CCSLT',
                                // data: response
                                success: 3,
                                message: "????ng nh???p th??nh c??ng",
                                accessToken: jsontoken,
                                user: response
                            });
                        } else if (response[0].role_id === 4) {
                            res.json({
                                // role: 'NNN',
                                // data: response
                                success: 4,
                                message: "????ng nh???p th??nh c??ng",
                                accessToken: jsontoken,
                                user: response
                            });
                        } else {
                            res.json({
                                status: 'ERROR_IN_LOGIN',
                                message: 'T??i kho???n ho???c m???t kh???u kh??ng ????ng!'
                            });
                        }
                    } else if (response[0].user_status_id === 2) {
                        res.json({
                            status: 'ERROR_IN_LOGIN',
                            message: 'T??i kho???n ??ang ch??? ph?? duy???t!'
                        });
                    } else {
                        res.json({
                            status: 'ERROR_IN_LOGIN',
                            message: 'T??i kho???n t???m th???i b??? kho??'
                        });
                    }

                } else {
                    res.json({
                        status: 'ERROR_IN_LOGIN',
                        message: 'T??i kho???n ho???c m???t kh???u kh??ng ????ng!'
                    });
                }
            }
        })
    }
}