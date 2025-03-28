using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Domain.Tokens.Core
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public sealed class TokenAuth : Attribute, IAuthorizationFilter
    {
        private const string FixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; // Token fixo para validação

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Verifica se o cabeçalho "Authorization" está presente
            if (!context.HttpContext.Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Extrai o token do cabeçalho (formato esperado: "Bearer <token>")
            var token = authorizationHeader.ToString().Split(" ")[1];
            if (string.IsNullOrEmpty(token) || token != FixedToken)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Se o token for válido, a execução continua normalmente
        }
    }
}