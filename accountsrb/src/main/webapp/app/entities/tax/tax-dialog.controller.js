(function() {
    'use strict';

    angular
        .module('accountsrbApp')
        .controller('TaxDialogController', TaxDialogController);

    TaxDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tax'];

    function TaxDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Tax) {
        var vm = this;

        vm.tax = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tax.id !== null) {
                Tax.update(vm.tax, onSaveSuccess, onSaveError);
            } else {
                Tax.save(vm.tax, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('accountsrbApp:taxUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.creationDate = false;
        vm.datePickerOpenStatus.modificationDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
