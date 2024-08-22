## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
Node version 18.9.0
### How to install the app on local:
```bash
$ npm i
$ set the NODE_ENV to development or production
    To set an environment variable in Windows:
    SET NODE_ENV=development
    on OS X or Linux:
    export NODE_ENV=development
```

### Configure app for development
Duplicate development.env.example and remove the '.exmaple' from the file name.
Make sure there is a mysql server running and all the configuration is correct (database host, username, etc).
Duplicate secrets/secrets.json.example and remove the '.exmaple' from the file name.

### Project structure
all modules are opened under the modules directory
every module structure have to follow the example module structure ,
please use nestjs cli to create resources,controllers,services ,etc -
for more information visit https://docs.nestjs.com/cli/overview . 

### Git
Before each "commit" & "push" the application will run hooks to inspect the code.
Please check the result and fix the issues if needed. 

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

  Nest is [MIT licensed](LICENSE).
