import axios from 'axios';

class $http {
  constructor() {

    this.instance = axios.create({
      baseURL: `https://admin.thrivelab.com/secret/api`,
      
    });
  }

  get loggedInUrl () {
    return 'https://admin.thrivelab.com/patient/api'
  }

  intercept() {
    // this.instance.interceptors.response.use(undefined, function (err) {
    //   return new Promise(function (resolve, reject) {
    //     if (err.response.status === 401) {
    //       // if you ever get an unauthorized, logout the user
    //       _$store.dispatch('AUTH_LOGOUT', true)
    //       // you can also redirect to /login if needed !
    //     }
    //     throw err;
    //   });
    // });
  }
}

export default new $http();