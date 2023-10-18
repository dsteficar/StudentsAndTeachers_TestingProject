namespace Data.Models
{
    public class Student : BaseEntity
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Address { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public int SchoolClassId { get; set; }
        public virtual SchoolClass SchoolClass { get; set; } = null!;
        public virtual ICollection<Teacher> Teachers { get; } = new List<Teacher>();
        public virtual ICollection<StudentTeacher> StudentTeachers { get; } = new List<StudentTeacher>();
    }
}
