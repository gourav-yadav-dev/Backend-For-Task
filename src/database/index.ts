import { Student } from './models/Student.js';
import { Subject } from './models/Subject.js';
import { Mark } from './models/Mark.js';
import { User } from './models/User.js';

Student.hasMany(Mark, { foreignKey: 'studentId', as: 'marks' });
Mark.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

Subject.hasMany(Mark, { foreignKey: 'subjectId', as: 'marks' });
Mark.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

export { sequelize } from '../config/database.js';
export { Student, Subject, Mark, User };
