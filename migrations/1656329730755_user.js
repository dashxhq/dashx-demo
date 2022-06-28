/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.up = (pgm) => {
  pgm.createTable(
    'users',
    {
      id: 'id',
      first_name: { type: 'VARCHAR(100)', notNull: true },
      last_name: { type: 'VARCHAR(100)', notNull: true },
      email: { type: 'VARCHAR(100)', notNull: true, unique: true },
      password: { type: 'VARCHAR(100)' },
    },
    { ifNotExists: true }
  );
};

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.down = (pgm) => {
  pgm.dropTable('users', { ifExists: true });
};
