using AutoMapper;
using Data.Models;

namespace Web_API.Mappings
{
    internal class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<Student, StudentDTO>().ReverseMap();
        }
    }
}
