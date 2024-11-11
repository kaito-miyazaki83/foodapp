import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import FoodView from './views/FoodView.vue';

// 画面遷移前にログイン済みかを判定するメソッドに必要なFirebaseのメソッド
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MealView from './views/MealView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: 'Home', requiresAuth: true}
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { title: 'Login', requiresAuth: false}
    },
    {
        path: '/food',
        name: 'food',
        component: FoodView,
        meta: { title: 'Food', requiresAuth: true}
    },
    {
        path: '/meal',
        name: 'meal',
        component: MealView,
        meta: { title: 'meal', requiresAuth: true}
    },
    {
        path: '/recipe',
        name: 'recipe',
        component: RecipeView,
        meta: { title: 'recipe', requiresAuth: true}
    },
    {
        path: '/restaurant',
        name: 'restaurant',
        component: RestaurantView,
        meta: { title: 'restaurant', requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// 画面遷移成功後にページタイトルを設定
router.afterEach((to) => {
    document.title = to.meta.title + ' | Vue Firebase Example';
});

// 画面遷移前にログイン済みかをチェックして、未ログイン時はログイン画面に強制遷移させる
router.beforeEach((to, from, next) => {
    const auth = getAuth();

    if (!to.matched.some(record => record.meta.requiresAuth)) {
        next();
    } else {
        if (auth.currentUser) {
            next();
        } else {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            });
        }
    }
});

export default router;
