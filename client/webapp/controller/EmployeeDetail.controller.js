sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("your.namespace.controller.EmployeeDetail", {
    onInit: function () {
      const router = sap.ui.core.UIComponent.getRouterFor(this);
      router.getRoute("employeeDetail").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      const id = oEvent.getParameter("arguments").id;
      if (id === "new") {
        const model = new JSONModel({});
        this.getView().setModel(model);
      } else {
        fetch(`http://localhost:4200/employees/${id}`)
          .then(res => res.json())
          .then(data => this.getView().setModel(new JSONModel(data)));
      }
    },

    onSave: function () {
      const data = this.getView().getModel().getData();
      const method = data._id ? "PUT" : "POST";
      const url = data._id ? `http://localhost:4200/employees/${data._id}` : `http://localhost:4200/employees`;

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(() => {
          MessageToast.show("Saved successfully");
          sap.ui.core.UIComponent.getRouterFor(this).navTo("tableView");
        });
    },

    onDelete: function () {
      const id = this.getView().getModel().getData()._id;
      if (!id) return;

      fetch(`http://localhost:4200/employees/${id}`, { method: "DELETE" })
        .then(() => {
          MessageToast.show("Deleted successfully");
          sap.ui.core.UIComponent.getRouterFor(this).navTo("tableView");
        });
    }
  });
});
