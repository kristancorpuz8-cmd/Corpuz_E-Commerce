import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { STORE_NAME } from '../../data/seed'
import { useStore } from '../../context/StoreContext'

export default function Home() {
  const { user, products } = useStore()
  const featured = products.filter((item) => item.featured).slice(0, 4)
  const highlights = products.filter((item) => item.highlight).slice(0, 4)

  return (
    <div className="home-container">
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="bi bi-controller" aria-hidden="true" />
            <span>{STORE_NAME} Official Store</span>
          </div>
          <h2>Welcome back, {user?.name?.split(' ')[0]}.</h2>
          <p className="hero-text">
            Level up your battlestation with high-performance gaming rigs, peripherals, and next-gen consoles from {STORE_NAME}. Handpicked quality,
            exclusive esports deals, and fast local fulfillment.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary hero-btn" to="/shop/products">
              <span>Shop All Products</span>
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="promo-card">
          <div className="promo-badge">
            <i className="bi bi-tag-fill" aria-hidden="true" />
            <span>This Week's Special</span>
          </div>
          <h3>Level-Up Esports Sale</h3>
          <p>Save big on mechanical keyboards, 180Hz displays, and pro wireless mice while stocks last.</p>
          <div className="promo-footer">
            <span className="promo-validity">
              <i className="bi bi-clock-history me-1" aria-hidden="true" /> Limited time offer
            </span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div className="section-title-wrap">
            <i className="bi bi-star-fill text-warning section-icon" aria-hidden="true" />
            <div>
              <h3>Featured Products</h3>
              <p className="section-subtitle">Top-rated items loved by customers this month</p>
            </div>
          </div>
          <Link to="/shop/products" className="view-all-link">
            <span>View all</span>
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </Link>
        </div>
        <Row xs={1} sm={2} lg={4} className="g-3">
          {featured.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div className="section-title-wrap">
            <i className="bi bi-lightning-charge-fill text-info section-icon" aria-hidden="true" />
            <div>
              <h3>Product Highlights</h3>
              <p className="section-subtitle">Specially curated selections for battlestations and competitive play</p>
            </div>
          </div>
        </div>
        <Row xs={1} md={2} className="g-3">
          {highlights.map((product) => (
            <Col key={product.id}>
              <div className="highlight-row">
                <div className="highlight-img-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
                <div className="highlight-body">
                  <span className="highlight-category">{product.category}</span>
                  <h4 className="highlight-title">{product.name}</h4>
                  <p className="highlight-desc">{product.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  )
}
