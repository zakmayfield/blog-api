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
    },
    {
      username: 'Sarah',
      email: 'sarah@sarah.com',
    },
    {
      username: 'Colter',
      email: 'colter@colter.com',
    },
    {
      username: 'Sam',
      email: 'sam@sam.com',
    },
  ]);
};
