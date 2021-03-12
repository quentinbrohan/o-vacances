import { isFuture, parseISO } from 'date-fns';

import { EMAIL_REGEX, PASSWORD_PATTERN } from 'src/constants/patterns';

export const validateIsFutureStartDate = (startDate) => {
  if (!isFuture(parseISO(startDate))) {
    return "La date de départ ne peut pas être antérieure à aujourd'hui.";
  }
};

export const ValidateIsFutureEndDate = (endDate, startDate) => {
  if (!isFuture(parseISO(endDate), parseISO(startDate))) {
    return 'La date de retour ne peut pas être antérieure à la date de départ.';
  }
};


export const rulesEmail = {
  required: 'Email requis.',
  pattern: {
    value: EMAIL_REGEX,
    message: 'Email invalide.',
  },
};

export const rulesLoginPassword = {
  required: 'Mot de passe requis.',
};

export const rulesFirstname = {
  required: 'Prénom requis.',
  maxLength: {
    value: 80,
  },
};

export const rulesLastname = {
  required: 'Nom requis.',
  maxLength: {
    value: 80,
  },
};

export const rulesPassword = {
  required: 'Mot de passe requis.',
  minLength: {
    value: 8,
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
  pattern: {
    value: new RegExp(PASSWORD_PATTERN),
    message:
      'Le mot de passe doit contenir au moins: 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial (#?!@$%^&*-/) et faire au moins 8 caractères.',
  },
};

export const rulesContactMessage = {
  required: 'Message requis.',
  minLength: {
    value: 20,
    message: '20 caractères minimum.',
  },
};

export const rulesTripFormTitle = {
  required: 'Titre requis.',
  maxLength: {
    value: 80,
  },
};

export const rulesTripFormDescription = {
  required: 'Description requise. Maximum 750 caractères.',
  maxLength: {
    value: 500,
  },
};

export const rulesTripFormLocation = {
  required: 'Lieu requis.',
  maxLength: {
    value: 100,
  },
};
