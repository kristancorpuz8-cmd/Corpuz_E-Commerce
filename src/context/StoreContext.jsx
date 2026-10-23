import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ACCOUNTS, INITIAL_ORDERS, INITIAL_PRODUCTS } from '../data/seed'

const KEYS = {
  products: 'cv_gaming_products',
  cart: 'cv_gaming_cart',
  wishlist: 'cv_gaming_wishlist',
  orders: 'cv_gaming_orders_v2',
  session: 'cv_gaming_session_v2',
}

const StoreContext = createContext(null)

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function formatPeso(value) {
  return `₱${Number(value).toLocaleString('en-PH')}`
}

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = readJson(KEYS.session, null)
    if (!saved) return null
    const matched = ACCOUNTS.find(
      (item) => item.email.toLowerCase() === saved.email?.toLowerCase(),
    )
    if (matched) {
      const { password: _pw, ...safeUser } = matched
      return safeUser
    }
    return saved
  })
  const [products, setProducts] = useState(() => readJson(KEYS.products, INITIAL_PRODUCTS))
  const [cart, setCart] = useState(() => readJson(KEYS.cart, []))
  const [wishlist, setWishlist] = useState(() => readJson(KEYS.wishlist, []))
  const [orders, setOrders] = useState(() => readJson(KEYS.orders, INITIAL_ORDERS))
  const [toast, setToast] = useState('')

  useEffect(() => {
    localStorage.setItem(KEYS.products, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem(KEYS.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(KEYS.orders, JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    if (user) localStorage.setItem(KEYS.session, JSON.stringify(user))
    else localStorage.removeItem(KEYS.session)
  }, [user])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = (message) => setToast(message)

  const login = (email, password) => {
    const account = ACCOUNTS.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password,
    )
    if (!account) return { ok: false, message: 'Invalid email or password. Please try again.' }
    const { password: _pw, ...safeUser } = account
    setUser(safeUser)
    return { ok: true, user: safeUser }
  }

  const logout = () => setUser(null)

  const addToCart = (productId, quantity = 1) => {
    const product = products.find((item) => item.id === productId)
    if (!product) return
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { productId, quantity }]
    })
    notify(`${product.name} added to cart.`)
  }

  const updateCartQty = (productId, quantity) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.productId !== productId))
      return
    }
    setCart((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        notify('Removed from wishlist.')
        return prev.filter((id) => id !== productId)
      }
      notify('Saved to wishlist.')
      return [...prev, productId]
    })
  }

  const moveWishlistToCart = (productId) => {
    addToCart(productId, 1)
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }

  const checkout = () => {
    if (!cart.length) return { ok: false, message: 'Your cart is empty.' }
    const items = cart.map((line) => {
      const product = products.find((item) => item.id === line.productId)
      return {
        productId: line.productId,
        name: product?.name || 'Unknown product',
        quantity: line.quantity,
        price: product?.price || 0,
      }
    })
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = {
      id: `ORD-${Math.floor(1200 + Math.random() * 8000)}`,
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || '',
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      items,
      total,
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
    notify(`Order ${order.id} placed successfully.`)
    return { ok: true, order }
  }

  const saveProduct = (payload) => {
    if (payload.id) {
      setProducts((prev) => prev.map((item) => (item.id === payload.id ? { ...item, ...payload } : item)))
      notify('Product updated.')
      return
    }
    const product = {
      ...payload,
      id: `p${Date.now()}`,
      featured: false,
      highlight: false,
    }
    setProducts((prev) => [product, ...prev])
    notify('Product added.')
  }

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId))
    setCart((prev) => prev.filter((item) => item.productId !== productId))
    setWishlist((prev) => prev.filter((id) => id !== productId))
    notify('Product deleted.')
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId)
    return sum + (product?.price || 0) * line.quantity
  }, 0)

  const value = useMemo(
    () => ({
      user,
      products,
      cart,
      wishlist,
      orders,
      toast,
      cartCount,
      cartTotal,
      login,
      logout,
      addToCart,
      updateCartQty,
      removeFromCart,
      toggleWishlist,
      moveWishlistToCart,
      checkout,
      saveProduct,
      deleteProduct,
      updateOrderStatus,
    }),
    [user, products, cart, wishlist, orders, toast, cartCount, cartTotal],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
