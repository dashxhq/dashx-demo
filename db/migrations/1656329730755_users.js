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
      avatar: { type: 'JSONB' },
      email: { type: 'VARCHAR(100)', notNull: true, unique: true },
      encrypted_password: { type: 'VARCHAR(100)' },
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
};

/**
 * @type {import('node-pg-migrate/dist/types').MigrationAction}
 */
exports.down = (pgm) => {
  pgm.dropTable('users', { ifExists: true });
};
