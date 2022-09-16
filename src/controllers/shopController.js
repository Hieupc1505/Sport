const axios = require("axios").default;

const lib = [
    {
        id: 1,
        name: "shopee",
        search: (keyword) =>
            `https://shopee.vn/api/v4/search/search_hint?keyword=${keyword}&search_type=0&version=1`,
    },
    {
        id: 2,
        name: "lazada",
        search: (key) => `https://tiki.vn/api/v2/search/suggestion?q=${key}`,
        list: (key) =>
            `https://www.lazada.vn/catalog/?spm=a2o4n.home.search.3.5181e182KLD0wZ&q=${key}&_keyori=ss&from=search_history`,
    },
    {
        id: 3,
        name: "tiki",
        search: (key) => `https://tiki.vn/api/v2/search/suggestion?q=${key}`,
        list: (key) => `https://tiki.vn/search?q=${key}`,
    },
];

class shopController {
    getSearch(req, res) {
        const { keyword } = req.params;

        const shopee = `https://shopee.vn/api/v4/search/search_hint?keyword=${keyword}&search_type=0&version=1`;
        const tiki = `https://tiki.vn/api/v2/search/suggestion?q=${keyword}`;
        const lazada = 2;
    }
}

module.exports = new shopController();
