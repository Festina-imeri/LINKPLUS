import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../store/userSlice'
import EditUserForm from './EditUserForm'

export default function UserRow({ user }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  function fshijPerdorues() {
    if(window.confirm(`A jeni te sigurt qe doni te fshini ${user.name}?`)) {
      dispatch(deleteUser(user.id))
    }
  }

  function ndrysho() {
    setIsEditing(true)
  }

  function anulloNdryshimin() {
    setIsEditing(false)
  }

  function ruajNdryshimin() {
    setIsEditing(false)
  }

  return (
    <>
      <tr>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.email}</td>
        <td>{user.company?.name ?? '—'}</td>
        <td>
          <div className="actionsRow">
            <button 
              className="btnEdit" 
              onClick={ndrysho}
              title="Ndrysho perdorues"
            >
              ✏️
            </button>
            <button 
              className="btnDelete" 
              onClick={fshijPerdorues}
              title="Fshij perdorues"
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>
      
      {isEditing && (
        <EditUserForm 
          user={user}
          onCancel={anulloNdryshimin}
          onSave={ruajNdryshimin}
        />
      )}
    </>
  )
}
