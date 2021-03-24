const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))

function svgToBlazor(svg, componentCategory) {
  return `@namespace Heroicons.${componentCategory}
${addConfigurableAttributesToSvgElement(svg)}
${addParametersToComponent()}`;
}

function addConfigurableAttributesToSvgElement(svg) {
  return svg.replace('<svg', '<svg class="@Class" style="@Style"');
}

function addParametersToComponent() {
  return `@code {
  [Parameter]
  public string Class { get; set; } = string.Empty;

  [Parameter]
  public string Style { get; set; } = string.Empty;
}`
}

function buildProjectFile() {
  return `<Project Sdk="Microsoft.NET.Sdk.Razor">
  <PropertyGroup>
    <Company>Tailwind</Company>
    <Copyright>Copyright ©$([System.DateTime]::Now.Year) Tailwind</Copyright>
    <IsPackable>true</IsPackable>
    <Version>${process.env.npm_package_version}</Version>
    <TargetFrameworks>netstandard2.1;net5.0</TargetFrameworks>
    <RazorLangVersion Condition="'$(TargetFramework)' == 'netstandard2.1'">3.0</RazorLangVersion>
    <Description>Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.</Description>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
  </PropertyGroup>
  <ItemGroup>
    <SupportedPlatform Include="browser" />
    <PackageReference Condition="'$(TargetFramework)' == 'netstandard2.1'" Include="Microsoft.AspNetCore.Components.Web" Version="3.1.10" />
    <PackageReference Condition="'$(TargetFramework)' == 'net5.0'" Include="Microsoft.AspNetCore.Components.Web" Version="5.0.0" />
  </ItemGroup>
</Project>`;
}

console.log('Building Blazor components...')

rimraf('./blazor/outline/*')
  .then(() => {
    return rimraf('./blazor/solid/*')
  })
  .then(() => {
    return Promise.all([
      fs.readdir('./solid').then((files) => {
        return Promise.all(
          files.map((file) => {
            const componentName = `${camelcase(file.replace(/\.svg$/, ''), { pascalCase: true })}`
            return fs
              .readFile(`./solid/${file}`, 'utf8')
              .then((content) => {
                return svgToBlazor(content, `Solid`)
              })
              .then((component) => {
                const fileName = `${componentName}.razor`
                const content = component
                return fs.writeFile(`./blazor/solid/${fileName}`, content).then(() => fileName)
              })
          })
        ).then(( _) => {
          return fs.writeFile('./blazor/solid/Heroicons.Solid.csproj', buildProjectFile())
        })
      }),

      fs.readdir('./outline').then((files) => {
        return Promise.all(
          files.map((file) => {
            const componentName = `${camelcase(file.replace(/\.svg$/, ''), { pascalCase: true })}`
            return fs
              .readFile(`./outline/${file}`, 'utf8')
              .then((content) => {
                return svgToBlazor(content, `Outline`)
              })
              .then((component) => {
                const fileName = `${componentName}.razor`
                const content = component
                return fs.writeFile(`./blazor/outline/${fileName}`, content).then(() => fileName)
              })
          })
        ).then(( _) => {
          return fs.writeFile('./blazor/outline/Heroicons.Outline.csproj', buildProjectFile())
        })
      }),
    ])
  })
  .then(() => console.log('Finished building Blazor components.'))
