const router = require('express').Router();
const pool = require('../models/database');
router.get('/', async function (req, res) {
    let { page = 1, limit = 10 } = req.query;
    page = page < 1 ? 1 : page;
    limit = limit <= 0 ? 10 : limit;
    console.log((page - 1) * limit, limit);
    try {
        const rawMangas = await pool.queryAsync("SELECT `id`, `name`, slug, other_name, getCategoriesFromIdManga(id) AS `categories`, getTranslatorGroupsFromIdManga(id) AS `translator_groups`, description, released, createAt, updateAt FROM `mangas` LIMIT ? OFFSET ?", [limit, (page - 1) * limit])
        const mangas = rawMangas.map(function (manga) {
            const categories = manga.categories;
            const translatorGroups = manga.translator_groups;
            manga.categories = [];
            manga.translator_groups = [];
            if (!!categories) {
                categories.split(',').forEach(category => {
                    const [id, slug, name] = category.split('|');
                    manga.categories.push({ id, slug, name });
                });
            }

            if (!!translatorGroups) {
                translatorGroups.split(',').forEach(translatorGroup => {
                    const [id, name] = translatorGroup.split('|');
                    manga.translator_groups.push({ id, name });
                });
            }
            return manga;
        });
        res.send(mangas)

    } catch (error) {
        res.send({ error: error.message })
    }
})
module.exports = router;