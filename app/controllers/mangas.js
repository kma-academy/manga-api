const Mangas = require('../models/mangas');
exports.getAll = async function (req, res) {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page < 1 ? 1 : page);
    limit = parseInt(limit <= 0 ? 10 : limit);
    try {
        const mangas = await Mangas.getAll(page, limit);
        res.send(mangas)

    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.getOne = async function (req, res) {
    let id = parseInt(req.params.id);
    try {
        const manga = await Mangas.getOne(id);
        res.send(manga)

    } catch (error) {
        res.send({ error: error.message })
    }
}