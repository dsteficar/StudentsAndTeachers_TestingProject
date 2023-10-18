﻿using Data.Models;

namespace Data.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<List<T>> GetAll();

        Task<T> GetById(int id);

        Task<T> Insert(T entity);

        Task<T> Update(T entity);

        Task Delete(int id);
    }
}
