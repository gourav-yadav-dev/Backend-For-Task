import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  },
};
