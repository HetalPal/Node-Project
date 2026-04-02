const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.model');
const Manager = require('../model/manager.model');
const Employee = require('../model/employee.model');

// ADMIN
exports.verifyAdminToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ message: "Token Not Found" });
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");

        const admin = await Admin.findById(decoded.adminId);

        if (!admin || decoded.role !== "admin") {
            return res.json({ message: "Access Denied" });
        }

        req.user = admin;
        next();

    } catch (error) {
        return res.json({ message: "Invalid Token" });
    }
};

// MANAGER
exports.verifyManagerToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ message: "Token Not Found" });
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");

        const manager = await Manager.findById(decoded.managerId);

        if (!manager || decoded.role !== "manager") {
            return res.json({ message: "Access Denied" });
        }

        req.user = manager;
        next();

    } catch (error) {
        return res.json({ message: "Invalid Token" });
    }
};

// EMPLOYEE
exports.verifyEmployeeToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ message: "Token Not Found" });
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");

        const employee = await Employee.findById(decoded.employeeId);

        if (!employee || decoded.role !== "employee") {
            return res.json({ message: "Access Denied" });
        }

        req.user = employee;
        next();

    } catch (error) {
        return res.json({ message: "Invalid Token" });
    }
};

// ALL ROLES 
exports.verifyAllRoles = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ message: "Token Not Found" });
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");

        let user = null;

        if (decoded.role === "admin") {
            user = await Admin.findById(decoded.adminId);
        } else if (decoded.role === "manager") {
            user = await Manager.findById(decoded.managerId);
        } else if (decoded.role === "employee") {
            user = await Employee.findById(decoded.employeeId);
        }

        if (!user) {
            return res.json({ message: "Access Denied" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.json({ message: "Invalid Token" });
    }
};