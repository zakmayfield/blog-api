/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {
      body: 'a very easy to understand tutorial for how to console log',
      post_id: 1,
      user_id: 2
    },
    {
      body: 'i found it hard to follow',
      post_id: 1,
      user_id: 3
    },
    {
      body: 'You are right, everyone should know how to jumpstart a car',
      post_id: 2,
      user_id: 1
    },
    {
      body: 'Coffee is God',
      post_id: 3,
      user_id: 3
    },
    {
      body: 'What a terrible post',
      post_id: 6,
      user_id: 4
    },
  ]);
};
