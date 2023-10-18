namespace Data.Models
{
    public class TeacherDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public int YearsOfTeaching { get; set; }
        public float Salary { get; set; }
        public bool Associate { get; set; }
    }
}
