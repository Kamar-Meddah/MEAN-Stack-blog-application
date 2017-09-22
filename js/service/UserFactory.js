app.factory('UserFactory', ['$http', '$q',function($http, $q) {
    userFactory ={
    logged: () =>{
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.logged' }).then((response) => {
            deferred.resolve(response.data);
        }, () => {});
        return deferred.promise;
    },

    checkPass: (id, pass) => {
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.passwordCheck', password: pass, 'id': id }).then((response) => {
            deferred.resolve(response.data);
        }, () => {
            deferred.reject('Impossible de verifié votre infos , merci de rechager la page');
        });
        return deferred.promise;
    },


    connect :(username, passsword) =>{
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.login', username: username, password: passsword }).then((response) => {
            deferred.resolve(response.data);
        }, () => {
            deferred.reject('username ou password erroné');
        });
        return deferred.promise;
    },

    logout: () =>{
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.logout' }).then(() => {
            deferred.resolve('vous etes deconnecter');
        }, () => {
            deferred.reject('pas de cnx');
        });
        return deferred.promise;
    },

    usernameChange :(id, username)=> {
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.usernameChange', 'id': id, 'username': username }).then(() => {
            deferred.resolve('Votre nom d\'utilisateur a été changé');
        });
        return deferred.promise;
    },

    passChange: (id, pass) =>{
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.passwordChange', 'id': id, 'password': pass }).then(() => {
            deferred.resolve('Votre mot de passe a été changé');
        });
        return deferred.promise;
    },

   getId: ()=> {
        let deferred = $q.defer();
        $http.post('/', { request: 'Users.getUserId' }).then((response) => {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }
};
return userFactory;
}]);