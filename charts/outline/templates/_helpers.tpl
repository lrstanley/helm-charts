{{/*
Expand the name of the chart.
*/}}
{{- define "outline.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "outline.fullname" -}}
{{- if .Values.fullnameOverride }}
  {{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
  {{- $name := default .Chart.Name .Values.nameOverride }}
  {{- if contains $name .Release.Name }}
    {{- .Release.Name | trunc 63 | trimSuffix "-" }}
  {{- else }}
    {{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
  {{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "outline.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "outline.labels" -}}
helm.sh/chart: {{ include "outline.chart" . | quote }}
{{ include "outline.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service | quote }}
app.kubernetes.io/part-of: {{ .Chart.Name | quote }}
app.kubernetes.io/version: {{ .Values.image.tag | default .Chart.AppVersion | quote }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "outline.selectorLabels" -}}
app.kubernetes.io/name: {{ include "outline.name" . | quote }}
app.kubernetes.io/instance: {{ .Release.Name | quote }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "outline.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
  {{- default (include "outline.fullname" .) .Values.serviceAccount.name }}
{{- else }}
  {{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- /*
Returns given number of random Hex characters.
  - randNumeric 4 | atoi generates a random number in [0, 10^4)
      This is a range range evenly divisble by 16, but even if off by one,
      that last partial interval offsetting randomness is only 1 part in 625.
  - mod N 16 maps to the range 0-15
  - printf "%x" represents a single number 0-15 as a single hex character
*/}}
{{- define "outline.randHex" -}}
{{- $result := "" }}
{{- range $i := until . }}
  {{- $rand_hex_char := mod (randNumeric 4 | atoi) 16 | printf "%x" }}
  {{- $result = print $result $rand_hex_char }}
{{- end }}
{{- $result }}
{{- end }}

{{- /*
Generates the appropriate URL for Outline.
*/}}
{{- define "outline.url" -}}
{{- if .Values.outline.url -}}
  {{- .Values.outline.url -}}
{{- else if gt (len .Values.ingress.hosts) 0 -}}
  {{- $host := first .Values.ingress.hosts }}
  {{- if gt (len .Values.ingress.tls) 0 -}}
    https://{{ if kindIs "string" $host }}{{ $host }}{{ else }}{{ $host.host }}{{ end -}}
  {{- else -}}
    http://{{ if kindIs "string" $host }}{{ $host }}{{ else }}{{ $host.host }}{{ end -}}
  {{- end -}}
{{- end -}}
{{- end }}

{{- /*
CNPG cluster name.
*/}}
{{- define "outline.cnpgName" -}}
{{- printf "%s-postgres" (include "outline.fullname" .) -}}
{{- end }}

{{- /*
Environment variables passed to the Outline container and related containers.
*/}}
{{- define "outline.envs" -}}
{{- /* https://github.com/outline/outline/blob/main/.env.sample */ -}}
- name: NODE_ENV
  value: "production"
{{- if .Values.outline.generateEncryptionKeys }}
- name: SECRET_KEY
  valueFrom:
    secretKeyRef:
      name: {{ printf "%s-enc-keys" (include "outline.fullname" .) | trunc 63 | trimSuffix "-" | quote }}
      key: secret-key
- name: UTILS_SECRET
  valueFrom:
    secretKeyRef:
      name: {{ printf "%s-enc-keys" (include "outline.fullname" .) | trunc 63 | trimSuffix "-" | quote }}
      key: utils-secret
{{- end }}
- name: FORCE_HTTPS
  value: {{ .Values.outline.forceHttps | quote }}
- name: COLLABORATION_URL
  value: {{ .Values.outline.collaborationUrl | quote }}
- name: ENABLE_UPDATES
  value: {{ .Values.outline.enableUpdates | quote }}
- name: WEB_CONCURRENCY
  value: {{ .Values.outline.webConcurrency | quote }}
- name: MAXIMUM_IMPORT_SIZE
  value: {{ printf "%0.f" .Values.outline.maximumImportSize | quote }}
- name: LOG_LEVEL
  value: {{ .Values.outline.logLevel | quote }}
{{- if .Values.outline.debug }}
- name: DEBUG
  value: {{ .Values.outline.debug | quote }}
{{- end }}
- name: ALLOWED_DOMAINS
  value: {{ .Values.outline.allowedDomains | quote }}
- name: DEFAULT_LANGUAGE
  value: {{ .Values.outline.defaultLanguage | quote }}
- name: PGSSLMODE
  value: {{ .Values.outline.database.encryptionMode | quote }}
- name: DATABASE_CONNECTION_POOL_MIN
  value: {{ .Values.outline.database.connectionPoolMin | quote }}
- name: DATABASE_CONNECTION_POOL_MAX
  value: {{ .Values.outline.database.connectionPoolMax | quote }}
- name: FILE_STORAGE
  value: {{ .Values.outline.fileStorage.system | quote }}
- name: FILE_STORAGE_UPLOAD_MAX_SIZE
  value: {{ printf "%0.f" .Values.outline.fileStorage.uploadMaxSize | quote }}
- name: FILE_STORAGE_LOCAL_ROOT_DIR
  value: {{ .Values.outline.fileStorage.localRootDir | quote }}
{{- if .Values.outline.rateLimiter.enabled }}
- name: RATE_LIMITER_ENABLED
  value: {{ .Values.outline.rateLimiter.enabled | quote }}
- name: RATE_LIMITER_REQUESTS
  value: {{ printf "%0.f" .Values.outline.rateLimiter.requests | quote }}
- name: RATE_LIMITER_DURATION_WINDOW
  value: {{ printf "%0.f" .Values.outline.rateLimiter.durationWindow | quote }}
{{- end }}
- name: URL
  value: {{ include "outline.url" . | quote }}
- name: CDN_URL
  value: {{ .Values.outline.cdnUrl | quote }}
- name: PORT
  value: {{ .Values.service.port | quote }}
{{- if .Values.redis.enabled }}
{{- if and .Values.redis.auth.enabled .Values.redis.auth.generate }}
- name: REDIS_URL
  valueFrom:
    secretKeyRef:
      name: {{ .Values.redis.auth.existingSecret | quote }}
      key: "ioredis"
{{- else if and .Values.redis.auth.enabled .Values.redis.auth.password }}
- name: REDIS_URL
  value: "redis://{{ .Values.redis.auth.password }}@{{ .Release.Name }}-redis-master:{{ .Values.redis.master.service.ports.redis }}"
{{- else }}
- name: REDIS_URL
  value: "redis://{{ .Release.Name }}-redis-master:{{ .Values.redis.master.service.ports.redis }}"
{{- end }}
{{- end }}
{{- if .Values.postgresql.enabled }}
{{- if .Values.postgresql.auth.generate }}
- name: DATABASE_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ .Values.postgresql.auth.existingSecret | quote }}
      key: {{ (.Values.postgresql.auth.secretKeys.userPasswordKey | default "password") | quote }}
- name: DATABASE_URL
  value: "postgresql://{{ .Values.postgresql.auth.username }}:$(DATABASE_PASSWORD)@{{ .Release.Name }}-postgresql:{{ .Values.postgresql.primary.service.ports.postgresql }}/{{ .Values.postgresql.auth.database }}"
{{- else if and .Values.postgresql.auth.username .Values.postgresql.auth.password }}
- name: DATABASE_URL
  value: "postgresql://{{ .Values.postgresql.auth.username }}:{{ .Values.postgresql.auth.password }}@{{ .Release.Name }}-postgresql:{{ .Values.postgresql.primary.service.ports.postgresql }}/{{ .Values.postgresql.auth.database }}"
{{- end }}
{{- end }}
{{- if .Values.cnpg.enabled }}
{{- if .Values.cnpg.auth.generate }}
- name: DATABASE_USERNAME
  valueFrom:
    secretKeyRef:
      name: {{ .Values.cnpg.auth.existingSecret | quote }}
      key: "username"
- name: DATABASE_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ .Values.cnpg.auth.existingSecret | quote }}
      key: "password"
- name: DATABASE_URL
  value: "postgresql://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@{{ include "outline.cnpgName" . }}-rw:5432/{{ .Values.cnpg.database }}"
{{- else if and .Values.cnpg.auth.username .Values.cnpg.auth.password }}
- name: DATABASE_URL
  value: "postgresql://{{ .Values.cnpg.auth.username }}:{{ .Values.cnpg.auth.password }}@{{ include "outline.cnpgName" . }}-rw:5432/{{ .Values.cnpg.database }}"
{{- end }}
{{- end }}
{{- if .Values.minio.enabled }}
- name: AWS_ACCESS_KEY_ID
  valueFrom:
    secretKeyRef:
      name: {{ .Values.minio.auth.existingSecret | quote }}
      key: "root-user"
- name: AWS_SECRET_ACCESS_KEY
  valueFrom:
    secretKeyRef:
      name: {{ .Values.minio.auth.existingSecret | quote }}
      key: "root-password"
- name: AWS_REGION
  value: "us-east-1"
- name: AWS_S3_UPLOAD_BUCKET_URL
  value: "{{ if or .Values.minio.forceUrlAsHttps .Values.minio.apiIngress.tls }}https{{ else }}http{{ end }}://{{ .Values.minio.apiIngress.hostname }}"
- name: AWS_S3_UPLOAD_BUCKET_NAME
  value: {{ .Values.minio.defaultBuckets | quote }}
- name: AWS_S3_FORCE_PATH_STYLE
  value: "true"
- name: AWS_S3_ACL
  value: "private"
{{ end }}
{{- with .Values.environment }}
{{- toYaml . | nindent 0 }}
{{- end }}
{{- end }}
