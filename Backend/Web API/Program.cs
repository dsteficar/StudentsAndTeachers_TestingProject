using Business.Interfaces;
using Business.Services;
using Data;
using Data.Interfaces;
using Data.Models;
using Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(
    opt => opt.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("DB_CONNECTION_STRING")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IContactInfoService, ContactInfoService>();
builder.Services.AddScoped<IStudentTeacherService, StudentTeacherService>();
builder.Services.AddScoped(typeof(IService<,>), typeof(Service<,>));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IStudentTeacherRepository<StudentTeacher>, StudentTeacherRepository>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CustomCORS", policy =>
    {
        policy.AllowAnyHeader().AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
    });
});
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "User API",
        Description = "And ASP.NET Core Web API for managing users"
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;

    });
}
app.UseCors("CustomCORS");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
