import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAsync, addUser, setSearchQuery, setSortKey, setSortDir } from '../store/userSlice'
import { selectFilteredAndSortedUsers, selectLoading, selectError, selectSearchQuery, selectSortKey, selectSortDir } from '../store/selectors'
import SearchBar from '../components/SearchBar'
import SortableTableHeader from '../components/SortableTableHeader'
import UserForm from '../components/UserForm'
import UserRow from '../components/UserRow'

export default function UsersList(){
  const dispatch = useDispatch()
  
  // Redux selectors
  const perdoruesit_e_filtruar = useSelector(selectFilteredAndSortedUsers)
  const loading = useSelector(selectLoading)
  const gabim = useSelector(selectError)
  const searchQuery = useSelector(selectSearchQuery)
  const sortKey = useSelector(selectSortKey)
  const sortDir = useSelector(selectSortDir)

  useEffect(() => {
    dispatch(fetchUsersAsync())
  }, [dispatch])

  function shtoUser(user) {
    dispatch(addUser(user))
  }

  function handleSearchChange(query) {
    dispatch(setSearchQuery(query))
  }

  function handleSort(key, dir) {
    dispatch(setSortKey(key))
    dispatch(setSortDir(dir))
  }

  if(loading) return <div className="content-box">Loading…</div>
  if(gabim) return <div className="content-box">Error: {gabim}</div>

  return (
    <>
      <UserForm onAdd={shtoUser} />

      <div className="content-box" style={{marginTop:12}}>
        <div className="searchWrapper">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="tblResponsive">
          <table>
          <thead>
            <tr>
              <SortableTableHeader 
                sortKey="name" 
                currentSortKey={sortKey} 
                currentSortDir={sortDir} 
                onSort={handleSort}
              >
                Name
              </SortableTableHeader>
              <SortableTableHeader 
                sortKey="email" 
                currentSortKey={sortKey} 
                currentSortDir={sortDir} 
                onSort={handleSort}
              >
                Email
              </SortableTableHeader>
              <SortableTableHeader 
                sortKey="company" 
                currentSortKey={sortKey} 
                currentSortDir={sortDir} 
                onSort={handleSort}
              >
                Company
              </SortableTableHeader>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {perdoruesit_e_filtruar.map(user => <UserRow key={user.id} user={user} />)}
          </tbody>
        </table>
        </div>
      </div>
    </>
  )
}
