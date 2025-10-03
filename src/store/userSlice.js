import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from '../api'

const STORAGE_KEY = 'userManagement_users'

const loadUsersFromStorage = () => {
  try {
    const storedUsers = localStorage.getItem(STORAGE_KEY)
    return storedUsers ? JSON.parse(storedUsers) : []
  } catch (error) {
    console.error('Error loading users from localStorage:', error)
    return []
  }
}

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch (error) {
    console.error('Error saving users to localStorage:', error)
  }
}

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchUsers()
      return users
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'perdoruesit',
  initialState: {
    users: loadUsersFromStorage(),
    loading: false,
    error: null,
    searchQuery: '',
    sortKey: 'name',
    sortDir: 'asc'
  },
  reducers: {
    addUser: (state, action) => {
      state.users.unshift(action.payload)
      saveUsersToStorage(state.users)
    },
    
    updateUser: (state, action) => {
      const { id, updatedUser } = action.payload
      const indeksi = state.users.findIndex(user => user.id === id)
      if(indeksi !== -1) {
        state.users[indeksi] = { ...state.users[indeksi], ...updatedUser }
        saveUsersToStorage(state.users)
      }
    },
    
    deleteUser: (state, action) => {
      const userId = action.payload
      state.users = state.users.filter(perdorues => perdorues.id !== userId)
      saveUsersToStorage(state.users)
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    
    setSortKey: (state, action) => {
      state.sortKey = action.payload
    },
    
    setSortDir: (state, action) => {
      state.sortDir = action.payload
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false
        const apiUsers = action.payload
        const localUsers = state.users
        const mergedUsers = [...apiUsers]
        
        localUsers.forEach(localUser => {
          if (!apiUsers.some(apiUser => apiUser.id === localUser.id)) {
            mergedUsers.push(localUser)
          }
        })
        
        state.users = mergedUsers
        saveUsersToStorage(state.users)
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const {
  addUser,
  updateUser,
  deleteUser,
  setSearchQuery,
  setSortKey,
  setSortDir
} = userSlice.actions

export default userSlice.reducer
