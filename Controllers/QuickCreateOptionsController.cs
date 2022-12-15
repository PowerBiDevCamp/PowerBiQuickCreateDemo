using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PowerBiQuickCreateDemo.Models;

namespace PowerBiQuickCreateDemo.Controllers {

  [Route("api/[controller]")]
  [ApiController]
  [EnableCors("AllowOrigin")]
  public class QuickCreateOptionsController : ControllerBase {

    public DatasetCreateConfiguration[] GetData() {
      return SampleQuickCreateDatasources.GetDatasourceCreateConfigurations();
    }
  }
}