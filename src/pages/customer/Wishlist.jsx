import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatPeso, useStore } from '../../context/StoreContext'

export default function Wishlist() {
  const { wishlist, products, moveWishlistToCart, toggleWishlist } = useStore()
  const saved = products.filter((product) => wishlist.includes(product.id))

  return (
    <div className="wishlist-page">
      <div className="page-intro split">
        <div>
          <h2>My Wishlist</h2>
          <p>Saved favorites you can easily transfer to your shopping cart or track over time.</p>
        </div>
        {saved.length ? (
          <span className="wishlist-counter-badge">
            <i className="bi bi-heart-fill text-danger me-1" aria-hidden="true" />
            {saved.length} {saved.length === 1 ? 'saved item' : 'saved items'}
          </span>
        ) : null}
      </div>

      {!saved.length ? (
        <div className="empty-card text-center p-5">
          <div className="empty-icon-box">
            <i className="bi bi-heart empty-icon" aria-hidden="true" />
          </div>
          <h3>Your wishlist is empty</h3>
          <p className="empty-note">
            Tap the heart icon on any product card in our catalog to save your favorite items here for later.
          </p>
          <Link to="/shop/products" className="btn btn-primary mt-3">
            <i className="bi bi-compass me-1" aria-hidden="true" /> Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="wish-list">
          {saved.map((product) => (
            <article key={product.id} className="wish-item-card">
              <div className="wish-item-img-wrap">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="wish-item-details">
                <span className="wish-item-category">{product.category}</span>
                <h3 className="wish-item-title">{product.name}</h3>
                <p className="wish-item-price">{formatPeso(product.price)}</p>
              </div>
              <div className="wish-actions">
                <Button
                  size="sm"
                  variant="primary"
                  className="move-cart-btn"
                  onClick={() => moveWishlistToCart(product.id)}
                  aria-label={`Move ${product.name} to cart`}
                >
                  <i className="bi bi-cart-plus me-1" aria-hidden="true" /> Move to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline-light"
                  className="remove-wish-btn"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <i className="bi bi-trash3 me-1" aria-hidden="true" /> Remove
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
