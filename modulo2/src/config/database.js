module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'db',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
