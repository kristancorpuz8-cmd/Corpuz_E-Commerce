import { useMemo, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ProductCard from '../../components/ProductCard'
import { CATEGORIES } from '../../data/seed'
import { useStore } from '../../context/StoreContext'

export default function Products() {
  const { products } = useStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [products, query, category])

  const hasActiveFilters = query.trim() !== '' || category !== 'All'

  const resetFilters = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <div className="products-page">
      <div className="page-intro">
        <h2>Product Catalog</h2>
        <p>Browse authentic products with real-time stock, instant search, and categorized filters.</p>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <i className="bi bi-search search-icon" aria-hidden="true" />
          <Form.Control
            type="search"
            placeholder="Search products by name..."
            aria-label="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setQuery('')}
              aria-label="Clear search input"
            >
              <i className="bi bi-x-circle-fill" />
            </button>
          ) : null}
        </div>

        <div className="category-select-wrap">
          <Form.Select
            value={category}
            aria-label="Filter by category"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <div className="catalog-meta-bar">
        <span className="results-count">
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'}
          {category !== 'All' ? ` in "${category}"` : ''}
          {query ? ` matching "${query}"` : ''}
        </span>
        {hasActiveFilters ? (
          <button type="button" className="reset-filter-btn" onClick={resetFilters}>
            <i className="bi bi-arrow-counterclockwise" aria-hidden="true" /> Reset filters
          </button>
        ) : null}
      </div>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filtered.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {!filtered.length ? (
        <div className="empty-card text-center p-5">
          <div className="empty-icon-box">
            <i className="bi bi-search empty-icon" aria-hidden="true" />
          </div>
          <h3>No products found</h3>
          <p className="empty-note">
            We couldn't find any products matching your current filters. Try searching for different keywords or reset category filters.
          </p>
          <button type="button" className="btn btn-outline-light mt-3" onClick={resetFilters}>
            <i className="bi bi-arrow-counterclockwise me-1" aria-hidden="true" /> Reset all filters
          </button>
        </div>
      ) : null}
    </div>
  )
}
