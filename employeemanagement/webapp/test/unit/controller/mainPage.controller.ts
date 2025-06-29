/*global QUnit*/
import Controller from "employeemanagement/controller/main.controller";

QUnit.module("main Controller");

QUnit.test("I should test the main controller", function (assert: Assert) {
	const oAppController = new Controller("main");
	oAppController.onInit();
	assert.ok(oAppController);
});