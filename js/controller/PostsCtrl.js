app.controller('PostsCtrl',['$scope', '$rootScope', 'CategoriesFactory', 'PostsFactory', '$routeParams', function($scope, $rootScope, CategoriesFactory, PostsFactory, $routeParams) {
    $rootScope.loading = true;
    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;

    PostsFactory.all($scope.p).then((data) => {
        $scope.posts = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;
    }, (data) => {
        alert(data);
    });


    CategoriesFactory.allCat().then((data) => {
        $scope.categories = data.art;
    }, (data) => {
        alert(data);
    });


}]);