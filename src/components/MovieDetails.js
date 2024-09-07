export const MovieDetails = ({ emoji, children }) => {
  return (
    <p>
      <span>{emoji}</span>
      <span>{children}</span>
    </p>
  );
};
