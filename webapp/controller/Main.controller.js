sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, JSONModel) {
    "use strict";

    return BaseController.extend("myapp.controller.Main", {

        sayHello: function () {
            MessageBox.show("Hello World!");
        },

        onEmployeeSelect: function (oEvent) {
            const oSelectedItem = oEvent.getParameter("listItem");
            const sPath = oSelectedItem.getBindingContext("EmployeeStatus").getPath();
            const oData = this.getView().getModel("EmployeeStatus").getProperty(sPath);

            this.getView().setModel(new JSONModel(oData));
        }
    });
});
