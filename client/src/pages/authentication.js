import APP_CONSTANTS from '../constants/appConstants'

class Authentication {
    constructor() {

    }

    isAuthentication() {
        const token = localStorage.getItem('user')
        return token
    }
}

const authentication = new Authentication()
export { authentication }