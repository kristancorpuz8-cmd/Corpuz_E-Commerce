import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { formatPeso, useStore } from '../../context/StoreContext'

export default function Cart() {
  const { cart, products, updateCartQty, removeFromCart, cartTotal, checkout } = useStore()
  const navigate = useNavigate()

  const lines = cart
    .map((line) => {
      const product = products.find((item) => item.id === line.productId)
      if (!product) return null
      return { ...line, product }
    })
    .filter(Boolean)

  const totalItems = lines.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    const result = checkout()
    if (result.ok) navigate('/shop/orders')
  }

  return (
    <div className="cart-page">
      <div className="page-intro">
        <h2>Shopping Cart</h2>
        <p>Review quantities, items, and your estimated total before placing your order.</p>
      </div>

      {!lines.length ? (
        <div className="empty-card text-center p-5">
          <div className="empty-icon-box">
            <i className="bi bi-cart-x empty-icon" aria-hidden="true" />
          </div>
          <h3>Your cart is empty</h3>
          <p className="empty-note">
            Looks like you haven't added any products to your cart yet. Explore our catalog and find something you love.
          </p>
          <Link to="/shop/products" className="btn btn-primary mt-3">
            <i className="bi bi-bag-plus me-1" aria-hidden="true" /> Explore Products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-header-row">
              <span>Product ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              <span className="cart-header-subtotal">Subtotal</span>
            </div>

            <div className="cart-list">
              {lines.map((line) => (
                <article key={line.productId} className="cart-item-card">
                  <div className="cart-item-img-wrap">
                    <img src={line.product.image} alt={line.product.name} loading="lazy" />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-cat">{line.product.category}</span>
                    <h3 className="cart-item-title">{line.product.name}</h3>
                    <p className="cart-item-unit-price">Unit price: {formatPeso(line.product.price)}</p>
                    <div className="qty-control-box">
                      <Button
                        size="sm"
                        variant="outline-light"
                        className="qty-btn"
                        onClick={() => updateCartQty(line.productId, line.quantity - 1)}
                        aria-label={`Decrease quantity of ${line.product.name}`}
                      >
                        <i className="bi bi-dash" aria-hidden="true" />
                      </Button>
                      <span className="qty-value" aria-label={`Current quantity: ${line.quantity}`}>
                        {line.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline-light"
                        className="qty-btn"
                        onClick={() => updateCartQty(line.productId, line.quantity + 1)}
                        aria-label={`Increase quantity of ${line.product.name}`}
                      >
                        <i className="bi bi-plus" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="line-total-box">
                      <span className="line-total-label">Total</span>
                      <strong className="line-total-val">
                        {formatPeso(line.product.price * line.quantity)}
                      </strong>
                    </div>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(line.productId)}
                      aria-label={`Remove ${line.product.name} from cart`}
                    >
                      <i className="bi bi-trash3" aria-hidden="true" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="cart-summary-sidebar">
            <div className="cart-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Selected items</span>
                  <strong>{totalItems}</strong>
                </div>
                <div className="summary-row">
                  <span>Shipping estimate</span>
                  <span className="text-success">Free standard</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-total-row">
                  <span>Total Amount</span>
                  <strong className="summary-total-price">{formatPeso(cartTotal)}</strong>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-100 checkout-btn mt-3"
                onClick={handleCheckout}
              >
                <i className="bi bi-shield-check me-2" aria-hidden="true" />
                <span>Complete Checkout</span>
              </Button>
              <p className="summary-note text-center mt-2">
                <i className="bi bi-lock me-1" aria-hidden="true" /> Encrypted & secure demo transaction
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
