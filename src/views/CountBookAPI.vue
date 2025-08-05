<template> 
    <div class="container">
        <h1>Count Book API</h1>
        
        <div v-if="loading" class="loading">
            Loading authors data...
        </div>
        
        <div v-if="error" class="error">
            {{ error }}
        </div>
        
        <div v-if="apiResponse" class="api-response"> 
            <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre> 
        </div> 
    </div>
</template> 

<script setup> 
import { ref, onMounted } from 'vue' 

const authors = ref([]) 
const loading = ref(false) 
const error = ref(null) 
const apiResponse = ref(null) 

const authorsCount = ref(0) 
const totalBooks = ref(0) 

const calculateStats = () => { 
  authorsCount.value = authors.value.length 
  totalBooks.value = authors.value.reduce((total, author) => { 
    return total + author.famousWorks.length 
  }, 0) 
} 


const getApiData = async () => { 
    loading.value = true 
  error.value = null 
  
  try { 
    const response = await fetch('/src/assets/json/authors.json') 
    
    if (!response.ok) { 
      throw new Error(`HTTP error! status: ${response.status}`) 
    } 
    
    const data = await response.json() 
    authors.value = data 
    
    calculateStats() 
    
  } catch (err) { 
    error.value = `Error loading authors data: ${err.message}` 
    console.error('Error loading authors data:', err) 
  } finally { 
    loading.value = false 
  }; 

  apiResponse.value = { 
    success: true, 
    data: { 
      authorsCount: authorsCount.value, 
      totalBooks: totalBooks.value, 
      authors: authors.value.map(author => ({ 
        name: author.name, 
        bookCount: author.famousWorks.length, 
      })) 
    }, 
    timestamp: new Date().toISOString() 
  } 
} 

onMounted(() => { 
  getApiData(); 
}) 

defineExpose({ 
  getApiData 
}) 
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 20px;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 15px;
  margin: 20px 0;
}

.api-response {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.api-response pre {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 15px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>