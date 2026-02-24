const Blog = require("../model/blog.model");

// Add Page
exports.addBlogPage = (req, res) => {
  res.render("add");
};

// Insert Blog
exports.insertBlog = async (req, res) => {
  try {
    let imagePath = "";

    if (req.file) {
      imagePath = "/uploads/" + req.file.filename;
    }

    await Blog.create({
      ...req.body,
      image: imagePath
    });

    res.redirect("/blog/view-blog");

  } catch (err) {
    console.log(err);
    res.send("Error inserting blog");
  }
};

// View Blog 
exports.viewBlog = async (req, res) => {
  try {
    const { search, sort, category } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category && category.trim() !== "") {
      filter.category = category;
    }

    let query = Blog.find(filter);

    if (sort === "new") {
      query = query.sort({ createdAt: -1 });
    } 
    else if (sort === "old") {
      query = query.sort({ createdAt: 1 });
    } 
    else if (sort === "az") {
      query = query.sort({ title: 1 });
    }

    const blogs = await query;
    const categories = await Blog.distinct("category");

    res.render("view", {
      blogs,
      search,
      sort,
      category,
      categories
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading blogs");
  }
};

// View Single
exports.singleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("single", { blog });
};

// Edit Page
exports.editBlogPage = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit", { blog });
};

// Update
exports.updateBlog = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    }
    await Blog.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/blog/view-blog");
  } catch (err) {
    console.log(err);
    res.send("Error updating blog");
  }
};

// Delete
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/blog/view-blog");
};