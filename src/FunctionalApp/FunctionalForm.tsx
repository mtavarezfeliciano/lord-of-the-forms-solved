import { FormEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserFormData } from "../types";
import {
  isEmailValid,
  isPhoneNumberValid,
  isCityValid,
  isFirstNameValid,
  isLastNameValid,
} from "../utils/validations";
import {
  capitalize,
  formatPhoneNumber,
  preventKeyingNumbers,
} from "../utils/transformations";
import { FunctionalInputProps } from "./FunctionalInputProps";
import { FunctionalPhoneInput } from "./FunctionPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ getUser }: UserFormData) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string[]>(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setPhoneNumber(["", "", "", ""]);
  };

  

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !isFirstNameValid(firstName) ||
      !isLastNameValid(lastName) ||
      !isEmailValid(email) ||
      !isCityValid(city) ||
      !isPhoneNumberValid(phoneNumber)
    ) {
      alert("Bad input data");
      setIsSubmitted(true);
      return;
    }
    setIsSubmitted(false);
    getUser({
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      email: email,
      city: capitalize(city),
      phone: formatPhoneNumber(phoneNumber),
    });
    reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalInputProps
        label={"First Name"}
        inputProps={{
          type: "text",
          placeholder: "Bilbo",
          value: firstName,
          onChange: ({ target: { value } }) => {
            setFirstName(preventKeyingNumbers(value));
          },
        }}
      />

      {isSubmitted && !isFirstNameValid(firstName) && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <FunctionalInputProps
        label={"Last Name"}
        inputProps={{
          type: "text",
          placeholder: "Baggins",
          value: lastName,
          onChange: ({ target: { value } }) => {
            setLastName(preventKeyingNumbers(value));
          },
        }}
      />

      {isSubmitted && !isLastNameValid(lastName) && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}

      {/* Email Input */}
      <FunctionalInputProps
        label={"Email"}
        inputProps={{
          type: "email",
          placeholder: "bilbo@hobbiton-adventures.com",
          value: email,
          onChange: ({ target: { value } }) => {
            setEmail(preventKeyingNumbers(value));
          },
        }}
      />

      {isSubmitted && !isEmailValid(email) && (
        <ErrorMessage message={emailErrorMessage} show={true} />
      )}

      {/* City Input */}
      <FunctionalInputProps
        label={"City"}
        inputProps={{
          type: "text",
          list: "cities",
          placeholder: "Hobbiton",
          value: city,
          onChange: ({ target: { value } }) => {
            setCity(preventKeyingNumbers(value));
          },
        }}
      />

      {isSubmitted && !isCityValid(city) && (
        <ErrorMessage message={cityErrorMessage} show={true} />
      )}

      <FunctionalPhoneInput
        phoneNumber={phoneNumber}
        phoneNumberChange={setPhoneNumber}
      />

      {isSubmitted && !isPhoneNumberValid(phoneNumber) && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
