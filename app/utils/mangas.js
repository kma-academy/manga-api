exports.parseCategories = function (str) {
    const categories = [];
    if (!!str) {
        str.split(',').forEach(category => {
            const [id, slug, name] = category.split('|');
            categories.push({ id, slug, name });
        });
    }
    return categories;
}

exports.parseTranslatorGroups = function (str) {
    const translatorGroups = [];
    if (!!str) {
        str.split(',').forEach(translatorGroup => {
            const [id, name] = translatorGroup.split('|');
            translatorGroups.push({ id, name });
        });
    }
    return translatorGroups;
}