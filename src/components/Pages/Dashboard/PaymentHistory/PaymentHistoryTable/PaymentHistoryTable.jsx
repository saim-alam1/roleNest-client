const PaymentHistoryTable = ({ payment, apartmentInfo }) => {
  return (
    <tr className="border-none">
      <td className="px-4 py-2 border-b">{payment.month}</td>
      <td className="px-4 py-2 border-b">{payment.couponCode || "-"}</td>
      <td className="px-4 py-2 border-b">{payment.finalRent}</td>
      <td className="px-4 py-2 border-b">{payment.transactionId}</td>
      <td className="px-4 py-2 border-b">
        {payment.finalRent ? "Paid" : "Pending"}
      </td>
      <td className="px-4 py-2 border-b">
        {payment.paidAt
          ? new Date(payment.paidAt).toLocaleDateString("en-GB")
          : "-"}
      </td>
      <td className="px-4 py-2 border-b">{apartmentInfo.floorNo || "-"}</td>
      <td className="px-4 py-2 border-b">{apartmentInfo.blockName || "-"}</td>
      <td className="px-4 py-2 border-b">{apartmentInfo.apartmentNo || "-"}</td>
    </tr>
  );
};

export default PaymentHistoryTable;
