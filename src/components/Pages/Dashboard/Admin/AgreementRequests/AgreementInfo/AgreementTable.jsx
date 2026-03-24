const AgreementTable = ({
  application,
  handleAcceptAgreement,
  handleRejectAgreement,
}) => {
  return (
    <tr key={application._id}>
      <td className="max-w-45 truncate">{application.userName}</td>
      <td>{application.userEmail}</td>
      <td>{application.floorNo}</td>
      <td>{application.blockName}</td>
      <td>{application.apartmentNo}</td>
      <td className="whitespace-nowrap">{application.rent} ৳</td>
      <td>{new Date(application.requestedAt).toLocaleDateString()}</td>
      <td>{application.status}</td>

      <td>
        <button
          onClick={() => handleAcceptAgreement(application.userEmail)}
          className="btn border-none btn-xs btn-success"
        >
          Accept
        </button>
      </td>

      <td>
        <button
          onClick={() => handleRejectAgreement(application.userEmail)}
          className="btn border-none btn-xs btn-error"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default AgreementTable;
