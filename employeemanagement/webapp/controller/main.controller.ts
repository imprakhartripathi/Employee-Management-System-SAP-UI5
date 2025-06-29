import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import Input from "sap/m/Input";
import VBox from "sap/m/VBox";
import Label from "sap/m/Label";


export default class main extends Controller {
  private _employeeModel!: JSONModel;
  private _viewModel!: JSONModel;
  private _dialog!: Dialog;
  private _isEditMode: boolean = false;
  private _editIndex: number = -1;

  public onInit(): void {
  this._employeeModel = new JSONModel("model/data.json");
  this.getView()?.setModel(this._employeeModel);

  this._employeeModel.attachRequestCompleted(() => {
    this._viewModel = new JSONModel({
      selectedEmployee: null,
      selectedIndex: -1
    });
    this.getView()?.setModel(this._viewModel, "viewModel");
  });
}


  public onSelect(oEvent: any): void {
    const index = oEvent
      .getSource()
      .getSelectedItem()
      .getBindingContext()
      .getPath()
      .split("/")[2];
    const selected = this._employeeModel.getProperty(`/employees/${index}`);
    this._viewModel.setProperty("/selectedEmployee", selected);
    this._editIndex = parseInt(index);
  }

  public onAdd(): void {
    this._isEditMode = false;
    this._openDialog({});
  }

  public onEdit(): void {
    const selected = this._viewModel.getProperty("/selectedEmployee");
    if (selected) {
      this._isEditMode = true;
      this._openDialog(selected);
    }
  }

  public onDelete(): void {
    if (this._editIndex >= 0) {
      const modelData = this._employeeModel.getData();
      modelData.employees.splice(this._editIndex, 1);
      this._employeeModel.setData(modelData);

      this._viewModel.setProperty("/selectedEmployee", null);
    }
  }

  private _openDialog(data: any): void {
    const nameInput = new Input({ value: data.Name || "" });
    const mobileInput = new Input({ value: data.MobileNumber || "" });
    const emailInput = new Input({ value: data.EmailID || "" });
    const skillsInput = new Input({ value: data.Skills || "" });

    this._dialog = new Dialog({
      title: this._isEditMode ? "Edit Employee" : "Add Employee",
      content: new VBox({
        items: [
          new Label({ text: "Name" }),
          nameInput,
          new Label({ text: "Mobile Number" }),
          mobileInput,
          new Label({ text: "Email ID" }),
          emailInput,
          new Label({ text: "Skills" }),
          skillsInput,
        ],
      }),
      beginButton: new Button({
        text: this._isEditMode ? "Update" : "Add",
        press: () => {
          const newData = {
            Name: nameInput.getValue(),
            MobileNumber: mobileInput.getValue(),
            EmailID: emailInput.getValue(),
            Skills: skillsInput.getValue(),
          };

          const modelData = this._employeeModel.getData();

          if (!Array.isArray(modelData.employees)) {
            modelData.employees = [];
          }

          if (this._isEditMode && this._editIndex >= 0) {
            modelData.employees[this._editIndex] = newData;
          } else {
            modelData.employees.push(newData);
          }

          this._employeeModel.setData(modelData);
          this._viewModel.setProperty("/selectedEmployee", null);
          this._editIndex = -1;
          this._dialog.close();

          this._dialog.close();
        },
      }),
      endButton: new Button({
        text: "Cancel",
        press: () => this._dialog.close(),
      }),
      afterClose: () => this._dialog.destroy(),
    });

    this._dialog.open();
  }
}
