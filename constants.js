export const EmptyUserObject = {
  apartmentTypes: [],
  price: 0,
  phone: '',
}

export const EmptyErrorsObject = {
  priceError: false,
  phoneError: false,
  apartmentTypeError: false,
}

export const pagesId = {
  rooms: 'rooms',
  price: 'price',
  phone: 'phone',
  final: 'final',
}

export const pagesMap = {
  apartmentTypePage: 0,
  apartmentPricePage: 1,
  formPage: 2,
}

export const apiPaths = {
  getPath: 'https://m2.center/api-quiz/mini/v1/init',
  postPath: 'https://m2.center/api-quiz/mini/v1/submit',
}

export const MAX_PHONE_CHARACTERS = 18;
