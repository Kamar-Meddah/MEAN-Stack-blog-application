app.controller('UserCtrl', ['$scope', '$rootScope', 'UserFactory', 'EzAlert', '$location',function($scope, $rootScope, UserFactory, EzAlert, $location) {
    UserFactory.logged().then((data) => {
        if (data === false) {
            $location.path('err/error/404');
            $rootScope.dat = false;
            throw ('acces interdit');

        } else {
            $rootScope.dat = true;
            UserFactory.getId().then((data) => {
                $scope.id = data.id;

            });
        }
    });

    $rootScope.decon = () => {
        UserFactory.logout().then((data) => {
            EzAlert.success(data);
            $location.path('/');
        }, (data) => {
            EzAlert.error(data);
        });
    }

    $scope.usernameChange = () => {
        UserFactory.checkPass($scope.id, $scope.password).then((data) => {
            if (data !== false) {
                UserFactory.usernameChange($scope.id, $scope.username).then((data) => {
                    EzAlert.success(data);
                    $scope.password = '';
                    $scope.username = '';
                });
            } else {
                EzAlert.error('Mot de passe incorrect');
            }
        }, (data) => {
            EzAlert.error(data);
        })
    }

    $scope.passChange = () => {
        UserFactory.checkPass($scope.id, $scope.password).then((data) => {
            if (data !== false) {
                UserFactory.passChange($scope.id, $scope.new_pass).then((data) => {
                    EzAlert.success(data);
                    $scope.password = '';
                    $scope.new_pass = '';
                });
            } else {
                EzAlert.error('Mot de passe incorrect');
            }
        }, (data) => {
            EzAlert.error(data);
        })
    }

}]);