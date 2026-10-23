import { STORE_NAME } from '../../data/seed'
import { useStore } from '../../context/StoreContext'

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'SP'
}

export default function SellerProfile() {
  const { user } = useStore()
  const initials = getInitials(user?.name)

  return (
    <div className="profile-page">
      <div className="page-intro">
        <h2>Merchant & Store Profile</h2>
        <p>Merchant account details, store credentials, and official business address.</p>
      </div>

      <div className="profile-header-card seller-header-card">
        <div className="profile-header-avatar seller-avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="profile-header-info">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h3 className="profile-name">{user?.storeName || STORE_NAME}</h3>
            <span className="profile-role-badge seller-badge">
              <i className="bi bi-patch-check-fill text-info me-1" aria-hidden="true" /> Official Merchant
            </span>
          </div>
          <p className="profile-email-sub">Operated by {user?.name} · {user?.email}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-person-badge-fill" />
          </div>
          <div className="profile-card-body">
            <span>Store Owner</span>
            <strong>{user?.name}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-shop-window" />
          </div>
          <div className="profile-card-body">
            <span>Registered Store Name</span>
            <strong>{user?.storeName || STORE_NAME}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-envelope-at-fill" />
          </div>
          <div className="profile-card-body">
            <span>Business Email</span>
            <strong>{user?.email}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-telephone-fill" />
          </div>
          <div className="profile-card-body">
            <span>Contact Number</span>
            <strong>{user?.phone}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-geo-alt-fill" />
          </div>
          <div className="profile-card-body">
            <span>Store Address</span>
            <strong>{user?.address}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-calendar2-check-fill" />
          </div>
          <div className="profile-card-body">
            <span>Merchant Since</span>
            <strong>{user?.memberSince}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
