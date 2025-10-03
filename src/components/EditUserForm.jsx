import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../store/userSlice'

export default function EditUserForm({ user, onCancel, onSave }) {
  const dispatch = useDispatch()
  const [emri, setEmri] = useState('')
  const [email, setEmail] = useState('')
  const [kompania, setKompania] = useState('')
  const [telefoni, setTelefoni] = useState('')
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState({})
  const [duke_ruajtur, setDukeRuajtur] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    if(user) {
      setEmri(user.name || '')
      setEmail(user.email || '')
      setKompania(user.company?.name || '')
      setTelefoni(user.phone || '')
      setWebsite(user.website || '')
    }
  }, [user])

  function validateForm() {
    const newErrors = {}

    if(!emri.trim()) {
      newErrors.emri = 'Full name is required'
    } else if(emri.trim().length < 2) {
      newErrors.emri = 'Name must be at least 2 characters long'
    } else if(emri.trim().length > 50) {
      newErrors.emri = 'Name must be less than 50 characters'
    }

    if(!email.trim()) {
      newErrors.email = 'Email is required'
    } else if(!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if(!kompania.trim()) {
      newErrors.kompania = 'Company name is required'
    } else if(kompania.trim().length < 2) {
      newErrors.kompania = 'Company name must be at least 2 characters long'
    } else if(kompania.trim().length > 100) {
      newErrors.kompania = 'Company name must be less than 100 characters'
    }

    if(telefoni.trim() && telefoni.trim().length > 20) {
      newErrors.telefoni = 'Phone number must be less than 20 characters'
    }

    if(website.trim() && website.trim().length > 100) {
      newErrors.website = 'Website must be less than 100 characters'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    setDukeRuajtur(true)
    
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length > 0) {
      setDukeRuajtur(false)
      return
    }

    const updatedUser = {
      name: emri.trim(),
      email: email.trim().toLowerCase(),
      phone: telefoni.trim(),
      website: website.trim(),
      company: { name: kompania.trim() }
    }
    
    dispatch(updateUser({ id: user.id, updatedUser }))
    onSave && onSave()
    setDukeRuajtur(false)
  }

  function handleFieldChange(field, value, errorField) {
    switch(field) {
      case 'emri':
        setEmri(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'kompania':
        setKompania(value)
        break
      case 'telefoni':
        setTelefoni(value)
        break
      case 'website':
        setWebsite(value)
        break
    }
    
    if(errors[errorField]) {
      setErrors(prev => ({ ...prev, [errorField]: '' }))
    }
  }

  return (
    <div className="modalOverlay">
      <form className="content-box modalForm" onSubmit={handleSubmit}>
        <h3>Edit User</h3>
        
        <div className="formLayout">
          <div className="inputWrapper">
            <input 
              placeholder="Full name *" 
              value={emri} 
              onChange={(e) => handleFieldChange('emri', e.target.value, 'emri')}
              className={errors.emri ? 'hasError' : ''}
              disabled={duke_ruajtur}
            />
            {errors.emri && <span className="msgError">{errors.emri}</span>}
          </div>
          
          <div className="inputWrapper">
            <input 
              type="email"
              placeholder="Email *" 
              value={email} 
              onChange={(e) => handleFieldChange('email', e.target.value, 'email')}
              className={errors.email ? 'hasError' : ''}
              disabled={duke_ruajtur}
            />
            {errors.email && <span className="msgError">{errors.email}</span>}
          </div>
          
          <div className="inputWrapper">
            <input 
              placeholder="Company *" 
              value={kompania} 
              onChange={(e) => handleFieldChange('kompania', e.target.value, 'kompania')}
              className={errors.kompania ? 'hasError' : ''}
              disabled={duke_ruajtur}
            />
            {errors.kompania && <span className="msgError">{errors.kompania}</span>}
          </div>
          
          <div className="inputWrapper">
            <input 
              placeholder="Phone" 
              value={telefoni} 
              onChange={(e) => handleFieldChange('telefoni', e.target.value, 'telefoni')}
              className={errors.telefoni ? 'hasError' : ''}
              disabled={duke_ruajtur}
            />
            {errors.telefoni && <span className="msgError">{errors.telefoni}</span>}
          </div>
          
          <div className="inputWrapper">
            <input 
              placeholder="Website" 
              value={website} 
              onChange={(e) => handleFieldChange('website', e.target.value, 'website')}
              className={errors.website ? 'hasError' : ''}
              disabled={duke_ruajtur}
            />
            {errors.website && <span className="msgError">{errors.website}</span>}
          </div>
        </div>
        
        <div className="btnGroup">
          <button 
            type="button" 
            onClick={onCancel}
            disabled={duke_ruajtur}
          >
            Cancel
          </button>
          <button 
            className="btnPrimary" 
            type="submit" 
            disabled={duke_ruajtur}
          >
            {duke_ruajtur ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
