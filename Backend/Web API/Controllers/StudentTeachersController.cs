using Business.Exceptions;
using Business.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Web_API.Controllers
{
    [Route("api/StudentTeachers")]
    [Produces("application/json")]
    [ApiController]
    public class StudentTeachersController : Controller
    {
        private readonly IStudentTeacherService _studentTeacherService;
        public StudentTeachersController(IStudentTeacherService studentTeacherService)
        {
            _studentTeacherService = studentTeacherService;
        }
        /// <summary>
        /// Shows all studentTeachers
        /// </summary>
        // GET: api/ContacIinfos
        [HttpGet]
        public async Task<ActionResult<List<StudentTeacherDTO>>> GetStudentTeacherList()
        {
            try
            {
                return await _studentTeacherService.GetAll();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        /// <summary>
        /// Shows a specified studentTeacher by id
        /// </summary>
        // GET: api/StudentTeachers/1/2
        [HttpGet("{studentId}/{teacherId}")]
        public async Task<ActionResult<StudentTeacherDTO>> GetStudentTeacher(int studentId, int teacherId)
        {
            StudentTeacherDTO studentTeacherDTO;

            try
            {
                studentTeacherDTO = await _studentTeacherService.GetById(studentId, teacherId);
            }
            catch (Exception)
            {
                return NotFound();
            };

            return studentTeacherDTO;
        }
        /// <summary>
        /// Updates the selected studentTeacher by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT/StudentTeacher
        ///         {
        ///             "studentId": 1,
        ///             "teacherId": 1
        ///         }
        ///         
        /// </remarks>
        /// <response code="204">Returns information that the studentTeacher is altered</response>
        /// <response code="404">If the studentTeacher is not found</response>
        // PUT: api/StudentTeachers/1/2
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{studentId}/{teacherId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateStudentTeacher(int studentId, int teacherId, StudentTeacherDTO studentTeacherDTO)
        {
            try
            {
                var result = await _studentTeacherService.Update(studentId, teacherId, studentTeacherDTO);
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
        /// Creates a new studentTeacher
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST/StudentTeacher
        ///         {
        ///             "studentId": 1,
        ///             "teacherId": 1
        ///         }
        ///         
        /// </remarks>
        /// <response code="201">Returns the newly created studentTeacher</response>
        /// <response code="400">If the studentTeacher data is not in correct syntax</response>
        // POST: api/StudentTeachers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ContactInfoDTO>> CreateStudentTeacher(StudentTeacherDTO studentTeacherDTO)
        {
            try
            {
                var result = await _studentTeacherService.Insert(studentTeacherDTO);
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
        /// Deletes the specified studentTeacher
        /// </summary>
        /// <param name="studentId"></param>
        /// <param name="teacherId"></param>
        /// <returns></returns>
        /// <response code="204">Returns confirmation that studentTeacher is deleted</response>
        /// <response code="404">If the studentTeacher is null</response>
        // DELETE: api/StudentTeachers/1/2
        [HttpDelete("{studentId}/{teacherId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteStudentTeacher(int studentId, int teacherId)
        {
            try
            {
                await _studentTeacherService.Delete(studentId, teacherId);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
