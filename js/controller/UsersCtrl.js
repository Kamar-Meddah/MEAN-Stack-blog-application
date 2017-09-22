app.controller('UsersCtrl', ['$scope', '$rootScope','UserFactory', '$http', 'EzAlert', '$location',function($scope, $rootScope,UserFactory, $http, EzAlert, $location) {

    UserFactory.logged().then((data) => {
        if (data === true) {
            $rootScope.dat = true;
            EzAlert.warning('Vous etes déja connecter');
            $location.path('/admin/home');
        } else {
            $rootScope.dat = false;
        }
    });
    $scope.connecter = () => {
        UserFactory.connect($scope.username, $scope.password).then((data) => {
            if (data === true) {
                EzAlert.success('Bienvenu a votre administration');
                $location.path('/admin/home');
            } else {
                EzAlert.error('username ou mot de passe erroné');
            }
        },()=>{
            EzAlert.error('unable to contact the server refresh the page');
        })
    }
}]);