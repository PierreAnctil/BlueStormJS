angular.module('bluestorm.user', [
    'ngCookies'
    ])
.service('userApi', function UserApi($state, $cookies, $http, bluestorm) {
    var service = {};

    service.token = $cookies.bluestorm_token;
    service.user = null;

    service.setUser = function (user, token) {
        this.user = user;
        $http.defaults.headers.common["X-AUTH-TOKEN"] = token;

        $.cookie('bluestorm_token', token, {expires: 30});

        /*var domains = bluestorm.getDomains();

        if(domains.length==1&&domains[0]=="localhost") {
            $.cookie('bluestorm_token', token, {expires: 30});

        } else {
            angular.forEach(domains, function (domain) {
                $.cookie('bluestorm_token', token, {expires: 30, domain: domain});
            });
        }*/
    };
    service.getUser = function(url, cb) {
        if(!service.token) {
            service.user = null;
            service.askedUser = true;

            if(typeof cb == 'function') {
                cb(null, null);
            }
            return;
        }
        $http.get(url)
        .success(function (data) {
            service.askedUser = true;

            if(!data.err) {
                service.user = data.user;
            }
            if(typeof cb == 'function') {
                cb(null, data.user);
            }

        })
        .error(function () {
            if(typeof cb == 'function') {
                cb('Unknow err.');
            }
        });
    };


    service.signup = function(url, form, cb) {
        $http.post(url, form)
        .success(function (data) {
            if(data.err) return cb(data.err);
            cb(null, data.user);

        })
        .error(function () {
            cb('Unknown error.');
        });
    };


    service.signin = function(url, form, cb) {
        $http.post(url, {
            email: form.email,
            password: form.password
        })
        .success(function (data) {
            if(data.err) return cb(data.err);

            service.setUser(data.user, data.token);
            cb(null, data.user);

        })
        .error(function () {
            cb('Unknown error.');
        });
    };

    service.signout = function() {
        service.user = null;
        service.token = null;
        delete $cookies.bluestorm_token;
    };

    return service;
});
