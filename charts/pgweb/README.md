<p align="center">
  <img title="Logo" src="https://liam.sh/-/gh/svg?title=pgweb&description=A Helm chart for pgweb&layout=left&icon=simple-icons%3Ahelm&icon.height=100&font=1.15&bg=topography&bgcolor=rgba(2%2C+0%2C+26%2C+1)"></img>
</p>

<p align="center">
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/pgweb/Chart.yaml">
    <img title="Chart Version" src="https://img.shields.io/badge/chart%20version-1.0.5-blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/pgweb/Chart.yaml">
    <img title="App Version" src="https://img.shields.io/badge/app%20version-0.14.0-blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/pgweb/Chart.yaml">
    <img title="Chart Type" src="https://img.shields.io/badge/chart%20type-application-blue?style=flat-square">
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
helm install lrstanley/pgweb
```

To install the chart with the release name `my-release`:

```console
helm install my-release lrstanley/pgweb
```

To install with some set values:

```console
helm install my-release lrstanley/pgweb --set values_key1=value1 --set values_key2=value2
```

To install with custom values file:

```console
helm install my-release lrstanley/pgweb -f values.yaml
```

## :gear: Helm Configuration Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| environment | object | `{}` | environment variables to set in the deployment. |
| environmentFrom | list | `[]` | have an existing secret or config-map that contains sensitive env vars? supply the name here. |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` | the image pull policy (generally shouldn't be changed). |
| image.repository | string | `"ghcr.io/sosedoff/pgweb"` | the image repository to pull from. |
| image.tag | string | `""` | the image tag to use. defaults to the appVersion in Chart.yaml. |
| ingress.annotations | object | `{}` | additional annotations to add to the ingress resource. |
| ingress.className | string | `""` | class name to use for the ingress resource. |
| ingress.enabled | bool | `false` | set to true to create an ingress resource. |
| ingress.hosts | list | `[{"host":"chart-example.local","paths":[{"path":"/","pathType":"ImplementationSpecific"}]}]` | hosts to include in the ingress resource. |
| ingress.hosts[0] | object | `{"host":"chart-example.local","paths":[{"path":"/","pathType":"ImplementationSpecific"}]}` | host name to use. |
| ingress.hosts[0].paths[0] | object | `{"path":"/","pathType":"ImplementationSpecific"}` | path to use, generally shouldn't be changed in most cases. |
| ingress.tls | list | `[]` |  |
| initContainers | list | `[]` | additional init containers to add to the deployment. |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` | annotations to append to the deployment. |
| podSecurityContext | object | `{}` |  |
| resources.limits | object | `{"memory":"100Mi"}` | resource limits. generally don't recommend applying a limit on cpu. |
| resources.requests | object | `{"cpu":"10m","memory":"25Mi"}` | resource requests. |
| securityContext | object | `{}` |  |
| service.port | int | `8081` |  |
| service.type | string | `"ClusterIP"` |  |
| serviceAccount.annotations | object | `{}` | annotations to add to the service account |
| serviceAccount.create | bool | `true` | specifies whether a service account should be created |
| serviceAccount.name | string | `""` | the name of the service account to use. if not set and create is true, a name is generated using the fullname template |
| tolerations | object | `{}` |  |

## :toolbox: Source References

* <https://github.com/sosedoff/pgweb>

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
