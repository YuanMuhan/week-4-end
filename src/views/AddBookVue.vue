<template>
  <div class="add-book-container">
    <div class="form-section">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook" class="book-form">
        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit" class="submit-btn">Add Book</button>
      </form>
    </div>
    <div class="book-list-section">
      <BookList />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore';

import BookList from '../components/BookList.vue';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    return {
      isbn,
      name,
      addBook
    };
  },
  components: {
    BookList
  }
};
</script>

<style scoped>
.add-book-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-section {
  margin-bottom: 40px;
}

.book-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.book-list-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>