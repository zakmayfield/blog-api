/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (user) => {
      user.increments();

      user.string('username').notNullable().unique();
      user.string('email').notNullable().unique();
    })
    .createTable('posts', (post) => {
      post.increments('id').primary();

      post.string('title').notNullable();
      post.string('body').notNullable();
      post.datetime('createdAt').defaultTo(knex.fn.now());

      post
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    })
    .createTable('comments', (comment) => {
      comment.increments('id').primary();

      comment.string('body').notNullable();
      comment.datetime('createdAt').defaultTo(knex.fn.now());

      comment
        .integer('post_id')
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE');

      comment
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('comments');
  await knex.schema.dropTableIfExists('posts');
  await knex.schema.dropTableIfExists('users');
};
