/* jshint -W117, -W030 */
describe('dashboard routes', function () {
    describe('state', function () {
        var view = 'app/Pages/Home/Home.html';

        beforeEach(function() {
            module('app.home', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state Home to url / ', function() {
            expect($state.href('home', {})).to.equal('/');
        });

        it('should map /Home route to Home View template', function () {
            expect($state.get('home').templateUrl).to.equal(view);
        });

        it('of Home should work with $state.go', function () {
            $state.go('home');
            $rootScope.$apply();
            expect($state.is('home'));
        });
    });
});
