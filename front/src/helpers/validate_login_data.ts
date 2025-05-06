type LoginInput = {
  email: string;
  password: string;
};

type ValidationErrors = {
  email?: string;
  password?: string;
};

const validate_login_data = (input: LoginInput): ValidationErrors => {
  const errors: ValidationErrors = {};

  const validators: Record<keyof LoginInput, { regex: RegExp; message: string }> = {
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "El correo electrónico debe tener un formato válido.",
    },
    password: {
      regex: /^.{8,}$/,
      message: "La contraseña debe tener al menos 8 caracteres",
    },
  };

  Object.keys(validators).forEach((field) => {
    const key = field as keyof LoginInput;

    if (!validators[key].regex.test(input[key])) {
      errors[key] = validators[key].message;
    }
  });

  return errors;
};

export default validate_login_data;
