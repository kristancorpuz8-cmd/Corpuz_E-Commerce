import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { STORE_NAME } from '../data/seed'
import { useStore } from '../context/StoreContext'

export default function Login() {
  const { login, user } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  if (user) {
    return <Navigate to={user.role === 'seller' ? '/seller' : '/shop'} replace />
  }

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')
    if (!validate()) return
    const result = login(email, password)
    if (!result.ok) {
      setFormError(result.message)
      return
    }
    navigate(result.user.role === 'seller' ? '/seller' : '/shop')
  }

  return (
    <div className="login-screen">
      <div className="login-panel">
        <div className="login-brand-header">
          <div className="login-brand-icon" aria-hidden="true">
            <i className="bi bi-shop-window" />
          </div>
          <div>
            <span className="eyebrow">{STORE_NAME}</span>
            <h1 className="login-title">Welcome back</h1>
          </div>
        </div>

        <p className="login-copy">
          Sign in to access your customer store or manage your seller inventory.
        </p>

        {formError ? (
          <Alert variant="danger" className="d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
            <div>{formError}</div>
          </Alert>
        ) : null}

        <Form noValidate onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email Address</Form.Label>
            <div className="input-icon-wrap">
              <i className="bi bi-envelope input-leading-icon" aria-hidden="true" />
              <Form.Control
                type="email"
                placeholder="user@example.com"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                isInvalid={Boolean(errors.email)}
              />
            </div>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-field input-icon-wrap">
              <i className="bi bi-lock input-leading-icon" aria-hidden="true" />
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                isInvalid={Boolean(errors.password)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} aria-hidden="true" />
              </button>
            </div>
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 login-btn">
            <span>Sign In</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </Button>
        </Form>
      </div>
    </div>
  )
}
