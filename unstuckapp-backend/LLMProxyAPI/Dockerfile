FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["unstuckapp-backend/LLMProxyAPI/LLMProxyAPI.csproj", "LLMProxyAPI/"]
RUN dotnet restore "LLMProxyAPI/LLMProxyAPI.csproj"
COPY unstuckapp-backend/ .
WORKDIR "/src/LLMProxyAPI"
RUN dotnet build "LLMProxyAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LLMProxyAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LLMProxyAPI.dll"]