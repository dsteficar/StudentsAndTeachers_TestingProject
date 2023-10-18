using AutoMapper;
using Business.Interfaces;
using Data.Interfaces;
using Data.Models;
using System.Data;

namespace Business.Services
{
    public class StudentTeacherService : IStudentTeacherService
    {
        private readonly IRepository<Student> _studentRepository;
        private readonly IRepository<Teacher> _teacherRepository;
        private readonly IStudentTeacherRepository<StudentTeacher> _studentTeacherRepository;
        private readonly IMapper _mapper;

        public StudentTeacherService(IRepository<Student> studentRepository,
            IRepository<Teacher> teacherRepository,
            IStudentTeacherRepository<StudentTeacher> studentTeacherRepository,
            IMapper mapper)
        {
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _studentTeacherRepository = studentTeacherRepository;
            _mapper = mapper;
        }
        public async Task<List<StudentTeacherDTO>> GetAll()
        {
            var studentTeachers = await _studentTeacherRepository.GetAll();
            return studentTeachers.Select(x => _mapper.Map<StudentTeacherDTO>(x)).ToList();
        }

        public async Task<StudentTeacherDTO> GetById(int firstId, int secondId)
        {
            var studentTeacher = await _studentTeacherRepository.GetById(firstId, secondId);
            return _mapper.Map<StudentTeacherDTO>(studentTeacher);
        }

        public async Task<StudentTeacherDTO> Insert(StudentTeacherDTO studentTeacherDTO)
        {
            var studentDb = await _studentRepository.GetById(studentTeacherDTO.StudentId);
            var teacherDb = await _teacherRepository.GetById(studentTeacherDTO.TeacherId);

            if (studentDb == null || teacherDb == null)
            {
                throw new DBConcurrencyException();
            }
            var studentTeacherDb = _mapper.Map<StudentTeacher>(studentTeacherDTO);

            var response = await _studentTeacherRepository.Insert(studentTeacherDb);

            _mapper.Map(response, studentTeacherDTO);

            return studentTeacherDTO;
        }

        public async Task<StudentTeacherDTO> Update(int studentId, int teacherId, StudentTeacherDTO studentTeacherDTO)
        {
            var studentDb = await _studentRepository.GetById(studentId);
            var teacherDb = await _teacherRepository.GetById(teacherId);
            var studentTeacherDb = await _studentTeacherRepository.GetById(studentId, teacherId);

            if (studentDb == null || teacherDb == null || studentTeacherDb == null)
            {
                throw new DBConcurrencyException();
            }

            _mapper.Map(studentTeacherDTO, studentTeacherDb);

            var result = await _studentTeacherRepository.Update(studentTeacherDb);

            _mapper.Map(result, studentTeacherDTO);

            return studentTeacherDTO;
        }
        public async Task Delete(int firstId, int secondId)
        {
            await _studentTeacherRepository.Delete(firstId, secondId);
        }
    }
}
