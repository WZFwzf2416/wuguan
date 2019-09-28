import axios from './../axios/index'

class api {
    /**
     * 登录
     * @param {username, password} options
     */
    login(options) {
        return axios.post('/admin/login', options)
    }
}

export default new api()