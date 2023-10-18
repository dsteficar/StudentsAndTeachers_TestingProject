namespace Business.Interfaces
{
    public interface IService<TEntity, TModel> where TEntity : class where TModel : class
    {
        Task<List<TModel>> GetAll();
        Task<TModel> GetById(int id);
        Task<TModel> Update(int id, TModel entity);
        Task<TModel> Insert(TModel entity);
        Task Delete(int id);
    }
}
