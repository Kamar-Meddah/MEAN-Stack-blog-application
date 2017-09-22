app.factory('ImagesFactory', ['$http', '$q',function($http, $q) {
    imagesFactory={

        find : (id) => {
        let deferred = $q.defer();
        $http.post('/', { request: 'Images.find', id: id }).then((response) => {
            imagesFactory.images = response.data;
            deferred.resolve(imagesFactory.images);
        }, () => {
            deferred.reject('recharger la page');
        });
        return deferred.promise;
    },
        
        delete : (id) => {
        let deferred = $q.defer();
        $http.post('/', { request: 'Images.delete', id: id }).then((response) => {
            deferred.resolve('L`\image a été bien supprimer');
        }, () => {
            deferred.reject('recharger la page');
        });
        return deferred.promise;
    }

    }
    return imagesFactory;
}]);