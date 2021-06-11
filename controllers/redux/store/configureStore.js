import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

// const createNoopStorage = () => {
//     return {
//         getItem(_key) {
//             return Promise.resolve(null);
//         },
//         setItem(_key, value) {
//             return Promise.resolve(value);
//         },
//         removeItem(_key) {
//             return Promise.resolve();
//         },
//     };
// };
// const storageReduxPersit = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const middleWare = [thunkMiddleware]

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// user redux tools
var window = require('global/window')
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleWare)))
const persistor = persistStore(store)

export { store, persistor }