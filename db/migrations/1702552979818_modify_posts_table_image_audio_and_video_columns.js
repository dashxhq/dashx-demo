/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    UPDATE posts
    SET image = NULL, audio = NULL, video = NULL;
  `);

  pgm.alterColumn('posts', 'image', { type: 'string', notNull: false });
  pgm.alterColumn('posts', 'audio', { type: 'string', notNull: false });
  pgm.alterColumn('posts', 'video', { type: 'string', notNull: false });
};

exports.down = pgm => {
  pgm.alterColumn('posts', 'image', { type: 'JSONB', notNull: false });
  pgm.alterColumn('posts', 'audio', { type: 'JSONB', notNull: false });
  pgm.alterColumn('posts', 'video', { type: 'JSONB', notNull: false });
};
