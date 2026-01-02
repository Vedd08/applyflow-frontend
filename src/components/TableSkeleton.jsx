const TableSkeleton = ({ rows = 5 }) => {
  return (
    <table className="table">
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            <td colSpan="6">
              <div
                className="bg-light"
                style={{
                  height: 20,
                  borderRadius: 4,
                  animation: 'pulse 1.5s infinite'
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
