namespace Data.Models
{
    public class ContactInfoDTO
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? WebsiteLink { get; set; }
        public string? ContactNumber { get; set; }
        public int CabinetNumber { get; set; }
        public int TeacherId { get; set; }

    }
}
