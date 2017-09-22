app.factory('CategoriesFactory', ['$http', '$q', '$routeParams',function($http, $q, $routeParams) {
    categoriesFactory = {

        categories: undefined,
        // recupérer tt les categories

        allCat: () => {
            let deferred = $q.defer();
            if (categoriesFactory.categories != undefined) {
                deferred.resolve(categoriesFactory.categories);
            } else {
                $http.post('/', { request: 'Categories.all' }).then((response) => {
                    categoriesFactory.categories = response.data;
                    deferred.resolve(categoriesFactory.categories);
                }, () => {
                    deferred.reject('recharger la page');
                });
            }
            return deferred.promise;
        },
        //----------
        allCatP: (page) => {
            let deferred = $q.defer();

            $http.post('/', { request: 'Categories.index', page: page }).then((response) => {
                categoriesFactory.categories = response.data;
                deferred.resolve(categoriesFactory.categories);
            }, () => {
                deferred.reject('recharger la page');

            });

            return deferred.promise;
        },

        delete: (id) => {
            let deferred = $q.defer();
            $http.post('/', { request: 'Categories.delete', id: id }).then((response) => {
                deferred.resolve(response.data.num );
            },()=>{
                deferred.reject('recharger la page');
            });
            return deferred.promise;
        },

        insert: (titre) => {
            let deferred = $q.defer();
            $http.post('/', { request: 'Categories.add', title: titre }).then(() => {
                deferred.resolve('Votre categorie a été ajouter');
            },()=>{
                deferred.reject('recharger la page pas de cnx')
            });
            return deferred.promise;
        },

        edit: (titre,id) => {
            let deferred = $q.defer();
            $http.post('/', { request: 'Categories.edit', title: titre, id:id}).then(() => {
                deferred.resolve('Votre categorie a été modifié');
            },()=>{
                deferred.reject('recharger la page pas de cnx')
            });
            return deferred.promise;
        }

    }
    return categoriesFactory;
}]);