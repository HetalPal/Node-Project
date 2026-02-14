const Movie = require('../model/movie.model');
const fs = require('fs');
const path = require('path');

exports.getMovie = async (req, res) => {
    const movie = await Movie.find();
    res.render('index', { movie });
};

exports.addMoviePage = (req, res) => {
    res.render('add');   
};

exports.addMovie = async (req, res) => {
    const imagePath = req.file ? "uploads/" + req.file.filename : "";

    await Movie.create({
        title: req.body.title,
        language: req.body.language,
        category: req.body.category,
        date: req.body.date,
        rate: req.body.rate,
        time: req.body.time,
        image: imagePath
    });

    res.redirect('/');
};

exports.editMoviePage = async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        console.log("Movie not found");
        return res.redirect('/');
    }

    res.render('edit', { movie });
};


// 🔹 Update Movie
exports.updateMovie = async (req, res) => {

    let movie = await Movie.findById(req.params.id);

    if (!movie) {
        console.log("Movie Not Found");
        return res.redirect('/');
    }

    let imagePath = movie.image || "";

    if (req.file) {

        if (movie.image !== "") {
            let oldPath = path.join(__dirname, "..", movie.image);
            try {
                fs.unlinkSync(oldPath);
            } catch (err) {
                console.log("Old image missing");
            }
        }

        imagePath = `uploads/${req.file.filename}`;
    }

    await Movie.findByIdAndUpdate(req.params.id, {
        ...req.body,
        image: imagePath
    });

    res.redirect('/');
};


// 🔹 Delete Movie
exports.deleteMovie = async (req, res) => {

    const id = req.params.id;
    let movie = await Movie.findById(id);

    if (!movie) {
        console.log("Movie not Found");
        return res.redirect('/');
    }

    if (movie.image !== "") {
        let imagePath = path.join(__dirname, "..", movie.image);
        try {
            fs.unlinkSync(imagePath);
        } catch (err) {
            console.log("Image not found");
        }
    }

    await Movie.findByIdAndDelete(id);
    res.redirect('/');
};