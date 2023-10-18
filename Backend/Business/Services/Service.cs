using AutoMapper;
using Business.Exceptions;
using Business.Interfaces;
using Data.Interfaces;
using Data.Models;

namespace Business.Services
{
    public class Service<TEntity, TModel> : IService<TEntity, TModel> where TEntity : BaseEntity where TModel : class
    {
        private readonly IRepository<TEntity> _repository;
        private readonly IMapper _mapper;

        public Service(IRepository<TEntity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public virtual async Task<List<TModel>> GetAll()
        {
            var entities = await _repository.GetAll();
            return entities.Select(x => _mapper.Map<TModel>(x)).ToList();
        }
        public virtual async Task<TModel> GetById(int id)
        {
            var entity = await _repository.GetById(id);
            return _mapper.Map<TModel>(entity);
        }
        public virtual async Task<TModel> Insert(TModel entityDTO)
        {
            var entityDb = _mapper.Map<TEntity>(entityDTO);

            var response = await _repository.Insert(entityDb);

            _mapper.Map(response, entityDTO);

            return entityDTO;
        }

        public virtual async Task<TModel> Update(int id, TModel entityDTO)
        {

            var entityDb = await _repository.GetById(id);

            if (entityDb == null)
            {
                throw new EntityNotFoundException();
            }

            _mapper.Map(entityDTO, entityDb);

            var response = await _repository.Update(entityDb);

            _mapper.Map(response, entityDTO);

            return entityDTO;
        }
        public virtual async Task Delete(int id)
        {
            await _repository.Delete(id);
        }
    }
}
