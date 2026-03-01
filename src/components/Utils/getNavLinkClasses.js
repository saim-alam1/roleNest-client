const getNavLinkClasses = ({ isActive, isGlassy, isMobile }) => {
  // For Mbl View
  if (isMobile) {
    return `${isActive ? "text-[#2563EB] bg-blue-50" : "text-[#374151]"} text-base`;
  }

  // For isActive/Not Active
  if (!isGlassy) {
    return `${isActive ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-blue-50" : "text-[#374151]"} text-base focus:bg-transparent active:bg-transparent`;
  } else {
    return `${isActive ? "text-white border-b-2 border-white bg-transparent" : "text-white"} text-base focus:bg-transparent active:bg-transparent`;
  }
};

export default getNavLinkClasses;
