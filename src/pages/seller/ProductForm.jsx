import { useMemo, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../../data/seed'
import { useStore } from '../../context/StoreContext'

const emptyForm = {
  name: '',
  price: '',
  category: CATEGORIES[0]?.name || 'Gaming Peripherals',
  stock: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
}

export default function ProductForm() {
  const { products, saveProduct } = useStore()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const editingId = params.get('id')
  const existing = useMemo(() => products.find((item) => item.id === editingId), [products, editingId])
  const [form, setForm] = useState(() =>
    existing
      ? {
          name: existing.name,
          price: existing.price,
          category: existing.category,
          stock: existing.stock,
          description: existing.description,
          image: existing.image,
        }
      : emptyForm,
  )
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Product name is required.'
    if (form.price === '' || Number(form.price) <= 0) next.price = 'Enter a valid price.'
    if (!form.category) next.category = 'Category is required.'
    if (form.stock === '' || Number(form.stock) < 0) next.stock = 'Enter a valid stock quantity.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    saveProduct({
      id: existing?.id,
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
      description: form.description.trim() || 'Seller-added product.',
      image: form.image.trim() || emptyForm.image,
    })
    setSaved(true)
    setTimeout(() => navigate('/seller/products'), 700)
  }

  return (
    <div className="product-form-page">
      <div className="page-intro split">
        <div>
          <h2>{existing ? 'Edit Product Details' : 'Add New Product'}</h2>
          <p>Configure product attributes, pricing, stock levels, and category assignments.</p>
        </div>
        <Button
          variant="outline-light"
          onClick={() => navigate('/seller/products')}
          className="back-btn"
        >
          <i className="bi bi-arrow-left me-1" aria-hidden="true" />
          <span>Back to Products</span>
        </Button>
      </div>

      {saved ? (
        <Alert variant="success" className="d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-check-circle-fill text-success" aria-hidden="true" />
          <div>Product successfully saved! Redirecting to catalog...</div>
        </Alert>
      ) : null}

      <Form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <Form.Group controlId="productName">
              <Form.Label>
                Product Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Ergonomic Mechanical Keyboard"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                isInvalid={Boolean(errors.name)}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="productPrice">
              <Form.Label>
                Price (PHP) <span className="text-danger">*</span>
              </Form.Label>
              <div className="input-group">
                <span className="input-group-text">₱</span>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(event) => updateField('price', event.target.value)}
                  isInvalid={Boolean(errors.price)}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="productCategory">
              <Form.Label>
                Category <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
              >
                {CATEGORIES.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="productStock">
              <Form.Label>
                Available Stock Units <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="e.g. 25"
                value={form.stock}
                onChange={(event) => updateField('stock', event.target.value)}
                isInvalid={Boolean(errors.stock)}
              />
              <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="productImage">
              <Form.Label>Image URL (Optional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://..."
                value={form.image}
                onChange={(event) => updateField('image', event.target.value)}
              />
            </Form.Group>
          </div>

          {form.image ? (
            <div className="col-12">
              <div className="form-image-preview">
                <span className="preview-label">Image Preview:</span>
                <div className="preview-box">
                  <img src={form.image} alt="Preview" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
              </div>
            </div>
          ) : null}

          <div className="col-12">
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add brief details about the product..."
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
              />
            </Form.Group>
          </div>
        </div>

        <div className="form-actions mt-4 d-flex align-items-center gap-3">
          <Button type="submit" variant="primary" className="save-btn">
            <i className="bi bi-check2-circle me-1" aria-hidden="true" />
            <span>{existing ? 'Save Changes' : 'Publish Product'}</span>
          </Button>
          <Button
            type="button"
            variant="outline-light"
            onClick={() => navigate('/seller/products')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
