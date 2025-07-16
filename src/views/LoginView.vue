<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">🔐 Library Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="credentials.username"
                  required
                  :class="{ 'is-invalid': error }"
                />
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="credentials.password"
                  required
                  :class="{ 'is-invalid': error }"
                />
              </div>

              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  {{ loading ? 'Logging in...' : 'Login' }}
                </button>
              </div>
            </form>

            <div class="mt-4 p-3 bg-light rounded">
              <h6>Demo Credentials:</h6>
              <p class="mb-1"><strong>Username:</strong> admin</p>
              <p class="mb-0"><strong>Password:</strong> password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const credentials = ref({
  username: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const result = login(credentials.value.username, credentials.value.password)
  
  if (result.success) {
    // Redirect to the intended route or home
    const redirectTo = router.currentRoute.value.query.redirect || '/'
    router.push(redirectTo)
  } else {
    error.value = result.error
  }
  
  loading.value = false
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>