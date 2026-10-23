import { Form, Table } from 'react-bootstrap'
import HorizontalScrollWrapper from '../../components/HorizontalScrollWrapper'
import { formatPeso, useStore } from '../../context/StoreContext'

export default function SellerOrders() {
  const { orders, updateOrderStatus } = useStore()

  return (
    <div className="seller-orders-page">
      <div className="page-intro split">
        <div>
          <h2>Manage Customer Orders</h2>
          <p>Monitor customer checkout requests, update shipment tracking status, and verify transactions.</p>
        </div>
        <span className="orders-summary-pill">
          <i className="bi bi-receipt-cutoff me-1" aria-hidden="true" />
          {orders.length} {orders.length === 1 ? 'total order' : 'total orders'}
        </span>
      </div>

      {!orders.length ? (
        <div className="empty-card text-center p-5">
          <div className="empty-icon-box">
            <i className="bi bi-inbox empty-icon" aria-hidden="true" />
          </div>
          <h3>No customer orders yet</h3>
          <p className="empty-note">
            When customers purchase products from your catalog, their order details and fulfillment controls will appear here.
          </p>
        </div>
      ) : (
        <HorizontalScrollWrapper label="order management columns">
          <Table responsive className="data-table" variant="dark">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer Details</th>
                <th scope="col">Products Ordered</th>
                <th scope="col">Update Status</th>
                <th scope="col" className="text-end">Order Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="order-id-badge">
                      <i className="bi bi-receipt me-1" aria-hidden="true" />
                      {order.id}
                    </span>
                    <span className="d-block small text-muted mt-1">{order.date}</span>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <strong className="customer-name">{order.customerName}</strong>
                      <span className="customer-email">{order.customerEmail}</span>
                    </div>
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
                    <div className={`status-select-wrap status-${order.status.toLowerCase()}`}>
                      <Form.Select
                        size="sm"
                        value={order.status}
                        aria-label={`Change fulfillment status for order ${order.id}`}
                        onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                        className="status-dropdown"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>
                    </div>
                  </td>
                  <td className="text-end">
                    <strong className="order-total-val">{formatPeso(order.total)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </HorizontalScrollWrapper>
      )}
    </div>
  )
}
