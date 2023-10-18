using Business.Exceptions;
using Business.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
    [Route("api/SchoolClasses")]
    [Produces("application/json")]
    [ApiController]
    public class SchoolClassesController : Controller
    {
        private readonly IService<SchoolClass, SchoolClassDTO> _service;
        public SchoolClassesController(IService<SchoolClass, SchoolClassDTO> service)
        {
            _service = service;
        }
        /// <summary>
        /// Shows all schoolclasses
        /// </summary>
        // GET: api/Schoolclasses
        [HttpGet]
        public async Task<ActionResult<List<SchoolClassDTO>>> GetSchoolClassList()
        {
            try
            {
                return await _service.GetAll();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        /// <summary>
        /// Shows a specified schoolclass by id
        /// </summary>
        // GET: api/Schoolclasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SchoolClassDTO>> GetSchoolClass(int id)
        {
            SchoolClassDTO schoolClassDTO;

            try
            {
                schoolClassDTO = await _service.GetById(id);
            }
            catch (Exception)
            {
                return NotFound();
            };

            return schoolClassDTO;
        }
        /// <summary>
        /// Updates the selected schoolclass by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT/Schoolclasses
        ///         {
        ///             "id": 0,
        ///             "name": "IT Class",
        ///             "studentCapacity": 15,
        ///             "online": false
        ///         }
        ///         
        /// </remarks>
        /// <response code="204">Returns information that the schoolclass is altered</response>
        /// <response code="404">If the schoolclass is not found</response>
        // PUT: api/Schoolclasses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateSchoolClass(int id, SchoolClassDTO schoolClassDTO)
        {
            try
            {
                if (id != schoolClassDTO.Id)
                    return BadRequest("SchoolClass ID mismatch");
                var result = await _service.Update(id, schoolClassDTO);
                if (result == null)
                    throw new EntityNotFoundException();
                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex is EntityNotFoundException)
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }
        }
        /// <summary>
        /// Creates a new schoolclass
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST/SchoolClass
        ///         {
        ///             "id": 0,
        ///             "name": "IT Class",
        ///             "studentCapacity": 15,
        ///             "online": false
        ///         }
        ///         
        /// </remarks>
        /// <response code="201">Returns the newly created schoolclass</response>
        /// <response code="400">If the schoolclass data is not in correct syntax</response>
        // POST: api/SchoolClasses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<SchoolClassDTO>> CreateSchoolClass(SchoolClassDTO schoolClassDTO)
        {
            try
            {
                var result = await _service.Insert(schoolClassDTO);
                if (result == null)
                    throw new EntityNotFoundException();
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        /// <summary>
        /// Deletes the specified schoolclass
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="204">Returns confirmation that schoolclass is deleted</response>
        /// <response code="404">If the schoolclass is null</response>
        // DELETE: api/SchoolClasses/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteSchoolClass(int id)
        {
            try
            {
                await _service.Delete(id);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
