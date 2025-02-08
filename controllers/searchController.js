const db = require('../config/database');

exports.searchProducts = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.render('search', { results: [], query: '' });
  }

  try {
    const searchQuery = `%${query}%`;

    const sql = `
      SELECT article, name, price, description, 'hoodies' AS category
      FROM hoodies
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
      UNION ALL
      SELECT article, name, price, description, 'jackets' AS category
      FROM jackets
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
      UNION ALL
      SELECT article, name, price, description, 'shoes' AS category
      FROM shoes
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
      UNION ALL
      SELECT article, name, price, description, 'shorts' AS category
      FROM shorts
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
      UNION ALL
      SELECT article, name, price, description, 'socks' AS category
      FROM socks
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
      UNION ALL
      SELECT article, name, price, description, 'trousers' AS category
      FROM trousers
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
      UNION ALL
      SELECT article, name, price, description, 't_shirt' AS category
      FROM t_shirt
      WHERE name LIKE ? OR description LIKE ? OR article LIKE ?
    `;

    const placeholders = Array(21).fill(searchQuery);

    const [rows] = await db.query(sql, placeholders);

    res.render('search', { results: rows, query });
  } catch (err) {
    console.error(err);
    res.render('search', { results: [], query });
  }
};
