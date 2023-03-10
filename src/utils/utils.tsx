import HomeIcon from '@mui/icons-material/Home'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import StorefrontIcon from '@mui/icons-material/Storefront'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount'
import permissionData from './permission.json'

// Interfaces
export interface Route {
  text: string
  url: string
  icon?: React.ReactNode
}

/**
 * Validation
 * @param permission Permission to validate
 * @param userPermissions Session user permissions
 * @param doesSuperAdminHavePermission Does the super administrator have permission?
 * @returns if user has the permission: true, otherwise false
 */
export function validatePermission (permission: string, userPermissions: string[], doesSuperAdminHavePermission: boolean) {
  const superAdminPermission = process.env.REACT_APP_SUPER_ADMIN_PERMISSION ?? ''
  let havePermission = false
  if (doesSuperAdminHavePermission) {
    havePermission = userPermissions.some(element => element === superAdminPermission)
    if (havePermission) return true
  }

  havePermission = userPermissions.some(element => element === permission)
  return havePermission
}

/**
 * Build available routes of administration for user
 * @param permissions Session user permissions
 * @returns {array} Routes for menu
 */
export function buildSideMenuRoutesAdministration (permissions: string[]) {
  const superAdminPermission = process.env.REACT_APP_SUPER_ADMIN_PERMISSION ?? ''
  const routes:Route[] = [
    { text: 'Inicio', url: '/', icon: <HomeIcon /> }
  ]
  let route:Route = { text: '', url: '' }
  permissions.forEach(permission => {
    if (permission === permissionData.user.user_view || permission === superAdminPermission) {
      route = { text: 'Usuarios', url: '/usuarios', icon: <SwitchAccountIcon/> }
      routes.push(route)
    }

    if (permission === permissionData.provider.provider_view || permission === superAdminPermission) {
      route = { text: 'Proveedores', url: '/proveedores', icon: <LocalShippingIcon /> }
      routes.push(route)
    }

    if (permission === permissionData.entity.entity_view || permission === superAdminPermission) {
      route = { text: 'Entidades', url: '/entidades', icon: <StorefrontIcon /> }
      routes.push(route)
    }

    if (permission === permissionData.receipt.receipt_view || permission === superAdminPermission) {
      route = { text: 'Recetas', url: '/recetas', icon: <MenuBookIcon /> }
      routes.push(route)
    }
  })
  return routes
}

/**
 * Build available routes of entity for user
 * @param permissions Session user permissions
 * @returns {array} Routes for menu
 */
export function buildSideMenuRoutesEntity (permissions: string[]) {
  const routes:Route[] = [
    { text: 'Ayuda', url: '/', icon: <HomeIcon /> }
  ]
  let route:Route = { text: '', url: '' }
  permissions.forEach(permission => {
    if (permission === permissionData.production_stock.production_stock_view) {
      route = { text: 'Producción stock', url: '/produccion-stock' }
      routes.push(route)
    }

    if (permission === permissionData.hall.hall_view) {
      route = { text: 'Salón', url: '/salon' }
      routes.push(route)
    }
  })
  return routes
}