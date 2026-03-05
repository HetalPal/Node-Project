const Blog = require("../model/Blog.model");
const Admin = require("../model/admin.model");
const fs = require("fs");

//Add
exports.addblogPage = async (req, res) => {
  try {
    if (req.cookies && req.cookies.user) {
      const Admin = require("../model/admin.model");
      const user = await Admin.findById(req.cookies.user);
      return res.render("blog/addblog", { user });
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.addblog = async (req, res) => {
  try {
    let imagePath = req.file ? "uploads/" + req.file.filename : "";
    await Blog.create({
      ...req.body,
      coverImage: imagePath
    });
    return res.redirect("/blog/viewblog");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

// View
exports.viewAllblogs = async (req, res) => {
  try {
   if (req.cookies && req.cookies.user) {
  const user = await Admin.findById(req.cookies.user);

      let filter = {};
      const searchQuery = req.query.search;
      const selectedCategory = req.query.category;

      if (searchQuery) {
        filter.$or = [
          { title: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } }
        ];
      }
      if (selectedCategory) {
        filter.category = selectedCategory;
      }

      const blogs = await Blog.find(filter).sort({ date: -1 });
      return res.render("blog/viewblog", {
        blogs,
        searchQuery,
        selectedCategory,
        user
      });
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

// Edit
exports.editblog = async (req, res) => {
  try {
    if (req.cookies && req.cookies.user) {
      const user = await Admin.findById(req.cookies.user);
      const blogData = await Blog.findById(req.params.id);
      return res.render("blog/editblog", { blogData, user });
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/blog/viewblog");
  }
};

// Update
exports.updateblog = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    let imagePath = blogData.coverImage;
    if (req.file) {
      if (blogData.coverImage) {
        try {
          fs.unlinkSync(blogData.coverImage);
        } catch (err) {
          console.log("Old image not found, skipping delete");
        }
      }
      imagePath = "uploads/" + req.file.filename;
    }

    await Blog.findByIdAndUpdate(req.params.id, {
      ...req.body,
      coverImage: imagePath
    });
    return res.redirect("/blog/viewblog");
  } catch (error) {
    console.log(error);
    return res.redirect("/blog/viewblog");
  }
};
//Delete
exports.deleteblog = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    if (blogData.coverImage && fs.existsSync(blogData.coverImage)) {
      fs.unlinkSync(blogData.coverImage);
    }
    await Blog.findByIdAndDelete(req.params.id);
    return res.redirect("/blog/viewblog");
  } catch (error) {
    console.log(error);
    return res.redirect("/blog/viewblog");
  }
};
//Single Page
exports.singleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  let user = null;

  if (req.session && req.session.adminId) {
    user = await Admin.findById(req.session.adminId);
  }
  res.render("blog/singleblog", { blog, user });
};