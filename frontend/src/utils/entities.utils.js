import { checkForUndefinedProps, getUndefinedProps, throwUndefinedPropError } from '@/utils/validate.utils';

export const validatePayload = checkForUndefinedProps(getUndefinedProps, throwUndefinedPropError);
