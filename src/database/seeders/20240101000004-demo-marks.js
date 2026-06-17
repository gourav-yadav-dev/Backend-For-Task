/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('marks', [
      { student_id: 1, subject_id: 1, marks: 80.0, created_at: now, updated_at: now },
      { student_id: 1, subject_id: 2, marks: 90.0, created_at: now, updated_at: now },
      { student_id: 1, subject_id: 3, marks: 70.0, created_at: now, updated_at: now },
      { student_id: 2, subject_id: 1, marks: 85.0, created_at: now, updated_at: now },
      { student_id: 2, subject_id: 2, marks: 88.0, created_at: now, updated_at: now },
      { student_id: 3, subject_id: 1, marks: 92.0, created_at: now, updated_at: now },
      { student_id: 3, subject_id: 3, marks: 78.0, created_at: now, updated_at: now },
      { student_id: 3, subject_id: 4, marks: 95.0, created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('marks', null, {});
  },
};
