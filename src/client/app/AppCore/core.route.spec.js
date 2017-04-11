/* jshint -W117, -W030 */
describe('core', function() {
    describe('state', function() {
        var views = {
            four0four: 'app/Pages/404/404.html'
        };

        beforeEach(function() {
            module('app.core');
            bard.inject('$location', '$rootScope', '$state', '$templateCache');
            $templateCache.put(views.core, '');
        });

        it('should map /404 route to 404 View template', function() {
            expect($state.get('404').templateUrl).to.equal(views.four0four);
        });

        it('of Home should work with $state.go', function() {
            $state.go('404');
            $rootScope.$apply();
            expect($state.is('404'));
        });

        it('should route /invalid to the otherwise (404) route', function() {
            $location.path('/invalid');
            $rootScope.$apply();
            console.log('TEMPLATE URL IS', $state.current.templateUrl);
            expect($state.current.templateUrl).to.equal(views.four0four);
        });
    });
});
