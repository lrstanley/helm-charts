## :sparkles: Features

- :heavy_check_mark: [Redis](https://redis.io/) built-in, with auto-generated credentials.
- :heavy_check_mark: [PostgreSQL](https://www.postgresql.org/) builtin, with auto-generated credentials.
- :heavy_check_mark: [Minio](https://min.io/) built-in, with auto-generated credentials.
- :heavy_check_mark: [Dex](https://dexidp.io/) built-in, which supports various different authentication
  providers. This allows extending Outline to support many more auth providers (without the Enterprise
  edition). For example:
  - GitHub - [documentation](https://dexidp.io/docs/connectors/github/#configuration).
  - LDAP - [documentation](https://dexidp.io/docs/connectors/ldap/#configuration).
  - OAuth2 - [documentation](https://dexidp.io/docs/connectors/oauth/#configuration).
  - [And more!](https://dexidp.io/docs/connectors/)
- :heavy_check_mark: [Scheduled jobs](https://docs.getoutline.com/s/hosting/doc/scheduled-jobs-RhZzCt770H) support built-in.

Some additional items which aren't provided by other Outline helm charts:

- :heavy_check_mark: Proper health check endpoint validation
- :heavy_check_mark: Outline container will wait for dependencies to be available before starting.
- :heavy_check_mark: It's kept update-to-date!
  - Automated PRs for new Outline versions.
  - Automated PRs for child chart dependencies.

-------------------------------
