import { Itransaction } from "../interface/transaction_interface";
import { newTransactionSchema, alternative } from "../libs/jwt";

export function validateTransactionParameters(data: Itransaction) {
  const resultValidation = newTransactionSchema.validate(data, alternative);

  if (resultValidation.error) {
    const errorMessage = resultValidation.error.details[0].message;
    throw new Error(errorMessage);
  }
 
  return resultValidation.value;
}
