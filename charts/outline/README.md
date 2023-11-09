<p align="center">
  <img title="Logo" src="https://liam.sh/-/gh/svg?title=outline&description=The outline helm chart to deploy outline in kubernetes clusters.&layout=left&icon=simple-icons%3Ahelm&icon.height=100&font=1.15&bg=topography&bgcolor=rgba(2%2C+0%2C+26%2C+1)"></img>
</p>

<p align="center">
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/outline/Chart.yaml">
    <img title="Chart Version" src="https://img.shields.io/badge/chart%20version-1.0.0-blue?style=flat-square">
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
| dex | object | `{"config":{"connectors":[{"config":{"clientID":"your-github-client-id","clientSecret":"your-github-client-secret","loadAllGroups":true,"redirectURI":"https://chart-example.local/dex/callback","teamNameField":"slug","useLoginAsID":false},"id":"github","name":"GitHub","type":"github"}],"issuer":"http://my-issuer-url.com","oauth2":{"skipApprovalScreen":true},"staticClients":[{"id":"outline-client-id","name":"Outline","redirectURIs":["https://chart-example.local/auth/oidc.callback"],"secret":"outline-client-secret"}],"storage":{"type":"memory"}},"enabled":false,"ingress":{"className":"","enabled":true,"hosts":[{"host":"chart-example.local","paths":[{"path":"/dex","pathType":"ImplementationSpecific"}]}]},"resources":{"limits":{"memory":"128Mi"},"requests":{"cpu":"25m","memory":"128Mi"}}}` | dex sub-chart configuration. dex can be used to easily configure most oauth2 providers via OIDC, without having to have the enterprise version of Outline. this should allow pointing to things like GitHub. more info: https://artifacthub.io/packages/helm/dex/dex |
| dex.config | object | `{"connectors":[{"config":{"clientID":"your-github-client-id","clientSecret":"your-github-client-secret","loadAllGroups":true,"redirectURI":"https://chart-example.local/dex/callback","teamNameField":"slug","useLoginAsID":false},"id":"github","name":"GitHub","type":"github"}],"issuer":"http://my-issuer-url.com","oauth2":{"skipApprovalScreen":true},"staticClients":[{"id":"outline-client-id","name":"Outline","redirectURIs":["https://chart-example.local/auth/oidc.callback"],"secret":"outline-client-secret"}],"storage":{"type":"memory"}}` | config is the dex config to use. can also be pulled from a secret directly. |
| dex.ingress | object | `{"className":"","enabled":true,"hosts":[{"host":"chart-example.local","paths":[{"path":"/dex","pathType":"ImplementationSpecific"}]}]}` | ingress configuration for dex. does not have to be on its own domain (can be mounted on a subpath like <outline>/dex). |
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
| ingress.hosts | list | `[{"host":"chart-example.local","paths":[{"path":"/","pathType":"ImplementationSpecific"}]}]` | hosts to include in the ingress resource. |
| ingress.tls | list | `[]` |  |
| initContainers | list | `[]` | additional init containers to add to the deployment. |
| minio | object | `{"apiIngress":{"enabled":true,"hostname":"s3.chart-example.local","ingressClassName":""},"auth":{"existingSecret":"outline-minio-credentials","forceNewKeys":true,"generate":true,"rootPassword":"","rootUser":""},"defaultBuckets":"ol-data","disableWebUI":true,"enabled":true,"extraEnvVars":[{"name":"MINIO_UPDATE","value":"off"}],"forceUrlAsHttps":true,"mode":"standalone","persistence":{"enabled":true,"size":"10Gi","storageClass":""},"resources":{"limits":{"memory":"512Mi"},"requests":{"cpu":"25m","memory":"512Mi"}}}` | minio sub-chart configuration. more info: https://artifacthub.io/packages/helm/bitnami/minio |
| minio.apiIngress | object | `{"enabled":true,"hostname":"s3.chart-example.local","ingressClassName":""}` | ingress configuration for dex. does not have to be on its own domain (can be mounted on a subpath like <outline>/dex). |
| minio.auth.existingSecret | string | `"outline-minio-credentials"` | the existing secret to use for minio auth. |
| minio.auth.generate | bool | `true` | set to true to generate a set of credentials (and configure outline to use it). |
| minio.auth.rootPassword | string | `""` | minio root password. leave empty (with generate set to true) to generate a password automatically. |
| minio.auth.rootUser | string | `""` | minio root username. leave empty (with generate set to true) to generate a username automatically. |
| minio.persistence.enabled | bool | `true` | set to true to enable persistence for minio. |
| minio.persistence.size | string | `"10Gi"` | persistence size to use for minio. |
| minio.persistence.storageClass | string | `""` | storage class to configure for the persistance storage. |
| minio.resources.limits | object | `{"memory":"512Mi"}` | the resources limits for minio. |
| minio.resources.requests | object | `{"cpu":"25m","memory":"512Mi"}` | the resources requests for minio. |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| outline | object | `{"allowedDomains":"","cdnUrl":"","collaborationUrl":"","database":{"connectionPoolMax":"","connectionPoolMin":"","encryptionMode":"disable"},"debug":false,"defaultLanguage":"en_US","enableUpdates":false,"fileStorage":{"localRootDir":"/var/lib/outline/data","system":"s3","uploadMaxSize":26214400},"forceHttps":true,"generateEncryptionKeys":true,"logLevel":"info","maximumImportSize":5120000,"rateLimiter":{"durationWindow":60,"enabled":true,"requests":1000},"url":"","webConcurrency":2}` | application settings for outline. |
| outline.allowedDomains | string | `""` | comma separated list of domains to be allowed to signin to the wiki. if not set, all domains are allowed by default when using Google OAuth to signin. |
| outline.cdnUrl | string | `""` | if using a Cloudfront/Cloudflare distribution or similar it can be set below. this will cause paths to javascript, stylesheets, and images to be updated to the hostname defined in CDN_URL. in your CDN configuration the origin server should be set to the same as url. |
| outline.collaborationUrl | string | `""` | see https://github.com/outline/outline/blob/main/docs/SERVICES.md for running a separate collaboration server, for normal operation this does not need to be set. |
| outline.database.connectionPoolMax | string | `""` | database maximum connection pool amount. |
| outline.database.connectionPoolMin | string | `""` | database minimum connection pool amount. |
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
| redis | object | `{"architecture":"standalone","auth":{"enabled":false,"existingSecret":"outline-redis-credentials","existingSecretPasswordKey":"password","generate":true,"password":""},"enabled":true,"master":{"persistence":{"enabled":true,"size":"1Gi","storageClass":""},"resources":{"limits":{"memory":"256Mi"},"requests":{"cpu":"50m","memory":"256Mi"}}}}` | redis sub-chart configuration. more info: https://artifacthub.io/packages/helm/bitnami/redis |
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
| resources.limits.memory | string | `"1Gi"` |  |
| resources.requests.cpu | string | `"250m"` |  |
| resources.requests.memory | string | `"1Gi"` |  |
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
