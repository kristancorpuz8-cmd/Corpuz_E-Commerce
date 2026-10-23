import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/seed'
import { useStore } from '../../context/StoreContext'

export default function Categories() {
  const { products } = useStore()

  return (
    <div className="categories-page">
      <div className="page-intro">
        <h2>Shop by Category</h2>
        <p>Browse our curated collections by department to find the perfect gear for your ultimate battlestation.</p>
      </div>
      <Row xs={1} md={2} className="g-3">
        {CATEGORIES.map((category) => {
          const count = products.filter((item) => item.category === category.name).length
          return (
            <Col key={category.name}>
              <Link
                className="category-card"
                to="/shop/products"
                aria-label={`Browse ${category.name} category with ${count} items`}
              >
                <div className="category-icon-wrap" aria-hidden="true">
                  <i className={`bi ${category.icon}`} />
                </div>
                <div className="category-content">
                  <div className="category-top">
                    <h3 className="category-title">{category.name}</h3>
                    <span className="category-count-badge">
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <p className="category-desc">{category.description}</p>
                  <div className="category-footer">
                    <span className="category-explore">
                      Explore collection <i className="bi bi-arrow-right ms-1" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
