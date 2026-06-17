/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('subjects', [
      { name: 'Math', created_at: now, updated_at: now },
      { name: 'Science', created_at: now, updated_at: now },
      { name: 'English', created_at: now, updated_at: now },
      { name: 'History', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
