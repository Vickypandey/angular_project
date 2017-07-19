'use strict';

angular.module('myApp.services', [])

    .factory('authFact', function() {
        var authFact = {};

        authFact.setAccessToken = function(accessToken) {
            authFact.authToken = accessToken;
        };

        authFact.getAccessToken = function() {
            return authFact.authToken;

        }


        return authFact;
    })

    .factory('dataservice', function() {

        var data = {};

        return {

            setData: function(datas) {
                data = datas;

            },
            getData: function() {
                return data;
            }
        }

    })

    .factory('companydetailService', function() {
        // Might use a resource here that returns a JSON array
        var companydetail = {

            data1: {
                id: 0,
                Name: 'VMware Pvt Ltd',
                industry: 'Information Technology',
                subIndustry: 'It Software, QA Testing',
                companyType: "India's top 500",
                levelOfOffice: 'Head Office',
                location: 'Noida/Uttar Pradesh-201303',
                contact: "8003374567",
                email: 'vmware@vmware.com'
            },
            data2: {
                id: 1,
                Name: 'Google India Pvt Ltd.',
                industry: 'Information Technology',
                subIndustry: 'It Software, QA Testing',
                companyType: "India's top 500",
                levelOfOffice: 'Head Office',
                location: 'Gurgaon/Haryana-201479',
                contact: "014678776868",
                email: 'google@google.com'
            },
            data3: {
                id: 2,
                Name: 'Microsoft Pvt Ltd',
                industry: 'Information Technology',
                subIndustry: 'It Software, QA Testing',
                companyType: "India's top 500",
                levelOfOffice: 'Head Office',
                location: 'Bangalore/Karnataka-802303',
                contact: "8003763573",
                email: 'microsoft@microsoft.com'
            },
            data4: {
                id: 3,
                Name: 'Infosys Pvt Ltd.',
                industry: 'Information Technology',
                subIndustry: 'It Software, QA Testing',
                companyType: "India's top 500",
                levelOfOffice: 'Head Office',
                location: 'Bangalore/Karnataka-201303',
                contact: "9815646546",
                email: 'infosys@infosys.com'
            },
            data5: {
                id: 4,
                Name: 'Oracle India Pvt Ltd',
                industry: 'Information Technology',
                subIndustry: 'It Software, QA Testing',
                companyType: "India's top 500",
                levelOfOffice: 'Head Office',
                location: 'Hyderabad/Andhra Pradesh-201303',
                contact: "7007774209",
                email: 'oracle@oracle.com'
            }
        };

        return {

            setCompanydetail: function(compdetail) {
                companydetail = compdetail;
            },
            getCompanydetail: function() {
                return companydetail;
            }
        };
    })



    .service('googleService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
        var clientId = '555377276670-qsol7u1l6lubv7ml6r6m7mmkt8gcmaek.apps.googleusercontent.com',
            apiKey = 'AIzaSyBbAQkfKKEpaqKlnI6q79cJUIkOr1-52g4',
            scopes = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
            domain = '{OPTIONAL DOMAIN}',
            deferred = $q.defer();

        this.login = function() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false,
                hd: domain
            }, this.handleAuthResult);

            return deferred.promise;
        }

        this.handleClientLoad = function() {
            gapi.client.setApiKey(apiKey);
            gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        this.checkAuth = function() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: true,
                hd: domain
            }, this.handleAuthResult);
        };

        this.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                var data = {};
                gapi.client.load('oauth2', 'v2', function() {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function(resp) {
                        data.email = resp.email;
                    });
                });
                deferred.resolve(data);
            } else {
                deferred.reject('error');
            }
        };

        this.handleAuthClick = function(event) {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false,
                hd: domain
            }, this.handleAuthResult);
            return false;
        };

    }]);