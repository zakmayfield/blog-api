/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('posts').del();
  await knex('posts').insert([
    {
      title: 'How to console log',
      body: 'This is a post about how to use the console.log method',
      user_id: 1,
    },
    {
      title: 'Jump starting a car',
      body: 'If you dont know how to jumpstart a car yet, you gotta figure that out',
      user_id: 2,
    },
    {
      title: 'Coffee is good',
      body: 'Coffee is good for my soul, thats it, thats the post',
      user_id: 2,
    },
    {
      title: 'Stars are cool',
      body: 'Something about a stars post',
      user_id: 2,
    },
    {
      title: 'Flying',
      body: 'Could you imagine flying?',
      user_id: 3,
    },
    {
      title: 'Redundant title',
      body: 'Super redundant body of this post and some extra words just to fill this post out',
      user_id: 3,
    },
  ]);
};
