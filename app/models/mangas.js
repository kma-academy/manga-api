const pool = require('../models/database');
const utils = require('../utils/mangas');
exports.getAll = async function (page, limit) {
    const rawMangas = await pool.queryAsync(`SELECT id, name,
      slug, other_name, getCategoriesFromIdManga(id) AS categories,
      getTranslatorGroupsFromIdManga(id) AS translator_groups,
      description, released, createAt, updateAt FROM mangas LIMIT ? OFFSET ?`, [limit, (page - 1) * limit])
    const mangas = rawMangas.map(function (manga) {
        manga.categories = utils.parseCategories(manga.categories);
        manga.translator_groups = utils.parseTranslatorGroups(manga.translator_groups);
        return manga;
    });
    return mangas;
}

exports.getOne = async function (id) {
    const rawMangas = await pool.queryAsync(`SELECT id, name,
    slug, other_name, getCategoriesFromIdManga(id) AS categories,
    getTranslatorGroupsFromIdManga(id) AS translator_groups,
    description, released, createAt, updateAt FROM mangas WHERE id = ? LIMIT 1`, [id]);
    if (rawMangas.length == 0) throw Error('Cannot find manga');
    const manga = rawMangas[0];
    manga.categories = utils.parseCategories(manga.categories);
    manga.translator_groups = utils.parseTranslatorGroups(manga.translator_groups);
    return manga;
}