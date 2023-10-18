namespace Data.Interfaces
{
    public interface IStudentTeacherRepository<StudentTeacher>
    {
        Task<List<StudentTeacher>> GetAll();

        Task<StudentTeacher> GetById(int studentId, int teacherId);

        Task<StudentTeacher> Insert(StudentTeacher studentTeacher);

        Task<StudentTeacher> Update(StudentTeacher studentTeacher);

        Task Delete(int studentId, int teacherId);
    }
}
