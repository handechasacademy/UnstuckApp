FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["ContentAPI/ContentAPI.csproj", "ContentAPI/"]
RUN dotnet restore "ContentAPI/ContentAPI.csproj"
COPY . .
WORKDIR "/src/ContentAPI"
RUN dotnet build "ContentAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContentAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ContentAPI.dll"]