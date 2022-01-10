const verifyInput = (
  {
    input,
    required,
    minLength,
    maxLength,
    pattern,
    min,
    max
  }: validateInput
) => {
  if (required && !input) {
    return null
  }

  if (typeof input === 'string') {
    if (input.trim().length === 0) {
      return null
    }

    if (minLength && input.trim().length < minLength) {
      return null
    }

    if (maxLength && input.trim().length > maxLength) {
      return null
    }

    if (pattern && !pattern.test(input.trim())) {
      return null
    }

    return input.trim()
  }

  if (min && input < min) {
    return null
  }
  if (max && input > max) {
    return null
  }
  return input
}

type validateInput = {
  input: string | number,
  type: 'string' | 'number',
  required: boolean,
  minLength?: number,
  maxLength?: number,
  pattern?: RegExp,
  min?: number,
  max?: number,
}

export default verifyInput