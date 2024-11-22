<template>
  <div>
    <ul>
      <li v-for="meal in meals" :key="meal.timestamp">
        <p>{{ meal.food }}</p>
        <p>{{ meal.timestamp }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase_settings/index';

export default {
  name: 'MealListComponent',
  data() {
    return {
      meals: [],
    };
  },
  methods: {
    async fetchMeals() {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "userData", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.meals = docSnap.get('meals') || [];
            this.meals = this.meals.map(meal => ({
              food: meal.food,
              timestamp: meal.timestamp.toDate().toLocaleString(),
            }));
          } else {
            this.meals = [{ food: "データ未登録", timestamp: "" }];
          }
        } catch (error) {
          this.meals = [{ food: "データ取得に失敗しました", timestamp: "" }];
          console.error("Error fetching meals:", error);
        }
      }
    }
  },
  async mounted() {
    await this.fetchMeals();
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

p {
  margin: 5px 0;
}
</style>
