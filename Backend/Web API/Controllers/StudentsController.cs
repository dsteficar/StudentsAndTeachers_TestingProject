using Business.Exceptions;
using Business.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
    [Route("api/Students")]
    [Produces("application/json")]
    [ApiController]
    public class StudentsController : Controller
    {

        private readonly IStudentService _service;
        public StudentsController(IStudentService service)
        {
            _service = service;
        }
        /// <summary>
        /// Shows all students
        /// </summary>
        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<List<StudentDTO>>> GetStudentList()
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
        /// Shows a specified student by id
        /// </summary>
        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDTO>> GetStudent(int id)
        {
            StudentDTO student;

            try
            {
                student = await _service.GetById(id);
            }
            catch (Exception)
            {
                return NotFound();
            };

            return student;
        }
        /// <summary>
        /// Updates the selected student by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT/Student
        ///         {
        ///             "id": 0,
        ///             "name": "Karlo",
        ///             "surname": "Karlic",
        ///             "address" : "Dravska ulica 5",
        ///             "age": 0,
        ///             "email": 0,
        ///             "schoolClassId": 1
        ///         }
        ///         
        /// </remarks>
        /// <response code="204">Returns information that the user is altered</response>
        /// <response code="404">If the user is not found</response>
        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateStudent(int id, StudentDTO studentDTO)
        {
            try
            {
                if (id != studentDTO.Id)
                    return BadRequest("Student ID mismatch");
                var result = await _service.Update(id, studentDTO);
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
        /// Creates a new student
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST/Student
        ///         {
        ///             "id": 0,
        ///             "name": "Karlo",
        ///             "surname": "Karlic",
        ///             "address" : "Dravska ulica 5",
        ///             "age": "15",
        ///             "email": "karlic@gmail.com",
        ///             "schoolClassId": 1
        ///         }
        ///         
        /// </remarks>
        /// <response code="201">Returns the newly created student</response>
        /// <response code="400">If the student data is not in correct syntax</response>
        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<StudentDTO>> CreateStudent(StudentDTO studentDTO)
        {
            try
            {
                var result = await _service.Insert(studentDTO);
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
        /// Deletes the specified student
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="204">Returns confirmation that student is deleted</response>
        /// <response code="404">If the student is null</response>
        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteStudent(int id)
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
        /// <summary>
        /// Creates a new student with his related teachers
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST/Student
        ///             [
        ///                 1,4,5
        ///             ]
        ///         
        /// </remarks>
        /// <response code="201">Returns the newly created student with all his teachers</response>
        /// <response code="400">If the student and teachers data is not in correct syntax</response>
        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<StudentDTO>> AddTeachersOfStudent(int id, List<int> teacherList)
        {
            try
            {
                var result = await _service.UpdateStudentTeachers(id, teacherList);
                if (result == null)
                    throw new EntityNotFoundException();
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
