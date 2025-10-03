import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAsync } from '../store/userSlice'
import { selectLoading, selectError } from '../store/selectors'

export default function UserDetails(){
  const { id } = useParams()
  const dispatch = useDispatch()
  
  const users = useSelector(state => state.users.users)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  
  const user = users.find(u => String(u.id) === String(id))

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersAsync())
    }
  }, [dispatch, users.length])

  if(loading) return <div className="content-box">Loading…</div>
  if(error)   return <div className="content-box">Error: {error}</div>
  if(!user)   return <div className="content-box">User not found. <Link to="/">Back</Link></div>

  return (
    <div className="content-box">
      <Link to="/">{'← Back to list'}</Link>
      <h2 style={{marginTop:8}}>{user.name}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Website:</b> {user.website}</p>
      <p><b>Address:</b> {user.address.street}, {user.address.suite}, {user.address.city} {user.address.zipcode}</p>
      <p><b>Company:</b> {user.company?.name}</p>
    </div>
  )
}
