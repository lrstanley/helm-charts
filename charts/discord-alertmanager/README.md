<p align="center">
  <img title="Logo" src="https://liam.sh/-/gh/svg?title=discord-alertmanager&description=AlertManager Discord Bot&layout=left&icon=simple-icons%3Ahelm&icon.height=100&font=1.15&bg=topography&bgcolor=rgba(2%2C+0%2C+26%2C+1)"></img>
</p>

<p align="center">
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/discord-alertmanager/Chart.yaml">
    <img title="Chart Version" src="https://img.shields.io/badge/chart%20version-1.0.1-blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/discord-alertmanager/Chart.yaml">
    <img title="App Version" src="https://img.shields.io/badge/app%20version-1.0.0-blue?style=flat-square">
  </a>
  <a href="https://github.com/lrstanley/helm-charts/blob/master/charts/discord-alertmanager/Chart.yaml">
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
helm install lrstanley/discord-alertmanager
```

To install the chart with the release name `my-release`:

```console
helm install my-release lrstanley/discord-alertmanager
```

To install with some set values:

```console
helm install my-release lrstanley/discord-alertmanager --set values_key1=value1 --set values_key2=value2
```

To install with custom values file:

```console
helm install my-release lrstanley/discord-alertmanager -f values.yaml
```

## :gear: Helm Configuration Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| environment | object | `{}` | environment variables to set in the deployment. |
| environmentFrom | list | `[]` | have an existing secret or config-map that contains sensitive env vars? supply the name here. |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"Always"` |  |
| image.repository | string | `"ghcr.io/lrstanley/discord-alertmanager"` |  |
| image.tag | string | `""` |  |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| replicaCount | int | `1` | number of replicas; this should generally always be 1. |
| resources.limits.memory | string | `"50Mi"` |  |
| resources.requests.cpu | string | `"10m"` |  |
| resources.requests.memory | string | `"20Mi"` |  |
| securityContext | object | `{}` |  |
| serviceAccount.annotations | object | `{}` | annotations to add to the service account. |
| serviceAccount.create | bool | `true` | specifies whether a service account should be created. |
| serviceAccount.name | string | `""` | the name of the service account to use. if not set and create is true, a name is generated using the fullname template. |
| tolerations | object | `{}` |  |

## :toolbox: Source References

* <https://github.com/lrstanley/discord-alertmanager>

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
