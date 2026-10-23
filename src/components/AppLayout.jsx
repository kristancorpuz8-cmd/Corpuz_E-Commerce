import { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { STORE_NAME } from '../data/seed'
import { useStore } from '../context/StoreContext'

const customerLinks = [
  { to: '/shop', label: 'Home', icon: 'bi-house' },
  { to: '/shop/products', label: 'Products', icon: 'bi-box-seam' },
  { to: '/shop/categories', label: 'Categories', icon: 'bi-tags' },
  { to: '/shop/cart', label: 'Cart', icon: 'bi-cart3' },
  { to: '/shop/wishlist', label: 'Wishlist', icon: 'bi-heart' },
  { to: '/shop/orders', label: 'My Orders', icon: 'bi-clipboard-check' },
  { to: '/shop/profile', label: 'Profile', icon: 'bi-person' },
]

const sellerLinks = [
  { to: '/seller', label: 'Dashboard', icon: 'bi-speedometer2' },
  { to: '/seller/products', label: 'Manage Products', icon: 'bi-box-seam' },
  { to: '/seller/add-product', label: 'Add Product', icon: 'bi-plus-square' },
  { to: '/seller/orders', label: 'Orders', icon: 'bi-receipt' },
  { to: '/seller/profile', label: 'Seller Profile', icon: 'bi-shop' },
]

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U'
}

export default function AppLayout({ role }) {
  const { user, logout, cartCount, toast } = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const links = role === 'seller' ? sellerLinks : customerLinks

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = getInitials(user?.name)

  return (
    <div className={`app-shell ${open ? 'menu-open' : ''}`}>
      <aside className="sidebar" aria-label="Main Navigation">
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <i className="bi bi-shop-window" aria-hidden="true" />
          </div>
          <div className="brand-meta">
            <strong className="brand-name">{STORE_NAME}</strong>
            <span className="brand-sub">
              {role === 'seller' ? 'Seller Workspace' : 'Customer Store'}
            </span>
          </div>
          {open ? (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
            >
              <i className="bi bi-x-lg" />
            </button>
          ) : null}
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/shop' || link.to === '/seller'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <i className={`bi ${link.icon}`} aria-hidden="true" />
              <span className="nav-text">{link.label}</span>
              {link.label === 'Cart' && cartCount > 0 ? (
                <Badge bg="primary" pill className="nav-badge">
                  {cartCount}
                </Badge>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button
            variant="outline-light"
            className="logout-btn"
            onClick={handleLogout}
            aria-label="Log out of your account"
          >
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {open ? (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="workspace">
        <header className="topbar">
          <Button
            variant="outline-light"
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation drawer"
            aria-expanded={open}
          >
            <i className="bi bi-list" aria-hidden="true" />
          </Button>

          <div className="topbar-heading">
            <span className="eyebrow">
              {role === 'seller' ? 'Seller Workspace' : 'Customer Store'}
            </span>
            <h1 className="topbar-title">{user?.name}</h1>
          </div>

          <div className="topbar-user">
            <div className="user-chip">
              <div className="user-avatar" aria-hidden="true">
                {initials}
              </div>
              <div className="user-meta">
                <span className="user-email">{user?.email}</span>
                <span className="role-pill">
                  {role === 'seller' ? 'Seller Account' : 'Customer Account'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="page-body" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      {toast ? (
        <div className="toast-note" role="status" aria-live="polite">
          <i className="bi bi-check-circle-fill toast-icon" aria-hidden="true" />
          <span className="toast-text">{toast}</span>
        </div>
      ) : null}
    </div>
  )
}
