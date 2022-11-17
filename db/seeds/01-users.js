/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      username: 'John',
      email: 'john@john.com',
      password: '123',
    },
    {
      username: 'Sarah',
      email: 'sarah@sarah.com',
      password: '123',
    },
    {
      username: 'Jurgen',
      email: 'jurgen@jurgen.com',
      password: '123',
    },
    {
      username: 'Sam',
      email: 'sam@sam.com',
      password: '123',
    },
  ]);
};
