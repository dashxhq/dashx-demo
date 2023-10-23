/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  // add new column audio right after column image and before video

  // create new table to copy posts table data
  pgm.createTable(
    'new_posts',
    {
      id: 'id',
      user_id: {
        type: 'int',
        notNull: true,
        references: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      text: { type: 'text', notNull: true },
      image: { type: 'JSONB', notNull: false },
      audio: { type: 'JSONB', notNull: false },
      video: { type: 'JSONB', notNull: false },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('NOW()'),
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('NOW()'),
      },
    },
    { ifNotExists: true }
  );

  // copy posts table data to new_posts table
  pgm.sql(`
    INSERT INTO new_posts (id, user_id, text, image, audio, video, created_at, updated_at)
    SELECT id, user_id, text, image, NULL as audio, video, created_at, updated_at
    FROM posts;
  `);

  // drop post_id foreign key from bookmarks
  pgm.dropConstraint('bookmarks', 'bookmarks_post_id_fkey');

  // add post_id foreign key to bookmarks
  pgm.addConstraint('bookmarks', 'bookmarks_post_id_fkey', {
    foreignKeys: {
      columns: 'post_id',
      references: 'new_posts(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });

  // drop posts table
  pgm.dropTable('posts');

  // rename table new_posts to posts
  pgm.renameTable('new_posts', 'posts');
};

exports.down = pgm => {
  // drop column audio
  pgm.dropColumns('posts', ['audio']);
};
