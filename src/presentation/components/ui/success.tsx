interface SuccessProps {
  message: string;
}

export const Success = ({ message }: SuccessProps) => {
  return (
    <div className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
      {message}
    </div>
  );
};
