require('./helpers.js');
const {
    updateEmployeeWithKeyAndValue,
    destructivelyUpdateEmployeeWithKeyAndValue,
    deleteFromEmployeeByKey,
    destructivelyDeleteFromEmployeeByKey
} = require('../index.js');

describe('employees', function() {
    let employee;

    beforeEach(function() {
        employee = {
            name: 'Sam',
            streetAddress: '11 Broadway'
        };
    });

    describe('updateEmployeeWithKeyAndValue(employee, key, value)', function () {
        it('returns an employee with the original key value pairs and the new key value pair', function () {
            expect(updateEmployeeWithKeyAndValue(employee, 'streetAddress', '11 Broadway')).to.eql({
                name: 'Sam',
                streetAddress: '11 Broadway'
            });
        });

        it('it does not modify the original employee, but rather returns a clone with the new data', function () {
            const newEmployee = updateEmployeeWithKeyAndValue(employee, 'streetAddress', '11 Broadway');

            expect(newEmployee).to.not.equal(employee);
            expect(employee['streetAddress']).to.equal('11 Broadway');
        });
    });

    describe('destructivelyUpdateEmployeeWithKeyAndValue(employee, key, value)', function () {
        it('updates `employee` with the given `key` and `value` (it is destructive) and returns the entire updated employee', function () {
            expect(destructivelyUpdateEmployeeWithKeyAndValue(employee, 'streetAddress', '12 Broadway')).to.eql({
                name: 'Sam',
                streetAddress: '12 Broadway'
            });

            expect(employee).to.eql({
                name: 'Sam',
                streetAddress: '12 Broadway'
            });
        });
    });

    describe('deleteFromEmployeeByKey(employee, key)', function () {
        it('deletes `key` from a clone of employee and returns the new employee (it is non-destructive)', function () {
            let newEmployee = deleteFromEmployeeByKey(employee, 'name');

            expect(newEmployee['name']).to.equal(undefined);
            expect(typeof newEmployee).to.equal('object');
        });

        it('does not modify the original employee (it is non-destructive)', function () {
            deleteFromEmployeeByKey(employee, 'name');

            expect(employee['name']).to.equal('Sam');
        });
    });

    describe('destructivelyDeleteFromEmployeeByKey(employee, key)', function () {
        it('returns employee without the deleted key/value pair', function () {
            let newEmployee = destructivelyDeleteFromEmployeeByKey(employee, 'name');

            expect(newEmployee['name']).to.equal(undefined);
        });

        it('modifies the original employee', function () {
            let newEmployee = destructivelyDeleteFromEmployeeByKey(employee, 'name');

            expect(employee['name']).to.equal(undefined);
            expect(employee).to.equal(newEmployee);
        });
    });
});
