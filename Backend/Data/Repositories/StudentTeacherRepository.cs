using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class StudentTeacherRepository : IStudentTeacherRepository<StudentTeacher>
    {
        protected readonly ApplicationDbContext context;
        private DbSet<StudentTeacher> entities;
        string errorMessage = string.Empty;

        public StudentTeacherRepository(ApplicationDbContext context)
        {
            this.context = context;
            entities = context.Set<StudentTeacher>();
        }

        public async Task<List<StudentTeacher>> GetAll()
        {
            return await entities.ToListAsync();
        }

        public async Task<StudentTeacher> GetById(int studentId, int teacherId)
        {
            var entity = await entities.SingleOrDefaultAsync(s => s.StudentId == studentId && s.TeacherId == teacherId);
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            return entity;
        }

        public async Task<StudentTeacher> Insert(StudentTeacher studentTeacher)
        {
            if (studentTeacher == null) throw new ArgumentNullException("entity");

            await entities.AddAsync(studentTeacher);
            await context.SaveChangesAsync();

            return studentTeacher;
        }
        public async Task<StudentTeacher> Update(StudentTeacher studentTeacher)
        {
            if (studentTeacher == null) throw new ArgumentNullException("entity");
            await context.SaveChangesAsync();

            return studentTeacher;
        }
        public async Task Delete(int studentId, int teacherId)
        {
            var entity = await entities.FirstOrDefaultAsync(s => s.StudentId == studentId && s.TeacherId == teacherId);
            if (entity == null) throw new ArgumentNullException("entity");

            entities.Remove(entity);

            await context.SaveChangesAsync();
        }


    }
}
