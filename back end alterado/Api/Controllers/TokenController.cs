using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/tokens")]
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    public class TokensController : ControllerBase
    {
        private const string FixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; // Token fixo para uso

        [HttpGet]
        [AllowAnonymous] // Permite acesso sem autenticação para obter o token
        public ActionResult<string> GetFixedToken()
        {
            return Ok(new { Token = FixedToken });
        }
    }
}