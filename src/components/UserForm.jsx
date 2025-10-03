import { useState } from 'react'
import { nanoid } from 'nanoid'

export default function UserForm({ onAdd }) {
  const [emri, setEmri] = useState('')
  const [email, setEmail] = useState('')
  const [kompania, setKompania] = useState('')
  const [errors, setErrors] = useState({})
  const [duke_derguar, setDukeDerguar] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    setDukeDerguar(true)
    
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length > 0) {
      setDukeDerguar(false)
      return
    }

    const perdoruesi_i_ri = {
      id: 'local-' + nanoid(6),
      name: emri.trim(),
      email: email.trim().toLowerCase(),
      phone: '',
      website: '',
      address: { street: '', suite: '', city: '', zipcode: '' },
      company: { name: kompania.trim() || '—' }
    }
    
    onAdd(perdoruesi_i_ri)
    setEmri('')
    setEmail('')
    setKompania('')
    setErrors({})
    setDukeDerguar(false)
  }

  function ndryshoEmrin(e) {
    setEmri(e.target.value)
    if(errors.emri) {
      setErrors(prev => ({ ...prev, emri: '' }))
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
    if(errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  function ndryshoKompanine(e) {
    setKompania(e.target.value)
    if(errors.kompania) {
      setErrors(prev => ({ ...prev, kompania: '' }))
    }
  }

  return (
    <form className="content-box" onSubmit={handleSubmit}>
      <div className="formLayout">
        <div className="inputWrapper">
          <input 
            placeholder="Full Name *" 
            value={emri} 
            onChange={ndryshoEmrin}
            className={errors.emri ? 'hasError' : ''}
            disabled={duke_derguar}
          />
          {errors.emri && <span className="msgError">{errors.emri}</span>}
        </div>
        
        <div className="inputWrapper">
          <input 
            type="email"
            placeholder="Email *" 
            value={email} 
            onChange={handleEmailChange}
            className={errors.email ? 'hasError' : ''}
            disabled={duke_derguar}
          />
          {errors.email && <span className="msgError">{errors.email}</span>}
        </div>
        
        <div className="inputWrapper">
          <input 
            placeholder="Company *" 
            value={kompania} 
            onChange={ndryshoKompanine}
            className={errors.kompania ? 'hasError' : ''}
            disabled={duke_derguar}
          />
          {errors.kompania && <span className="msgError">{errors.kompania}</span>}
        </div>
        
        <button 
          className="btnPrimary" 
          type="submit" 
          disabled={duke_derguar}
        >
          {duke_derguar ? 'Adding...' : 'Add User'}
        </button>
      </div>
    </form>
  )
}
