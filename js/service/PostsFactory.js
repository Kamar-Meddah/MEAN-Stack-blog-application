app.factory('PostsFactory',['$http', '$q', function($http, $q) {
    postsFactory={
    posts : false,
    categories :false,
    post : false,

    all : (page) => {
        let deferred = $q.defer();
        $http.post('/', { request: 'Articles.index', page: page }).then((response) => {
            postsFactory.posts = response.data;
            deferred.resolve(postsFactory.posts);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    },

    find : (id) => {
        let deferred = $q.defer();
        $http.post('/', { request: 'Articles.show', id: id }).then((response) => {
            postsFactory.post = response.data;
            deferred.resolve(postsFactory.post);
        }, () => {
            deferred.reject('recharger la page');
        });
        return deferred.promise;
    },

    bycategorie : (id, page) => {
        let deferred = $q.defer();

        $http.post('/', { request: 'Articles.byCategorie', category_id: id, page: page }).then((response) => {

            postsFactory.Cposts = response.data;
            deferred.resolve(postsFactory.Cposts);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    },

    searc : (req, page) => {
        let deferred = $q.defer();
        $http.post('/', { request: 'Articles.search', search: req, page: page }).then((response) => {
            postsFactory.S = response.data;
            deferred.resolve(postsFactory.S);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    },

    delete :(id)=>{
        let deferred = $q.defer();
             $http.post('/', { request: 'Articles.delete', id: id }).then(() => {
             deferred.resolve('Votre post a été bien supprimer');       
            },()=>{
                deferred.reject('Impossible de suppr l\'articles , recharger la page');
            }); 
             return deferred.promise;
    },

    add:(formData)=>{
        let deferred = $q.defer();
        $http.post('/', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }}).then((response) => {
            deferred.resolve(response.data.id);
        },()=>{
            deferred.reject('Impossible de d\'ajouter l\'articles , recharger la page');
        });
        return deferred.promise;
    },

        edit:(formData)=>{
        let deferred = $q.defer();
        $http.post('/', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }}).then((response) => {
            deferred.resolve(response.data);
        },()=>{
            deferred.reject('Impossible de d`\'editer l\'articles , recharger la page');
        });
        return deferred.promise;
    }    
}
return postsFactory;

}]);