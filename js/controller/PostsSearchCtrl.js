app.controller('PostsSearchCtrl',['$scope', '$rootScope', '$routeParams', 'CategoriesFactory', 'PostsFactory', '$rootScope', '$location', function($scope, $rootScope, $routeParams, CategoriesFactory, PostsFactory, $rootScope, $location) {
    $rootScope.loading = true;

    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;

    PostsFactory.searc($routeParams.post, $scope.p).then((data) => {
        $scope.posts = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;
        $scope.z = $routeParams.post;
        $scope.search = $routeParams.post;
    }, () => {});

    CategoriesFactory.allCat().then((data) => {
        $scope.categories = data.art;
    }, (data) => {});
}]);