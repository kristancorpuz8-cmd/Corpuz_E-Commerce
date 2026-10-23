import { Badge, Button, Card } from 'react-bootstrap'
import { formatPeso, useStore } from '../context/StoreContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const saved = wishlist.includes(product.id)
  const isLowStock = product.stock > 0 && product.stock <= 10

  return (
    <Card className="product-card h-100">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-img"
        />
        <div className="product-badges">
          <span className="category-chip">{product.category}</span>
          {isLowStock ? (
            <Badge bg="warning" text="dark" className="stock-chip">
              Only {product.stock} left
            </Badge>
          ) : null}
        </div>
        <button
          type="button"
          className={`wish-btn ${saved ? 'saved' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <i className={`bi ${saved ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
        </button>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="product-title" title={product.name}>
          {product.name}
        </Card.Title>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer mt-auto pt-3">
          <div className="price-box">
            <span className="price-label">Price</span>
            <strong className="price-val">{formatPeso(product.price)}</strong>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="add-cart-btn"
            onClick={() => addToCart(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            <i className="bi bi-cart-plus" aria-hidden="true" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
