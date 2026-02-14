const express = require('express');
const router = express.Router();
const movieController = require('../controller/movie.controller');
const upload = require('../middleware/uploadImage');


router.get('/', movieController.getMovie);
router.get('/add-movie', movieController.addMoviePage);
router.post('/add-movie', upload.single('image'), movieController.addMovie);

router.get('/edit-movie/:id', movieController.editMoviePage);
router.post('/update-movie/:id', upload.single('image'), movieController.updateMovie);

router.get('/delete-movie/:id', movieController.deleteMovie);

module.exports = router;