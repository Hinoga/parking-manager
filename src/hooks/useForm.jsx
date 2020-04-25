import { useState } from 'react'

import { checkValidation } from '../variables/formValidity'
import { getSpecificFullDate } from '../variables/utils'

const useForm = fieldForm => {
  const [fieldState, setFieldState] = useState({ ...fieldForm })
  const [formIsValid, setFormIsValid] = useState(false)

  const onRender = () => {
    const formElementsArr = []
    if (fieldState) {
      for (let key in fieldState) {
        formElementsArr.push({
          id: key,
          config: fieldState[key]
        })
      }
    }
    return formElementsArr
  }

  const getJson = () => {
    const data = {}
    for (const key in fieldState) {
      data[key] = fieldState[key].value
    }
    return data
  }

  const getFormData = () => {
    const data = new FormData()
    for (let key in fieldState) {
      data.append(key, fieldState[key].value)
    }
    return data
  }

  const onReset = () => {
    setFieldState({ ...fieldForm })
    setFormIsValid(false)
  }

  const handlerFormValidation = form => {
    let isValidForm = true
    for (const inputElement in form) {
      isValidForm = isValidForm && form[inputElement].valid
    }
    return isValidForm
  }

  const onChanged = (ev, id) => {
    let inputValue = null
    let validation = {
      isValid: true,
      error: false
    }
    if (ev.target) {
      inputValue = ev.target.value
      validation = checkValidation(inputValue, fieldState[id].validation)
    } else {
      inputValue = ev
    }
    const formData = {
      ...fieldState,
      [id]: {
        ...fieldState[id],
        value: inputValue,
        valid: validation.isValid,
        touched: true,
        error: validation.error
      }
    }
    setFieldState(formData)
    setFormIsValid(handlerFormValidation(formData))
  }

  const checkOnLoadValue = (type, data) => {
    if (type == 'date-time') return getSpecificFullDate(data)
    else return data
  }

  const onLoad = data => {
    const loadForm = { ...fieldState }
    for (const formElement in fieldState) {
      loadForm[formElement] = {
        ...fieldState[formElement],
        value: checkOnLoadValue(
          loadForm[formElement].elementConfig.type,
          data[formElement]
        ),
        touched: true,
        valid: true
      }
    }
    setFieldState(loadForm)
    setFormIsValid(true)
  }

  return {
    onRender,
    onChanged,
    getJson,
    onReset,
    onLoad,
    getFormData,
    formIsValid
  }
}

export default useForm
