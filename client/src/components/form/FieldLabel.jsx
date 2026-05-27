const FieldLabel = ({ children, required }) => (
  <label className="block text-label mb-1.5">
    {children}
    {required && <span className="text-red-500 ml-0.5"> *</span>}
  </label>
);

export default FieldLabel;
