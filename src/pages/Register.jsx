import styled from "styled-components"
import { useState, useEffect } from "react"
import { FormRow, Logo } from '../components'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const { user, isLoading } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, isMember} = values
    if(!email || !password || (!isMember && !name)) {
      toast.warn('Please fill out all the fields')
      return;
    }
    if (isMember) {
      dispatch(loginUser({email, password}))
      return;
    }
    dispatch(registerUser({email, name, password}))
  }
  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember
    })
  }

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember &&
          <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
        }
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`

export default Register