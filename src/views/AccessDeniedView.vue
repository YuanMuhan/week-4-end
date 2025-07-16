<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card text-center">
          <div class="card-body">
            <div class="mb-4">
              <i class="fas fa-lock" style="font-size: 4rem; color: #dc3545;"></i>
            </div>
            <h1 class="card-title text-danger">Access Denied</h1>
            <p class="card-text lead">
              You need to be logged in to access this page.
            </p>
            <p class="card-text">
              Please log in with your credentials to continue.
            </p>
            <div class="mt-4">
              <router-link to="/login" class="btn btn-primary me-3">
                Go to Login
              </router-link>
              <router-link to="/" class="btn btn-outline-secondary">
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
</style>