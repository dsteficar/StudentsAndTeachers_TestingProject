namespace Data.Models
{
    public class StudentDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Address { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public int SchoolClassId { get; set; }
    }
}
