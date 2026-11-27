export type CategoryData = {
  title: string;
  color: string;
};

export type Category = {
  id: number;
  title: string;
  color: string;
};

export type PaymentMethodData = {
  title: string;
  color: string;
};

export type PaymentMethod = {
  id: number;
  title: string;
  color: string;
};

export type Type = {
  id: number;
  title: string;
  color: string;
  percentage: number;
};

export const SETTINGS_TYPES = {
  EXPENSE_CATEGORY: "expense-category",
  PAYMENT_METHOD: "payment-method",
  EXPENSE_TYPE: "expense-type",
} as const;

export type SettingsType = (typeof SETTINGS_TYPES)[keyof typeof SETTINGS_TYPES];

export type AddableSettingType = Exclude<
  SettingsType,
  typeof SETTINGS_TYPES.EXPENSE_TYPE
>;
