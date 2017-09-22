app.controller('CategoriesEditCtrl', ['$scope', '$routeParams','CategoriesFactory', 'EzAlert', '$location',function($scope, $routeParams,CategoriesFactory, EzAlert, $location) {

    $scope.insert = () => {
        CategoriesFactory.insert($scope.ins).then((data) => {
            EzAlert.success(data);
            $location.path('/admin/categories/1');
        },(data)=>{
            EzAlert.error(data);
        });
    }
    $scope.ed = $routeParams.cat;

    $scope.edit = () => {
        CategoriesFactory.edit($scope.ed,$routeParams.catid).then((data) => {
            EzAlert.success(data);
            $location.path('/admin/categories/1');
        },(data)=>{
            EzAlert.error(data);
        });
    }

}]);