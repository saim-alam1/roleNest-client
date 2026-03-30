const PaymentHistoryTable = ({ payment, apartmentInfo }) => {
  return (
    <tr>
      <td className="px-4 py-2">{payment.month}</td>
      <td className="px-4 py-2">{payment.couponCode || "-"}</td>
      <td className="px-4 py-2">{payment.finalRent}</td>
      <td className="px-4 py-2">{payment.transactionId}</td>
      <td className="px-4 py-2 text-green-800 font-medium">
        {payment.finalRent ? "Paid" : "Pending"}
      </td>
      <td className="px-4 py-2">
        {payment.paidAt
          ? new Date(payment.paidAt).toLocaleDateString("en-GB")
          : "-"}
      </td>
      <td className="px-4 py-2">{apartmentInfo.floorNo || "-"}</td>
      <td className="px-4 py-2">{apartmentInfo.blockName || "-"}</td>
      <td className="px-4 py-2">{apartmentInfo.apartmentNo || "-"}</td>
    </tr>
  );
};

export default PaymentHistoryTable;
