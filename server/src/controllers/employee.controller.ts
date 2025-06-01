import { Request, Response } from "express";
import { Employee } from "../mongodb/schematics/employee";

// CREATE
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ BY ID
export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
