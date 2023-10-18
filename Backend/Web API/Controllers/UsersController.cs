using Business.Exceptions;
using Business.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Web_API.Controllers
{
    [Route("api/Users")]
    [Produces("application/json")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IService<User, UserDTO> _userService;
        public UsersController(IService<User, UserDTO> userService)
        {
            _userService = userService;
        }
        /// <summary>
        /// Shows all users
        /// </summary>
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetUserList()
        {
            try
            {
                return await _userService.GetAll();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        /// <summary>
        /// Shows a specified user by id
        /// </summary>
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            UserDTO user;

            try
            {
                user = await _userService.GetById(id);
            }
            catch (Exception)
            {
                return NotFound();
            };

            return user;
        }
        /// <summary>
        /// Updates the selected user by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT/User
        ///         {
        ///         "id" : 1,
        ///         "fullname" : "Marko Markic",
        ///         "number" : "098123456"
        ///         }
        ///         
        /// </remarks>
        /// <response code="204">Returns information that the user is altered</response>
        /// <response code="404">If the user is not found</response>
        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateUser(int id, UserDTO userDTO)
        {
            try
            {
                if (id != userDTO.Id)
                    return BadRequest("User ID mismatch");
                var result = await _userService.Update(id, userDTO);
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
        /// Creates a new user
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST/User
        ///         {
        ///         "fullname" : "Marko Markic",
        ///         "number" : "098123456"
        ///         }
        ///         
        /// </remarks>
        /// <response code="201">Returns the newly created user</response>
        /// <response code="400">If the user data is not in correct syntax</response>
        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<UserDTO>> CreateUser(UserDTO userDTO)
        {
            try
            {
                var result = await _userService.Insert(userDTO);
                if (result == null)
                    throw new EntityNotFoundException();
                return Ok(result);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error message: {ex.Message}");
                Debug.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                Debug.WriteLine($"Exception Type: {ex.GetType().FullName}");
                Debug.WriteLine($"Stack Trace: {ex.StackTrace}");
                return BadRequest();
            }
        }
        /// <summary>
        /// Deletes the specified user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="204">Returns confirmation that user is deleted</response>
        /// <response code="404">If the user is null</response>
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.Delete(id);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
