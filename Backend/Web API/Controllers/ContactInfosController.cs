using Business.Exceptions;
using Business.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
    [Route("api/ContactInfos")]
    [Produces("application/json")]
    [ApiController]
    public class ContactInfosController : Controller
    {

        private readonly IService<ContactInfo, ContactInfoDTO> _contactInfoservice;
        public ContactInfosController(IService<ContactInfo, ContactInfoDTO> contactInfoservice)
        {
            _contactInfoservice = contactInfoservice;
        }
        /// <summary>
        /// Shows all contactinfos
        /// </summary>
        // GET: api/ContacIinfos
        [HttpGet]
        public async Task<ActionResult<List<ContactInfoDTO>>> GetContactInfoList()
        {
            try
            {
                return await _contactInfoservice.GetAll();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        /// <summary>
        /// Shows a specified contactinfo by id
        /// </summary>
        // GET: api/Contactinfos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactInfoDTO>> GetContactInfo(int id)
        {
            ContactInfoDTO contactInfoDTO;

            try
            {
                contactInfoDTO = await _contactInfoservice.GetById(id);
            }
            catch (Exception)
            {
                return NotFound();
            };

            return contactInfoDTO;
        }
        /// <summary>
        /// Updates the selected contactinfo by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT/ContactInfo
        ///         {
        ///             "id": 0,
        ///             "address": "Ulica Bartola Kasica 10",
        ///             "email": "profesor1@gmail.com",
        ///             "websiteLink": "www.schools.com/profesor1",
        ///             "contactNumber": "097456456",
        ///             "teacherId": 1
        ///         }
        ///         
        /// </remarks>
        /// <response code="204">Returns information that the contactinfo is altered</response>
        /// <response code="404">If the contactinfo is not found</response>
        // PUT: api/ContacInfos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateContactInfo(int id, ContactInfoDTO contactInfoDTO)
        {
            try
            {
                if (id != contactInfoDTO.Id)
                    return BadRequest("ContactInfo ID mismatch");
                var result = await _contactInfoservice.Update(id, contactInfoDTO);
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
        /// Creates a new contactinfo
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST/ContactInfo
        ///         {
        ///             "id": 0,
        ///             "address": "Ulica Bartola Kasica 10",
        ///             "email": "profesor1@gmail.com",
        ///             "websiteLink": "www.schools.com/profesor1",
        ///             "contactNumber": "097456456",
        ///             "cabinetNumber": 4,
        ///             "teacherId": 1
        ///         }
        ///         
        /// </remarks>
        /// <response code="201">Returns the newly created contactinfo</response>
        /// <response code="400">If the contactinfo data is not in correct syntax</response>
        // POST: api/ContactInfos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ContactInfoDTO>> CreateContactInfo(ContactInfoDTO contactInfoDTO)
        {
            try
            {
                var result = await _contactInfoservice.Insert(contactInfoDTO);
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
        /// Deletes the specified contactinfo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="204">Returns confirmation that contactinfo is deleted</response>
        /// <response code="404">If the contactinfo is null</response>
        // DELETE: api/ContactInfos/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteContactInfo(int id)
        {
            try
            {
                await _contactInfoservice.Delete(id);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
