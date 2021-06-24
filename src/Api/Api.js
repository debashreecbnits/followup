import base from '../Api/config';
import AsyncStorage from "@react-native-community/async-storage";

let headers1 = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const resolver = () => AsyncStorage.getItem('userToken', (err, result) => {
    if (result) {
        result = JSON.parse(result);
    }
})


class Api {

    static getApi(endPoint, token) {
        console.log(token, 'token')
        return new Promise((resolve, reject) => {
            resolver().then(() => {
                fetch(base.baseUrl + endPoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'app.com ' + token
                    }
                }).then(response => {
                    if (response.status === 200) {
                        resolve(response.json());
                    } else {
                        if (response.status === 204) {
                            resolve();
                        } else {
                            reject({ "err": "401 found" })
                        }
                    }
                }).catch(error =>  console.log(error))
            }).catch(error => console.log(error))
        })
    }

    static postApi(endPoint, data) {
        return new Promise((resolve, reject) => {
            resolver().then(() => {
                fetch(base.baseUrl + endPoint, {
                    method: 'POST',
                    headers: headers1,
                    body: data
                })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.json());
                        } else {
                            if (response.status === 204) {
                                resolve();
                            }
                            if (response.status === 400) {
                                resolve(response.json());
                            } else {
                                reject({ "err": "401 found" })
                            }
                        }
                    }).catch(error => {
                        console.log("api post catch block with error msg" + error)
                    })
            }).catch(error => {
                console.log("api-catch-error", error)

            })
        })
    };

    static postAllApi(endPoint, data, token) {
        return new Promise((resolve, reject) => {
            resolver().then(() => {

                fetch(base.baseUrl + endPoint, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'app.com ' + token
                    },
                })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.json());
                        } else {
                            if (response.status === 204) {
                                resolve();
                            }
                            if (response.status === 401) {
                                resolve(response.json());
                            } else {
                                reject({ "err": "401 found" })
                            }
                        }
                    }).catch(error => {
                        console.log("api post catch block with error msg" + error)
                    })
            }).catch(error => {
                console.log("api-catch-error", error)

            })
        })
    };

    static putApi(endPoint, data, token) {
        return new Promise((resolve, reject) => {
            resolver().then(() => {

                fetch(base.baseUrl + endPoint, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'app.com ' + token
                    },
                })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.json());
                        } else {
                            if (response.status === 204) {
                                resolve();
                            }
                            if (response.status === 401) {
                                resolve(response.json());
                            } else {
                                reject({ "err": "401 found" })
                            }
                        }
                    }).catch(error => {
                        console.log("api post catch block with error msg" + error)
                    })
            }).catch(error => {
                console.log("api-catch-error", error)

            })
        })
    };

    static postFormData(endPoint, data, token) {
        return new Promise((resolve, reject) => {
            resolver().then(() => {

                fetch(base.baseUrl + endPoint, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'app.com ' + token
                    },
                })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.json());
                        } else {
                            if (response.status === 204) {
                                resolve();
                            }
                            if (response.status === 401) {
                                resolve(response.json());
                            } else {
                                reject({ "err": "401 found" })
                            }
                        }
                    }).catch(error => {
                        console.log("api post catch block with error msg" + error)
                    })
            }).catch(error => {
                console.log("api-catch-error", error)

            })
        })
    };

    static putProfileUpdate(endPoint, data, token) {
        return new Promise((resolve, reject) => {
            resolver().then(() => {

                fetch(base.baseUrl + endPoint, {
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'app.com ' + token
                    },
                })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.json());
                        } else {
                            if (response.status === 204) {
                                resolve();
                            }
                            if (response.status === 401) {
                                resolve(response.json());
                            } else {
                                reject({ "err": "401 found" })
                            }
                        }
                    }).catch(error => {
                        console.log("api post catch block with error msg" + error)
                    })
            }).catch(error => {
                console.log("api-catch-error", error)

            })
        })
    };
}

export default Api