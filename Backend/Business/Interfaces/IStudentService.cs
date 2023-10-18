using Data.Models;

namespace Business.Interfaces
{
    public interface IStudentService : IService<Student, StudentDTO>
    {
        Task<List<StudentTeacherDTO>> UpdateStudentTeachers(int studentId, List<int> newStudentTeachers);
    }
}
