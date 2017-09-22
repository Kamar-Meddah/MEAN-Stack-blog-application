    app.filter('contenu', function() {
        return function(input) {
            return input.contenu.slice( 0, 100 )+'<br>'+ input.contenu.slice( 100, 200 )+ " ...<br>" + '<a href="#!/category=' + input.categorie[0].titre + '/post=' + input.titre + '/' + input._id + '">Voir la suite</a>';
        }
    })