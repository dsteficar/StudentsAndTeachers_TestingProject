using AutoMapper;
using Business.Exceptions;
using Business.Interfaces;
using Data.Interfaces;
using Data.Models;
using System.Data;

namespace Business.Services
{
    public class StudentService : IStudentService
    {
        private readonly IRepository<Student> _studentRepository;
        private readonly IRepository<SchoolClass> _schoolClassRepository;
        private readonly IRepository<Teacher> _teacherRepository;
        private readonly IStudentTeacherRepository<StudentTeacher> _studentTeacherRepository;
        private readonly IMapper _mapper;

        public StudentService(IRepository<Student> studentRepository,
            IRepository<SchoolClass> schoolClassRepository,
            IRepository<Teacher> teacherRepository,
            IStudentTeacherRepository<StudentTeacher> studentTeacherRepository,
            IMapper mapper)
        {
            _studentRepository = studentRepository;
            _schoolClassRepository = schoolClassRepository;
            _teacherRepository = teacherRepository;
            _studentTeacherRepository = studentTeacherRepository;
            _mapper = mapper;
        }

        public async Task<List<StudentDTO>> GetAll()
        {
            var students = await _studentRepository.GetAll();
            return students.Select(x => _mapper.Map<StudentDTO>(x)).ToList();
        }

        public async Task<StudentDTO> GetById(int id)
        {
            var student = await _studentRepository.GetById(id);
            return _mapper.Map<StudentDTO>(student);
        }

        public async Task<StudentDTO> Insert(StudentDTO studentDTO)
        {
            var schoolclassDb = await _schoolClassRepository.GetById(studentDTO.SchoolClassId);

            if (schoolclassDb == null)
            {
                throw new DBConcurrencyException();
            }

            var studentDb = _mapper.Map<Student>(studentDTO);
            var response = await _studentRepository.Insert(studentDb);

            _mapper.Map(response, studentDTO);

            return studentDTO;
        }

        public async Task<StudentDTO> Update(int id, StudentDTO studentDTO)
        {
            var schoolclassDb = await _schoolClassRepository.GetById(studentDTO.SchoolClassId);
            var studentDb = await _studentRepository.GetById(id);

            if (schoolclassDb == null || studentDb == null)
            {
                throw new DBConcurrencyException();
            }

            _mapper.Map(studentDTO, studentDb);

            var response = await _studentRepository.Update(studentDb);

            _mapper.Map(response, studentDTO);

            return studentDTO;
        }

        public async Task Delete(int id)
        {
            await _studentRepository.Delete(id);
        }

        public async Task<List<StudentTeacherDTO>> UpdateStudentTeachers(int studentId, List<int> newStudentTeachers)
        {
            var student = _studentRepository.GetById(studentId).Result;
            if (student == null)
                throw new EntityNotFoundException();

            List<int> existingTeacherIds = new List<int>();
            List<int> removableTeacherIds = new List<int>();

            foreach (var studentTeacherDb in student.Teachers)
            {
                if (newStudentTeachers.Any(s => s == studentTeacherDb.Id) == false)
                    removableTeacherIds.Add(studentTeacherDb.Id);
            }
            foreach (var studentTeacher in newStudentTeachers)
            {
                if (student.Teachers.ToList().Any(s => s.Id == studentTeacher) == true)
                    existingTeacherIds.Add(studentTeacher);
            }

            foreach (int teacherId in removableTeacherIds)
            {
                await _studentTeacherRepository.Delete(studentId, teacherId);
            }
            foreach (int teacherId in existingTeacherIds)
            {
                newStudentTeachers.Remove(teacherId);
            }

            List<StudentTeacherDTO> response = new List<StudentTeacherDTO>();
            foreach (int teacherId in newStudentTeachers)
            {
                Teacher teacher = _teacherRepository.GetById(teacherId).Result;
                StudentTeacher entityToDb = new StudentTeacher();

                entityToDb.StudentId = studentId;
                entityToDb.TeacherId = teacherId;

                await _studentTeacherRepository.Insert(entityToDb);
                response.Add(_mapper.Map<StudentTeacherDTO>(entityToDb));
            }

            return response;
        }
    }
}
