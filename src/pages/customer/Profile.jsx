import { STORE_NAME } from '../../data/seed'
import { useStore } from '../../context/StoreContext'

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'CU'
}

export default function Profile() {
  const { user } = useStore()
  const initials = getInitials(user?.name)

  return (
    <div className="profile-page">
      <div className="page-intro">
        <h2>Customer Profile</h2>
        <p>Personal account details, shipping destination, and customer preferences.</p>
      </div>

      <div className="profile-header-card">
        <div className="profile-header-avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="profile-header-info">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h3 className="profile-name">{user?.name}</h3>
            <span className="profile-role-badge">
              <i className="bi bi-shield-check me-1 text-success" aria-hidden="true" /> Verified Customer
            </span>
          </div>
          <p className="profile-email-sub">{user?.email}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-person-fill" />
          </div>
          <div className="profile-card-body">
            <span>Customer Name</span>
            <strong>{user?.name}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-envelope-at-fill" />
          </div>
          <div className="profile-card-body">
            <span>Email Address</span>
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
            <span>Delivery Address</span>
            <strong>{user?.address}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-shop" />
          </div>
          <div className="profile-card-body">
            <span>Primary Store</span>
            <strong>{STORE_NAME}</strong>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-icon" aria-hidden="true">
            <i className="bi bi-calendar-check-fill" />
          </div>
          <div className="profile-card-body">
            <span>Member Since</span>
            <strong>{user?.memberSince}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
