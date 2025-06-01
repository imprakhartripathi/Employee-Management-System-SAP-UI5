sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "../model/models"
], function (Controller, models) {
  "use strict";

  return Controller.extend("your.namespace.controller.TableView", {
    onInit: function () {
      const model = models.createEmployeeModel();
      this.getView().setModel(model);
    },

    onSelectEmployee: function (oEvent) {
      const selectedContext = oEvent.getParameter("listItem").getBindingContext();
      const selectedData = selectedContext.getObject();
      const employeeId = selectedData._id;
      const router = sap.ui.core.UIComponent.getRouterFor(this);
      router.navTo("employeeDetail", { id: employeeId });
    },

    onCreate: function () {
      const router = sap.ui.core.UIComponent.getRouterFor(this);
      router.navTo("employeeDetail", { id: "new" });
    }
  });
});
