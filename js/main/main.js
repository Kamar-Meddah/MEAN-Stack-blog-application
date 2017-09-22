let app = angular.module('blog-v3', ['ngRoute', 'ngSanitize', 'ez.alert', 'ui.tinymce', 'cp.ngConfirm','yaru22.angular-timeago']);

app.config(($routeProvider) => {
    $routeProvider

        .when('/:page/', {
            templateUrl: 'view/posts/postsHome.html',
            controller: 'PostsCtrl'
        })
        .when('/category=:categorie :category_id/:page/', {
            templateUrl: 'view/posts/postsByCategorie.html',
            controller: 'PostCategorieCtrl'
        })
        .when('/category=:categorie/post=:post/:postId/', {
            templateUrl: 'view/posts/postsShow.html',
            controller: 'PostCtrl'
        })
        .when('/search/:post/:page/', {
            templateUrl: 'view/posts/postsSearch.html',
            controller: 'PostsSearchCtrl'
        })
        .when('/users/login/', {
            templateUrl: 'view/users/login.html',
            controller: 'UsersCtrl'
        })
        .when('/admin/home/', {
            templateUrl: 'view/admin/adminHome.html'
        })
        .when('/admin/categories/:page/', {
            templateUrl: 'view/admin/categories/adminCategories.html',
            controller: 'CategoriesCtrl'
        })
        .when('/admin/categories/edit/:cat/:catid/', {
            templateUrl: 'view/admin/categories/categoriesEdit.html',
            controller: 'CategoriesEditCtrl'
        })
        .when('/admin/categories/edit/add/', {
            templateUrl: 'view/admin/categories/categoriesAdd.html',
            controller: 'CategoriesEditCtrl'
        })
        .when('/admin/posts/:page/', {
            templateUrl: 'view/admin/posts/adminPosts.html',
            controller: 'AdminPostsCtrl'
        })
        .when('/admin/posts/edit/:pos/:posid/', {
            templateUrl: 'view/admin/posts/postsEdit.html',
            controller: 'AdminPostsEditCtrl'
        })
        .when('/admin/posts/edit/add/', {
            templateUrl: 'view/admin/posts/postsAdd.html',
            controller: 'AdminPostsEditCtrl'
        })
        .when('/admin/user/edit/password/', {
            templateUrl: 'view/admin/user/passwordEdit.html',
            controller: 'UserCtrl'
        })
        .when('/admin/user/edit/username/', {
            templateUrl: 'view/admin/user/usernameEdit.html',
            controller: 'UserCtrl'
        })
        .when('/', {
            redirectTo:'/1/'
        })
        .when('/err/error/404/', {
            templateUrl: 'view/error.html'
        })
        .otherwise({
            redirectTo: '/err/error/404/'
        });
})