using AutoMapper;
using Business.Exceptions;
using Business.Interfaces;
using Data.Interfaces;
using Data.Models;
using System.Data;

namespace Business.Services
{
    public class ContactInfoService : IContactInfoService
    {
        private readonly IRepository<ContactInfo> _contactInfoRepository;
        private readonly IRepository<Teacher> _teacherRepository;
        private readonly IMapper _mapper;

        public ContactInfoService(IRepository<ContactInfo> contactInfoRepository, IRepository<Teacher> teacherRepository, IMapper mapper)
        {
            _contactInfoRepository = contactInfoRepository;
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }
        public async Task<List<ContactInfoDTO>> GetAll()
        {
            var contactInfos = await _contactInfoRepository.GetAll();
            return contactInfos.Select(x => _mapper.Map<ContactInfoDTO>(x)).ToList();
        }

        public async Task<ContactInfoDTO> GetById(int id)
        {
            var contactInfo = await _contactInfoRepository.GetById(id);

            if (contactInfo == null)
                throw new EntityNotFoundException();

            return _mapper.Map<ContactInfoDTO>(contactInfo);
        }

        public async Task<ContactInfoDTO> Insert(ContactInfoDTO contactInfoDTO)
        {
            var teacherDb = await _teacherRepository.GetById(contactInfoDTO.TeacherId);

            if (teacherDb == null || teacherDb.ContactInfo != null)
                throw new DBConcurrencyException();

            var contactInfoDb = _mapper.Map<ContactInfo>(contactInfoDTO);

            await _contactInfoRepository.Insert(contactInfoDb);

            var returnValue = GetAll().Result.Last();

            _mapper.Map(returnValue, contactInfoDTO);

            return contactInfoDTO;
        }

        public async Task<ContactInfoDTO> Update(int id, ContactInfoDTO contactInfoDTO)
        {
            var teacherDb = await _teacherRepository.GetById(contactInfoDTO.TeacherId);
            var contactInfoDb = await _contactInfoRepository.GetById(id);

            if (teacherDb == null || contactInfoDb == null)
            {
                throw new DBConcurrencyException();
            }

            _mapper.Map(contactInfoDTO, contactInfoDb);

            await _contactInfoRepository.Update(contactInfoDb);

            var returnValue = GetAll().Result.Last();

            _mapper.Map(returnValue, contactInfoDTO);

            return contactInfoDTO;
        }

        public async Task Delete(int id)
        {
            await _contactInfoRepository.Delete(id);
        }

    }
}
