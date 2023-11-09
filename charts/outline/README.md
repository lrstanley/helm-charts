<p align="center">
  <img title="Logo" src="https://liam.sh/-/gh/svg?title=outline&description=The outline helm chart to deploy outline in kubernetes clusters.&layout=left&icon=simple-icons%3Ahelm&icon.height=100&font=1.15&bg=topography&bgcolor=rgba(2%2C+0%2C+26%2C+1)"></img>
</p>

<p align="center">
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/outline/Chart.yaml">
    <img title="Chart Version" src="https://img.shields.io/badge/chart%20version-1.0.1-blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/outline/Chart.yaml">
    <img title="App Version" src="https://img.shields.io/badge/app%20version-0.72.2-blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/outline/Chart.yaml">
    <img title="Chart Type" src="https://img.shields.io/badge/chart%20type--blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/discussions/new?category=q-a">
    <img title="Ask a Question" src="https://img.shields.io/badge/support-ask_a_question!-blue?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="https://github.com/lrstanley/helm-charts/commits/master">
    <img title="Last commit" src="https://img.shields.io/github/last-commit/lrstanley/helm-charts?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/issues?q=is:open+is:issue+label:bug">
    <img title="Bug reports" src="https://img.shields.io/github/issues/lrstanley/helm-charts/bug?label=issues&style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/issues?q=is:open+is:issue+label:enhancement">
    <img title="Feature requests" src="https://img.shields.io/github/issues/lrstanley/helm-charts/enhancement?label=feature%20requests&style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/pulls">
    <img title="Open Pull Requests" src="https://img.shields.io/github/issues-pr/lrstanley/helm-charts?label=prs&style=flat-square">
  </a>
  <a href="https://liam.sh/chat"><img src="https://img.shields.io/badge/discord-bytecord-blue.svg?style=flat-square" title="Discord Chat"></a>
</p>

-----------------------------------

## :computer: How to install this chart

Add the chart repo:

```console
helm repo add lrstanley https://helm.liam.sh/
```

A simple install with default values:

```console
helm install lrstanley/outline
```

To install the chart with the release name `my-release`:

```console
helm install my-release lrstanley/outline
```

To install with some set values:

```console
helm install my-release lrstanley/outline --set values_key1=value1 --set values_key2=value2
```

To install with custom values file:

```console
helm install my-release lrstanley/outline -f values.yaml
```

## :gear: Helm Configuration Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| dex.config.connectors[0].config.clientID | string | `"your-github-client-id"` |  |
| dex.config.connectors[0].config.clientSecret | string | `"your-github-client-secret"` |  |
| dex.config.connectors[0].config.loadAllGroups | bool | `true` |  |
| dex.config.connectors[0].config.redirectURI | string | `"https://chart-example.local/dex/callback"` |  |
| dex.config.connectors[0].config.teamNameField | string | `"slug"` |  |
| dex.config.connectors[0].config.useLoginAsID | bool | `false` |  |
| dex.config.connectors[0].id | string | `"github"` |  |
| dex.config.connectors[0].name | string | `"GitHub"` |  |
| dex.config.connectors[0].type | string | `"github"` |  |
| dex.config.issuer | string | `"http://my-issuer-url.com"` |  |
| dex.config.oauth2.skipApprovalScreen | bool | `true` |  |
| dex.config.staticClients[0].id | string | `"outline-client-id"` |  |
| dex.config.staticClients[0].name | string | `"Outline"` |  |
| dex.config.staticClients[0].redirectURIs[0] | string | `"https://chart-example.local/auth/oidc.callback"` |  |
| dex.config.staticClients[0].secret | string | `"outline-client-secret"` |  |
| dex.config.storage.type | string | `"memory"` |  |
| dex.enabled | bool | `false` |  |
| dex.ingress | object | `{"className":"","enabled":true,"hosts":[]}` | ingress configuration for dex. does not have to be on its own domain (can be mounted on a subpath like <outline>/dex). |
| dex.resources.limits | object | `{"memory":"128Mi"}` | the resources limits for dex. |
| dex.resources.requests | object | `{"cpu":"25m","memory":"128Mi"}` | the resources requests for dex. |
| environment | object | `{}` | environment variables to set in the deployment. |
| environmentFrom | list | `[]` | have an existing secret or config-map that contains sensitive env vars? supply the name here. |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` | the image pull policy (generally shouldn't be changed). |
| image.repository | string | `"outlinewiki/outline"` | the image repository to pull from. |
| image.tag | string | `""` | the image tag to use. defaults to the appVersion in Chart.yaml. |
| ingress.annotations | object | `{}` | additional annotations to add to the ingress resource. |
| ingress.className | string | `""` | class name to use for the ingress resource. |
| ingress.enabled | bool | `true` | set to true to create an ingress resource. |
| ingress.hosts | list | `[]` | hosts to include in the ingress resource. |
| ingress.tls | list | `[]` |  |
| initContainers | list | `[]` | additional init containers to add to the deployment. |
| minio.apiIngress | object | `{"enabled":true,"hostname":"s3.chart-example.local","ingressClassName":""}` | ingress configuration for dex. does not have to be on its own domain (can be mounted on a subpath like <outline>/dex). |
| minio.auth.existingSecret | string | `"outline-minio-credentials"` | the existing secret to use for minio auth. |
| minio.auth.forceNewKeys | bool | `true` |  |
| minio.auth.generate | bool | `true` | set to true to generate a set of credentials (and configure outline to use it). |
| minio.auth.rootPassword | string | `""` | minio root password. leave empty (with generate set to true) to generate a password automatically. |
| minio.auth.rootUser | string | `""` | minio root username. leave empty (with generate set to true) to generate a username automatically. |
| minio.defaultBuckets | string | `"ol-data"` |  |
| minio.disableWebUI | bool | `true` |  |
| minio.enabled | bool | `true` |  |
| minio.extraEnvVars[0].name | string | `"MINIO_UPDATE"` |  |
| minio.extraEnvVars[0].value | string | `"off"` |  |
| minio.forceUrlAsHttps | bool | `true` |  |
| minio.mode | string | `"standalone"` |  |
| minio.persistence.enabled | bool | `true` | set to true to enable persistence for minio. |
| minio.persistence.size | string | `"10Gi"` | persistence size to use for minio. |
| minio.persistence.storageClass | string | `""` | storage class to configure for the persistance storage. |
| minio.resources.limits | object | `{"memory":"512Mi"}` | the resources limits for minio. |
| minio.resources.requests | object | `{"cpu":"25m","memory":"512Mi"}` | the resources requests for minio. |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| outline.allowedDomains | string | `""` | comma separated list of domains to be allowed to signin to the wiki. if not set, all domains are allowed by default when using Google OAuth to signin. |
| outline.cdnUrl | string | `""` | if using a Cloudfront/Cloudflare distribution or similar it can be set below. this will cause paths to javascript, stylesheets, and images to be updated to the hostname defined in CDN_URL. in your CDN configuration the origin server should be set to the same as url. |
| outline.collaborationUrl | string | `""` | see https://github.com/outline/outline/blob/main/docs/SERVICES.md for running a separate collaboration server, for normal operation this does not need to be set. |
| outline.database.connectionPoolMax | string | `""` | database maximum connection pool amount. |
| outline.database.connectionPoolMin | string | `""` | database minimum connection pool amount. |
| outline.database.encryptionMode | string | `"disable"` |  |
| outline.debug | bool | `false` | debug flag. may not need if your reverse proxy already logs incoming http requests and this ends up being duplicative. |
| outline.defaultLanguage | string | `"en_US"` | the default interface language. see translate.getoutline.com for a list of available language codes and their rough percentage translated. |
| outline.enableUpdates | bool | `false` | set to true to have outline check for updates by sending anonymized usage data to maintainers. |
| outline.fileStorage.localRootDir | string | `"/var/lib/outline/data"` | if "local" is configured for "system" above, then this sets the parent directory under which all attachments/images go. make sure that the process has permissions to write files to it. |
| outline.fileStorage.system | string | `"s3"` | specify the storage system to use. one of "local" or "s3". if using minio, this should be set to "s3". local is not supported in the chart at this time. |
| outline.fileStorage.uploadMaxSize | int | `26214400` | maximum allowed size for the uploaded attachment. |
| outline.forceHttps | bool | `true` | force redirecting to https. |
| outline.generateEncryptionKeys | bool | `true` | generate encryption keys. if disabled, you must pass SECRET_KEY and UTILS_SECRET environment variables. |
| outline.logLevel | string | `"info"` | configure lowest severity level for server logs. should be one of error, warn, info, http, verbose, debug and silly. |
| outline.maximumImportSize | int | `5120000` | override the maximum size of document imports, could be required if you have especially large word documents with embedded imagery. |
| outline.rateLimiter.durationWindow | int | `60` |  |
| outline.rateLimiter.enabled | bool | `true` |  |
| outline.rateLimiter.requests | int | `1000` |  |
| outline.url | string | `""` | url to use for outline. if not set, the first ingress host will be used (and https will only be configured if the tls section is filled out). |
| outline.webConcurrency | int | `2` | how many processes should be spawned. as a reasonable rule, divide the requested memory for the pod by 512 for a rough estimate. |
| podAnnotations | object | `{}` | annotations to append to the deployment. |
| podSecurityContext | object | `{}` |  |
| postgresql.architecture | string | `"standalone"` | the postgresql architecture to use. can be standalone or replication. |
| postgresql.auth.database | string | `"outline"` | database name to use for outline. |
| postgresql.auth.enablePostgresUser | bool | `false` | assign a password to the postgres admin user. otherwise, remote access will be blocked for this user. |
| postgresql.auth.existingSecret | string | `"outline-postgresql-credentials"` | the existing secret to use for postgresql auth. the postgresql chart will read "postgres-password" and "password" keys from this secret (can be changed). |
| postgresql.auth.generate | bool | `true` | set to true to generate a set of credentials (and configure outline to use it). |
| postgresql.auth.password | string | `""` | password to use for the outline user. leave empty (with generate set to true) to generate a password automatically. |
| postgresql.auth.username | string | `"outline"` | username to use for outline. |
| postgresql.enabled | bool | `true` | set to true to have the chart create a postgresql instance (and configure outline to use it). |
| postgresql.primary.persistence.size | string | `"2Gi"` | persistence size to use for postgresql. |
| postgresql.primary.persistence.storageClass | string | `""` | storage class to configure for the persistance storage. |
| postgresql.primary.resources.limits | object | `{"memory":"512Mi"}` | the resources limits for the postgres primary containers. |
| postgresql.primary.resources.requests | object | `{"cpu":"100m","memory":"512Mi"}` | the resources requests for the postgres primary containers. |
| redis.architecture | string | `"standalone"` | the redis architecture to use. can be standalone or replication. |
| redis.auth.enabled | bool | `false` | set to true to enable redis auth. |
| redis.auth.existingSecret | string | `"outline-redis-credentials"` | the existing secret to use for redis auth. |
| redis.auth.existingSecretPasswordKey | string | `"password"` | the existing secret key to use for redis auth. |
| redis.auth.generate | bool | `true` | set to true to generate a set of credentials (and configure outline to use it). |
| redis.auth.password | string | `""` | the password to use for redis auth. |
| redis.enabled | bool | `true` | set to true to have the chart create a redis instance (and configure outline to use it). |
| redis.master.persistence.enabled | bool | `true` | set to true to enable persistence for redis. |
| redis.master.persistence.size | string | `"1Gi"` | persistence size to use for redis. |
| redis.master.persistence.storageClass | string | `""` | storage class to configure for the persistance storage. |
| redis.master.resources.limits | object | `{"memory":"256Mi"}` | the resources limits for the redis master containers. |
| redis.master.resources.requests | object | `{"cpu":"50m","memory":"256Mi"}` | the resources requests for the redis master containers. |
| resources.limits | object | `{"memory":"1Gi"}` | resource limits. generally don't recommend applying a limit on cpu. |
| resources.requests | object | `{"cpu":"250m","memory":"1Gi"}` | resource requests. |
| securityContext | object | `{}` |  |
| service.port | int | `8081` |  |
| service.type | string | `"ClusterIP"` |  |
| serviceAccount.annotations | object | `{}` | annotations to add to the service account |
| serviceAccount.create | bool | `true` | specifies whether a service account should be created |
| serviceAccount.name | string | `""` | the name of the service account to use. if not set and create is true, a name is generated using the fullname template. |
| tolerations | object | `{}` |  |

## :toolbox: Source References

* <https://github.com/lrstanley/helm-charts>

## :wave: Chart Maintainers

| Name | Email | Url |
| ---- | ------ | --- |
| lrstanley | <me@liamstanley.io> | <https://liam.sh> |

## :raising_hand_man: Support & Assistance

* :heart: Please review the [Code of Conduct](/.github/CODE_OF_CONDUCT.md) for
     guidelines on ensuring everyone has the best experience interacting with
     the community.
* :raising_hand_man: Take a look at the [support](/.github/SUPPORT.md) document on
     guidelines for tips on how to ask the right questions.
* :lady_beetle: For all features/bugs/issues/questions/etc, [head over here](https://github.com/lrstanley/helm-charts/issues/new/choose).

## :handshake: Contributing

* :heart: Please review the [Code of Conduct](/.github/CODE_OF_CONDUCT.md) for guidelines
     on ensuring everyone has the best experience interacting with the
    community.
* :clipboard: Please review the [contributing](/.github/CONTRIBUTING.md) doc for submitting
     issues/a guide on submitting pull requests and helping out.
* :old_key: For anything security related, please review this repositories [security policy](https://github.com/lrstanley/helm-charts/security/policy).
