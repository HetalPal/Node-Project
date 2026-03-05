const Admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");   

// Add Page
exports.addAdminPage = (req, res) => {
  res.render("admin/addAdmin");
};

// Insert Admin (Password Hash)
exports.insertAdmin = async (req, res) => {
  try {
    let imagePath = "";

    if (req.file) {
      imagePath = "/uploads/" + req.file.filename;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await Admin.create({
      ...req.body,
      password: hashedPassword,
      profileImage: imagePath
    });

    res.redirect("/admin/view-admin");

  } catch (err) {
    console.log(err);
    res.send("Error inserting admin");
  }
};


// View Admin
exports.viewAdmin = async (req, res) => {
  try {
    const { search, sort, gender } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
      filter.$or = [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } }
      ];
    }

    if (gender && gender.trim() !== "") {
      filter.gender = gender;
    }

    let query = Admin.find(filter);

    if (sort === "new") {
      query = query.sort({ _id: -1 });
    } 
    else if (sort === "old") {
      query = query.sort({ _id: 1 });
    } 
    else if (sort === "az") {
      query = query.sort({ firstname: 1 });
    }

    const admins = await query;

   res.render("admin/viewAdmin", {
   admins,
   search,
   sort,
   gender
});

  } catch (err) {
    console.log(err);
    res.send("Error loading admins");
  }
};


// View Single
exports.singleAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.render("admin/single", { admin });
};


// Edit Page
exports.editAdminPage = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.render("admin/editAdmin", { admin });  
  } catch (err) {
    console.log(err);
    res.send("Error loading edit page");
  }
};


// Update Admin 
exports.updateAdmin = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If password field filled then hash it
    if (req.body.password && req.body.password.trim() !== "") {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete updateData.password; 
    }

    if (req.file) {
      updateData.profileImage = "/uploads/" + req.file.filename;
    }

    await Admin.findByIdAndUpdate(req.params.id, updateData);

    res.redirect("/admin/view-admin");

  } catch (err) {
    console.log(err);
    res.send("Error updating admin");
  }
};


// Delete
exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.redirect("/admin/view-admin");
    }

    if (admin.profileImage) {
      const imagePath = path.join(__dirname, "../uploads", admin.profileImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Admin.findByIdAndDelete(id);
    return res.redirect("/admin/view-admin");

  } catch (error) {
    console.log(error);
    return res.redirect("/admin/view-admin");
  }
};