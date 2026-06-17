import { Alert } from "../alert";

interface FormErrorProps {
  message: string | null;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <Alert message={message} />;
};
