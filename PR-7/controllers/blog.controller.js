const Blog = require("../model/Blog.model");
const Admin = require("../model/admin.model");
const fs = require("fs");

//Add
exports.addblogPage = async (req, res) => {
  try {
    // authentication now uses passport/session instead of manual cookies
    if (req.isAuthenticated && req.isAuthenticated()) {
      // req.user is populated by passport
      const user = req.user;
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
    if (req.isAuthenticated && req.isAuthenticated()) {
      const user = req.user;

      let filter = {};
      const search = req.query.search;
      const category = req.query.category;
      const sort = req.query.sort;

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }
      if (category) {
        filter.category = category;
      }

      let sortOrder = { date: -1 };
      if (sort === 'new') {
        sortOrder = { date: -1 };
      } else if (sort === 'old') {
        sortOrder = { date: 1 };
      } else if (sort === 'az') {
        sortOrder = { title: 1 };
      }

      const blogs = await Blog.find(filter).sort(sortOrder);
      return res.render("blog/viewblog", {
        blogs,
        search,
        category,
        sort,
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
    if (req.isAuthenticated && req.isAuthenticated()) {
      const user = req.user;
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