import { useState, useCallback } from "react";

export enum VALIDATION_STATUS {
  VALID = "VALID",
  INVALID = "INVALID",
  PENDING = "PENDING"
}

export const usePasswordMatcher = ({
  password = "",
  passwordConfirmation = "",
  requiredLength = 8
}: {
  password: string;
  passwordConfirmation?: string;
  requiredLength?: number;
}) => {
  const [hasValidLength, setHasValidLength] = useState<VALIDATION_STATUS>(
    VALIDATION_STATUS.PENDING
  );
  const [hasNumber, setHasNumber] = useState<VALIDATION_STATUS>(
    VALIDATION_STATUS.PENDING
  );
  const [hasUpperCase, setHasUpperCase] = useState<VALIDATION_STATUS>(
    VALIDATION_STATUS.PENDING
  );
  const [hasLowerCase, setHasLowerCase] = useState<VALIDATION_STATUS>(
    VALIDATION_STATUS.PENDING
  );
  const [hasSpecialChar, setHasSpecialChar] = useState<VALIDATION_STATUS>(
    VALIDATION_STATUS.PENDING
  );

  const [isMatch, setIsMatch] = useState<VALIDATION_STATUS>(
    VALIDATION_STATUS.PENDING
  );

  const validate = useCallback(() => {
    setHasValidLength(
      password.length >= requiredLength
        ? VALIDATION_STATUS.VALID
        : VALIDATION_STATUS.INVALID
    );
    setHasUpperCase(
      password.toLowerCase() !== password
        ? VALIDATION_STATUS.VALID
        : VALIDATION_STATUS.INVALID
    );
    setHasLowerCase(
      password.toUpperCase() !== password
        ? VALIDATION_STATUS.VALID
        : VALIDATION_STATUS.INVALID
    );
    setHasNumber(
      /\d/.test(password) ? VALIDATION_STATUS.VALID : VALIDATION_STATUS.INVALID
    );
    setHasSpecialChar(
      /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/.test(password)
        ? VALIDATION_STATUS.VALID
        : VALIDATION_STATUS.INVALID
    );

    setIsMatch(
      !!password && password === passwordConfirmation
        ? VALIDATION_STATUS.VALID
        : VALIDATION_STATUS.INVALID
    );
  }, [password, passwordConfirmation, requiredLength]);

  return {
    hasValidLength,
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    isMatch,
    validate
  };
};

export default usePasswordMatcher;
