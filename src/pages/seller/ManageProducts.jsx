import { Badge, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HorizontalScrollWrapper from '../../components/HorizontalScrollWrapper'
import { formatPeso, useStore } from '../../context/StoreContext'

export default function ManageProducts() {
  const { products, deleteProduct } = useStore()

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from your catalog?`)) {
      deleteProduct(id)
    }
  }

  return (
    <div className="manage-products-page">
      <div className="page-intro split">
        <div>
          <h2>Manage Products</h2>
          <p>Maintain your active catalog items, stock availability, pricing, and category classifications.</p>
        </div>
        <Link className="btn btn-primary" to="/seller/add-product">
          <i className="bi bi-plus-lg me-1" aria-hidden="true" />
          <span>Add New Product</span>
        </Link>
      </div>

      {!products.length ? (
        <div className="empty-card text-center p-5">
          <div className="empty-icon-box">
            <i className="bi bi-box-seam empty-icon" aria-hidden="true" />
          </div>
          <h3>No products in your catalog</h3>
          <p className="empty-note">
            Start listing items for your store by clicking the "Add New Product" button above.
          </p>
          <Link to="/seller/add-product" className="btn btn-primary mt-3">
            <i className="bi bi-plus-lg me-1" aria-hidden="true" /> Create Your First Product
          </Link>
        </div>
      ) : (
        <HorizontalScrollWrapper label="product inventory columns">
          <Table responsive className="data-table" variant="dark">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Stock Availability</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isOutOfStock = product.stock <= 0
                const isLowStock = product.stock > 0 && product.stock <= 10

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product-cell">
                        <img
                          src={product.image}
                          alt=""
                          className="table-product-thumb"
                          loading="lazy"
                        />
                        <div>
                          <strong className="table-product-name">{product.name}</strong>
                          <span className="table-product-id">ID: {product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-chip">{product.category}</span>
                    </td>
                    <td>
                      <strong className="product-table-price">{formatPeso(product.price)}</strong>
                    </td>
                    <td>
                      {isOutOfStock ? (
                        <Badge bg="danger" className="stock-pill">
                          <i className="bi bi-exclamation-octagon me-1" aria-hidden="true" /> Out of stock
                        </Badge>
                      ) : isLowStock ? (
                        <Badge bg="warning" text="dark" className="stock-pill">
                          <i className="bi bi-exclamation-triangle me-1" aria-hidden="true" /> {product.stock} units left
                        </Badge>
                      ) : (
                        <Badge bg="success" className="stock-pill">
                          <i className="bi bi-check-circle me-1" aria-hidden="true" /> {product.stock} units
                        </Badge>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="table-actions justify-content-end">
                        <Link
                          className="btn btn-sm btn-outline-light"
                          to={`/seller/add-product?id=${product.id}`}
                          aria-label={`Edit ${product.name}`}
                        >
                          <i className="bi bi-pencil-square me-1" aria-hidden="true" /> Edit
                        </Link>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(product.id, product.name)}
                          aria-label={`Delete ${product.name}`}
                        >
                          <i className="bi bi-trash3 me-1" aria-hidden="true" /> Delete
                        </Button>
                      </div>
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
