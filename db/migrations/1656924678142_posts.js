/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.up = (pgm) => {
  pgm.createTable(
    'posts',
    {
      id: 'id',
      user_id: {
        type: 'int',
        notNull: true,
        references: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      text: { type: 'VARCHAR(100)', notNull: true },
      image: { type: 'JSONB', notNull: false },
      video: { type: 'JSONB', notNull: false },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: 'NOW()',
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
        default: 'NOW()',
      },
    },
    { ifNotExists: true }
  );
};

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.down = (pgm) => {
  pgm.dropTable('posts');
};
