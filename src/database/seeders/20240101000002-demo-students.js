/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('students', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        created_at: now,
        updated_at: now,
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        created_at: now,
        updated_at: now,
      },
      {
        first_name: 'Michael',
        last_name: 'Johnson',
        email: 'michael@example.com',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('students', null, {});
  },
};
