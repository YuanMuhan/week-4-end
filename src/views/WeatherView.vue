<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="city" 
          placeholder="Enter city name" 
          class="search-input" 
          @keyup.enter="searchByCity"
        />
        <button @click="searchByCity" class="search-button" :disabled="loading">
          {{ loading ? 'Loading...' : 'Search' }}
        </button>
        <br>
        <br>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <div v-else-if="!weatherData">
          Please implement "Search Weather by City".
        </div>
      </div>
    </div>
    
    <main>
      <div v-if="loading" class="loading">
        正在获取天气数据...
      </div>
      <div v-else-if="weatherData">
        <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
// The info section in 10.1.1 provided detailed information about this package  
import axios from "axios"; 

const apikey = "ca93918ad9466c880ec8c888d1fe9903"; 

export default { 
  name: "WeatherView", 
  data() { 
    return { 
      city: "", 
      weatherData: null, 
      hourlyForecast: [], 
      dailyForecast: [],
      loading: false,
      error: null
    }; 
  }, 
  computed: { 
    temperature() { 
      return this.weatherData 
        ? Math.floor(this.weatherData.main.temp - 273) 
        : null; 
    }, 
    //修复：使用 HTTPS 协议
    iconUrl() { 
      return this.weatherData 
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png` 
        : null; 
    }, 
  }, 
  mounted() { 
    this.fetchCurrentLocationWeather(); 
  }, 
  methods: { 
    async fetchCurrentLocationWeather() { 
      if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(async (position) => { 
          const { latitude, longitude } = position.coords; 
          //修复：使用 HTTPS 协议
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`; 
          await this.fetchWeatherData(url); 
        }, (error) => {
          // 处理地理位置获取失败
          console.error("Geolocation error:", error);
          this.error = "无法获取您的位置信息，请手动搜索城市天气";
        }); 
      } else {
        this.error = "您的浏览器不支持地理位置功能，请手动搜索城市天气";
      }
    }, 
    async fetchWeatherData(url) { 
      this.loading = true;
      this.error = null;
      try { 
        const response = await axios.get(url); 
        this.weatherData = response.data; 
      } catch (error) { 
        console.error("Error fetching weather data:", error);
        if (error.response) {
          // API 返回了错误响应
          if (error.response.status === 401) {
            this.error = "API 密钥无效";
          } else if (error.response.status === 404) {
            this.error = "未找到该城市，请检查城市名称";
          } else {
            this.error = `API 错误: ${error.response.status}`;
          }
        } else if (error.request) {
          // 网络错误
          this.error = "网络连接错误，请检查您的网络连接";
        } else {
          this.error = "请求失败，请稍后重试";
        }
      } finally {
        this.loading = false;
      }
    },
    async searchByCity() {
      if (this.city.trim()) {
        //修复：使用 HTTPS 协议
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      } else {
        this.error = "请输入城市名称";
      }
    }
  } 
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.search-input {
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 300px;
  max-width: 100%;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.search-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

.search-button:active {
  transform: translateY(1px);
}

main {
  text-align: center;
  margin-top: 30px;
}

main h2 {
  color: #333;
  margin-bottom: 20px;
}

main div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

main img {
  width: 100px;
  height: 100px;
}

main p {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

main span {
  font-size: 1.2rem;
  color: #666;
  text-transform: capitalize;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
}

.loading {
  text-align: center;
  color: #666;
  font-size: 18px;
  padding: 20px;
}

.search-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>