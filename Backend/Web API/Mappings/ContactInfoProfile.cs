using AutoMapper;
using Data.Models;

namespace Web_API.Mappings
{
    internal class ContactInfoProfile : Profile
    {
        public ContactInfoProfile()
        {
            CreateMap<ContactInfo, ContactInfoDTO>().ReverseMap();
        }
    }
}
