/* eslint-disable camelcase */

exports.shorthands = undefined

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.up = (pgm) => {
  pgm.createTable(
    'bookmarks',
    {
      id: 'id',
      user_id: {
        type: 'int',
        notNull: true,
        references: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      post_id: {
        type: 'int',
        notNull: true,
        references: 'posts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      bookmarked_at: {
        type: 'timestamp',
        default: pgm.func('NOW()'),
      },
    },
    { ifNotExists: true, constraints: { unique: ['user_id', 'post_id'] } }
  )
}

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.down = (pgm) => {
  pgm.dropTable('bookmarks', { ifExists: true })
}
