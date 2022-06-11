import React from 'react';
export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "users": {}
        }
    }

    componentDidMount() {
        this.loadDataProfile()
    }

    loadDataProfile = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/users", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.status)
            })

            .then(result => {
                console.log(result)
                this.setState({ users: result })
            })

            .catch(error => {
                console.log('error', error)
                this.logout()
            });
    }

    logout = () => {
        localStorage.removeItem("accessToken")
        this.props.onLogoutSuccess()
    }

    render() {
        return <div>
            <div>email: {this.state.users.email}</div>
            <div>password: {this.state.users.password}</div>
            <button type='button' onClick={this.logout} >Logout</button>
        </div>
    }
}