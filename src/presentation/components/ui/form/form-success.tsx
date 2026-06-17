import { Success } from "../success";

interface FormSuccessProps {
  message: string | null;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return <Success message={message} />;
};
