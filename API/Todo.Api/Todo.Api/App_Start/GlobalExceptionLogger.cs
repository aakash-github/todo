using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace Todo.Api.App_Start
{
    public class GlobalExceptionLogger : ExceptionLogger
    {
        private static readonly Logger nLog = LogManager.GetCurrentClassLogger();
        public override void Log(ExceptionLoggerContext context)
        {
            nLog.Log(LogLevel.Error, context.Exception, RequestToString(context.Request));
        }

        private static string RequestToString(HttpRequestMessage request)
        {
            var message = new StringBuilder();
            if (request.Method != null)
                message.Append(request.Method);

            if (request.RequestUri != null)
                message.Append(" ").Append(request.RequestUri);

            return message.ToString();
        }
    }
}