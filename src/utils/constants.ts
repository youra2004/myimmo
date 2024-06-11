export enum DossierTypeIds {
  APPARTMENT = 1,
  HOUSE = 2,
  MULTI_FAMILY_HOUSE = 3,
}

export enum DossierTypes {
  APARTMENT = "apartment",
  HOUSE = "house",
  MULTI_FAMILY_HOUSE = "multi_family_house",
}

export enum ContentTypeMIME {
  MULTIPART_FORM_DATA = "multipart/form-data;",
}

export enum CustomEvents {
  IS_SUBMITTING = "isSubmitting",
  IS_NOT_SUBMITTING = "isNotSubmitting",
  IS_DIRTY = "isDirty",
  IS_NOT_DIRTY = "isNotDirty",
  SUBMIT_DOSSIER = "submitDossier",
  HOME_SHOW_NO_DATA = "homeShowNoData",
  HOME_SHOW_DATA = "homeShowD",
}

export enum Rent {
  NET = "net",
  GROSS = "gross",
}

export enum Screens {
  MAIN = "Main",
  MODAL = "Modal",
}

export enum HTTPStatusCodes {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum Measurement_Units {
  EURO = "€",
  DOLLAR = "$",
  SQUARE_METER = "m²",
  PERCENTAGE = "%",
}
