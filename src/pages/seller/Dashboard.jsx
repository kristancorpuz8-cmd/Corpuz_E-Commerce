import { Col, Row } from 'react-bootstrap'
import { formatPeso, useStore } from '../../context/StoreContext'

export default function Dashboard() {
  const { user, products, orders } = useStore()
  const sales = orders.reduce((sum, order) => sum + order.total, 0)
  const processing = orders.filter((order) => order.status === 'Processing').length

  return (
    <div className="dashboard-page">
      <div className="page-intro">
        <h2>Welcome, {user?.name || 'Seller'}.</h2>
        <p>Real-time overview of your catalog inventory, active buyer orders, and revenue metrics.</p>
      </div>

      <Row xs={1} md={3} className="g-3">
        <Col>
          <div className="stat-card stat-products">
            <div className="stat-top">
              <div className="stat-icon-wrap bg-primary-soft">
                <i className="bi bi-box-seam text-info" aria-hidden="true" />
              </div>
              <span className="stat-badge">Inventory</span>
            </div>
            <div className="stat-body">
              <span className="stat-label">Active Listed Products</span>
              <strong className="stat-number">{products.length}</strong>
              <p className="stat-footer-text">Total items available in catalog</p>
            </div>
          </div>
        </Col>

        <Col>
          <div className="stat-card stat-orders">
            <div className="stat-top">
              <div className="stat-icon-wrap bg-warning-soft">
                <i className="bi bi-receipt text-warning" aria-hidden="true" />
              </div>
              <span className="stat-badge warning">Fulfillment</span>
            </div>
            <div className="stat-body">
              <span className="stat-label">Customer Orders</span>
              <strong className="stat-number">{orders.length}</strong>
              <p className="stat-footer-text">
                <span className="processing-indicator">
                  <i className="bi bi-hourglass-split me-1" aria-hidden="true" />
                  <strong>{processing}</strong> awaiting fulfillment
                </span>
              </p>
            </div>
          </div>
        </Col>

        <Col>
          <div className="stat-card stat-sales">
            <div className="stat-top">
              <div className="stat-icon-wrap bg-success-soft">
                <i className="bi bi-cash-stack text-success" aria-hidden="true" />
              </div>
              <span className="stat-badge success">Revenue</span>
            </div>
            <div className="stat-body">
              <span className="stat-label">Total Gross Sales</span>
              <strong className="stat-number">{formatPeso(sales)}</strong>
              <p className="stat-footer-text">Combined volume from all orders</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
