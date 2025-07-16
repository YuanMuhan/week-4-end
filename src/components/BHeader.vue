<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <!-- Navigation Links -->
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
      </ul>

      <!-- Authentication Section -->
      <div class="auth-section">
        <div v-if="authenticated" class="d-flex align-items-center">
          <span class="me-3 text-muted">
            Welcome, <strong>{{ user.username }}</strong>
          </span>
          <button @click="handleLogout" class="btn btn-outline-danger btn-sm">
            Logout
          </button>
        </div>
        <div v-else>
          <router-link to="/login" class="btn btn-primary btn-sm">
            Login
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { authenticated, user, logout, initAuth } = useAuth()

// Initialize auth state when component mounts
initAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

.auth-section {
  min-width: 200px;
  text-align: right;
}
</style>
