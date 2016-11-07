const pg = require('pg-promise')({/* config */});

const config = {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
};

const db = pg(config);

module.exports = {

  getTasks(req, res, next) {
    db.any('SELECT * FROM task;')
      .then((tasks) => {
        res.rows = tasks;
        next();
      })
      .catch(error => next(error));
  },

// create
  addTask(req, res, next) {
    db.one(`
      INSERT INTO task (name, desription)
      VALUES ($/name/, $/desc/)
      RETURNING *;
      `, req.body)
    .then((task) => {
      res.rows = task;
      next();
    })
    .catch(error => next(error));
  },

// destroy
  deleteTask(req, res, next) {
    req.body.tID = Number.parseInt(req.params.taskId);

    db.none(`
      DELETE FROM task
      WHERE id = $1
      `, [req.body.tID])
    .then(() => {
      next();
    })
    .catch(error => next(error));
  },

// update functions can toggle complete or update like the addTask does

};
