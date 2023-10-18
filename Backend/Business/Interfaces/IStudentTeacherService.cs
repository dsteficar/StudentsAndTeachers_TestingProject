using Data.Models;

namespace Business.Interfaces
{
    public interface IStudentTeacherService
    {
        Task<List<StudentTeacherDTO>> GetAll();
        Task<StudentTeacherDTO> GetById(int firstId, int secondId);
        Task<StudentTeacherDTO> Insert(StudentTeacherDTO studentTeacher);
        Task<StudentTeacherDTO> Update(int firstId, int secondId, StudentTeacherDTO studentTeacher);
        Task Delete(int firstId, int secondId);
    }
}
