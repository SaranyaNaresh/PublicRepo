/**
 * Created by Sony on 3/13/2017.
 */
'use strict';

(function () {
    var accountTypeApp = angular.module("accountTypeApp");

    var AccountTypeController = function ($scope, $http)
    {
        $scope.working = 'Angular is Working';
        //common error function
        var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function

        //get all persone
        var onAccountTypeGetCompleted = function(response){
            $scope.types = response.data;
            console.log($scope.types);
        }


        var refresh = function(){
            $http.get('/account')
                .then(onAccountTypeGetCompleted, onError);
            console.log('Response received...');
        }

        refresh();
        //end get all persons

        //get persons by Id
        var onGetByIdCompleted = function(response){
            $scope.types = response.data;
            console.log(response.data);
        };

        $scope.searchAccountTypeById = function(id){
            $http.get('/account' + id)
                .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get person by Id

        //add new person
        var onAddAccountTypeCompleted = function(response){
            $scope.types = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addAccountType = function(types){
            $http.post('account/addAccountType/', types)
                .then(onAddAccountTypeCompleted, onError);
            console.log(types);
        };
        //end add new person address

        //delete person address
        $scope.deleteAddress = function(id){
            $http.delete('account/deleteAccountType/' + id)
                .then(onAccountTypeDeleteCompleted,  onError);
            console.log(id);
        };

        var onAccountTypeDeleteCompleted = function(response){
            $scope.types = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete person address

        //update person address
        $scope.updateAccountType = function(types){
            $http.put("account/updateAccountType",account)
                .then(onUpdateAccountTypeCompleted, onError);
            console.log(person);
        };

        var onUpdateAccountTypeCompleted = function(response){
            $scope.types = null;
            console.log(response.data);
            refresh();
        };
        //end update person address
    }
    accountTypeApp.controller('accountTypeCtrl', accountTypeCtrl);
}());