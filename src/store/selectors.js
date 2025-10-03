import { createSelector } from '@reduxjs/toolkit'

export const selectUsers = (state) => state.users.users
export const selectLoading = (state) => state.users.loading
export const selectError = (state) => state.users.error
export const selectSearchQuery = (state) => state.users.searchQuery
export const selectSortKey = (state) => state.users.sortKey
export const selectSortDir = (state) => state.users.sortDir

export const selectFilteredAndSortedUsers = createSelector(
  [selectUsers, selectSearchQuery, selectSortKey, selectSortDir],
  (users, searchQuery, sortKey, sortDir) => {
    const term = searchQuery.toLowerCase()
    let filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )

    filteredUsers.sort((a, b) => {
      const aIsNew = String(a.id).startsWith('local-')
      const bIsNew = String(b.id).startsWith('local-')
      
      if (aIsNew && !bIsNew) return -1
      if (!aIsNew && bIsNew) return 1
      if (aIsNew && bIsNew) return 0
      
      const av = sortKey === 'company' ? (a.company?.name ?? '') : (a[sortKey] ?? '')
      const bv = sortKey === 'company' ? (b.company?.name ?? '') : (b[sortKey] ?? '')
      
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })

    return filteredUsers
  }
)

