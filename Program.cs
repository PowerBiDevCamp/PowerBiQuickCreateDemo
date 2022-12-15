var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(c => {
  c.AddPolicy("AllowOrigin", options => {
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
  });
});

builder.Services.AddControllers().AddJsonOptions(options => {
  options.JsonSerializerOptions.IncludeFields = true;  
  options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddSpaStaticFiles(configuration => {
  configuration.RootPath = "wwwRoot";
});

var app = builder.Build();
app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowOrigin");



app.UseEndpoints(endpoints => {
  endpoints.MapControllers();
});

var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("index.htm");
app.UseDefaultFiles(options);

app.UseStaticFiles();

app.UseSpa(spa => { });

//app.UseWhen(context => !context.Request.Path.Value.StartsWith("/api"),
//  builder => {
//   // app.UseSpa(spa => { });
//  });

//app.MapWhen(
//    context => !context.Request.Path.StartsWithSegments("/api/", StringComparison.OrdinalIgnoreCase),
//    cfg => {
//      cfg.UseSpa(spa => { });
//    }
//);



app.Run();
