type register_input = {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
};

type ValidationErrors = Partial<Record<keyof register_input, string>>;

const validate_register_data = (input: register_input): ValidationErrors => {
  const errors: ValidationErrors = {};

  const validators: Record<keyof register_input, { regex: RegExp; message: string }> = {
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "El correo electrónico debe tener un formato válido.",
    },
    name: {
      regex: /^[a-zA-Z\s]{2,}$/,
      message: "El nombre debe tener al menos 2 caracteres y solo letras.",
    },
    password: {
      regex: /^.{8,}$/,
      message: "La contraseña debe tener al menos 8 caracteres.",
    },
    address: {
      regex: /^[a-zA-Z0-9\s,.-]{5,}$/,
      message: "La dirección debe tener al menos 5 caracteres.",
    },
    phone: {
      regex: /^[+]?[\d\s()-]{7,20}$/,
      message:
        "El teléfono debe tener entre 7 y 20 caracteres y puede incluir '+', espacios, paréntesis y guiones.",
    },
  };

  Object.keys(validators).forEach((field) => {
    const key = field as keyof register_input;

    if (!validators[key].regex.test(input[key])) {
      errors[key] = validators[key].message;
    }
  });

  return errors;
};

export default validate_register_data;
