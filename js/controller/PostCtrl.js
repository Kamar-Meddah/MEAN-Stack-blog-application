app.controller('PostCtrl', ['$scope','$ngConfirm','CommentsFactory','CategoriesFactory','UserFactory','ImagesFactory','$rootScope','PostsFactory','$routeParams','EzAlert','$filter',function($scope, $ngConfirm, CommentsFactory, CategoriesFactory, UserFactory, ImagesFactory, $rootScope, PostsFactory, $routeParams, EzAlert, $filter) {
    
    $rootScope.loading = true;
    $scope.load = true;

    UserFactory.logged().then((data) => {
        if (data === false) {
            $rootScope.dat = false;
        } else {
            $rootScope.dat = true;
        }
    });

    PostsFactory.find($routeParams.postId, $routeParams.post).then((data) => {
        $rootScope.loading = false;
        $scope.post = data;
    });

    ImagesFactory.find($routeParams.postId).then((data) => {
        $scope.images = data;
    })

    CategoriesFactory.allCat().then((data) => {
        $scope.categories = data.art;
    }, (data) => {});

    CommentsFactory.find($routeParams.postId).then((data) => {
        $scope.comments = data;
        $scope.select = "-date";
        $scope.load = false;
    });

    $scope.commenter = () => {
        CommentsFactory.commenter($routeParams.postId, $scope.name, $scope.comment).then((data) => {
            EzAlert.success(data);
            $scope.comments.push({ 'name': $scope.name, 'content': $scope.comment, 'date': $filter('date')(Date.now(), 'yyyy-MM-d H:mm:ss') });
            $scope.name = '';
            $scope.comment = '';
        }, (data) => {
            EzAlert.error(data);
        });
    }

    $scope.delete = (id, index) => {
        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer ce commentaire ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button) {
                        CommentsFactory.delete(id).then((data) => {
                            $scope.comments.splice(index, 1);
                            EzAlert.success(data);
                        }, (data) => {
                            EzAlert.error(data);
                        });
                    }
                },
                Non: {
                    text: 'Non',
                    btnClass: 'btn-orange',
                    action: function() {}
                }
            }
        });
    }
}]);