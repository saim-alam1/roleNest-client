const CouponTable = ({ couponData, index }) => {
  const { couponCode, couponDescription, discountPercentage } = couponData;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{couponCode}</td>
      <td>{discountPercentage}</td>
      <td>{couponDescription}</td>
    </tr>
  );
};

export default CouponTable;
