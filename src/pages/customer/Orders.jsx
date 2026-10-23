import { Badge, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HorizontalScrollWrapper from '../../components/HorizontalScrollWrapper'
import { formatPeso, useStore } from '../../context/StoreContext'

const statusConfig = {
  Processing: { variant: 'warning', icon: 'bi-hourglass-split' },
  Shipped: { variant: 'info', icon: 'bi-truck' },
  Delivered: { variant: 'success', icon: 'bi-check-circle-fill' },
  Cancelled: { variant: 'secondary', icon: 'bi-x-circle' },
}

export default function Orders() {
  const { orders, user } = useStore()
  const mine = orders.filter((order) => order.customerEmail === user?.email)

  return (
    <div className="orders-page">
      <div className="page-intro split">
        <div>
          <h2>Order History</h2>
          <p>Track your past purchases, order status updates, and fulfillment details.</p>
        </div>
        {mine.length ? (
          <span className="orders-summary-pill">
            <i className="bi bi-box2-heart me-1" aria-hidden="true" />
            {mine.length} {mine.length === 1 ? 'total order' : 'total orders'}
          </span>
        ) : null}
      </div>

      {!mine.length ? (
        <div className="empty-card text-center p-5">
          <div className="empty-icon-box">
            <i className="bi bi-receipt empty-icon" aria-hidden="true" />
          </div>
          <h3>No orders placed yet</h3>
          <p className="empty-note">
            When you checkout products from your shopping cart, your tracking records and invoices will appear here.
          </p>
          <Link to="/shop/products" className="btn btn-primary mt-3">
            <i className="bi bi-cart3 me-1" aria-hidden="true" /> Start Shopping
          </Link>
        </div>
      ) : (
        <HorizontalScrollWrapper label="order history columns">
          <Table responsive className="data-table" variant="dark">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Date Placed</th>
                <th scope="col">Items Ordered</th>
                <th scope="col">Fulfillment Status</th>
                <th scope="col" className="text-end">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {mine.map((order) => {
                const conf = statusConfig[order.status] || { variant: 'secondary', icon: 'bi-info-circle' }
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id-badge">
                        <i className="bi bi-receipt me-1" aria-hidden="true" />
                        {order.id}
                      </span>
                    </td>
                    <td>
                      <span className="order-date">
                        <i className="bi bi-calendar3 me-1 text-muted" aria-hidden="true" />
                        {order.date}
                      </span>
                    </td>
                    <td>
                      <div className="order-items-list">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="order-item-chip">
                            {item.name} <strong className="text-info">×{item.quantity}</strong>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <Badge bg={conf.variant} className="status-badge">
                        <i className={`bi ${conf.icon} me-1`} aria-hidden="true" />
                        {order.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <strong className="order-total-val">{formatPeso(order.total)}</strong>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </HorizontalScrollWrapper>
      )}
    </div>
  )
}
