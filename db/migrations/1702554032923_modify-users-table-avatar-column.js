/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    UPDATE users
    SET avatar = NULL;
  `);

  pgm.alterColumn('users', 'avatar', { type: 'string', notNull: false });
};

exports.down = pgm => {
  pgm.alterColumn('users', 'avatar', { type: 'JSONB', notNull: false });
};
