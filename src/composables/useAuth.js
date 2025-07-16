import { ref, computed } from 'vue'

// Global authentication state
const isAuthenticated = ref(false)
const currentUser = ref(null)

// Hardcoded credentials for this exercise
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
}

export function useAuth() {
  // Login function
  const login = (username, password) => {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      isAuthenticated.value = true
      currentUser.value = { username }
      // Store in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('currentUser', JSON.stringify({ username }))
      return { success: true }
    } else {
      return { success: false, error: 'Invalid username or password' }
    }
  }

  // Logout function
  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }

  // Initialize auth state from localStorage
  const initAuth = () => {
    const stored = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('currentUser')
    if (stored === 'true' && storedUser) {
      isAuthenticated.value = true
      currentUser.value = JSON.parse(storedUser)
    }
  }

  // Computed properties
  const user = computed(() => currentUser.value)
  const authenticated = computed(() => isAuthenticated.value)

  return {
    login,
    logout,
    initAuth,
    user,
    authenticated
  }
}