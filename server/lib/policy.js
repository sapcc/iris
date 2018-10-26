const isAdmin = (token) => (token.roles || []).findIndex((r) => r.name=='admin')>0
const isCloudAdminProject = (token) => (token.project && token.project.name == process.env.AUTH_SCOPE_PROJECT)
const isCloudAdminDomain = (token) => (token.project && token.project.domain && token.project.domain.name==process.env.AUTH_SCOPE_DOMAIN)

const isAllowed = (token) =>
  token && isCloudAdminDomain(token) && isCloudAdminProject(token) && isAdmin(token)
;

module.exports = {
  isAllowed
}
