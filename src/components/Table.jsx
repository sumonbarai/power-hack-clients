import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bill from "./Bill";
import getBillingId from "../shared/ui/getBillingId";
import Modal from "./Modal";
import Pagination from "./Pagination";

const Table = ({ bills }) => {
  const [opened, setOpened] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const demo = useSelector((state) => state.demo);
  const { sliceStart, sliceEnd, name, email, phone } = useSelector(
    (state) => state.filter
  );

  const demoBills = [
    { ...demo, _id: getBillingId(8) },
    ...bills.slice(1).reverse(),
  ];

  const controlModal = (data) => {
    setOpened((prevState) => !prevState);
    setUpdateData(data);
  };

  // filtering function
  const filtering = (f) => {
    if (name) {
      return f.name.toLowerCase().includes(name.toLowerCase());
    }
    if (email) {
      return f.email.toLowerCase() === email.toLowerCase();
    }
    if (phone) {
      return f.phone.includes(phone);
    }

    return true;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full bg-[#F2F2F2]">
          <tr className="text-center">
            <th>Billing ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>

          {demoBills[0].billingId === "Loading..." &&
            demoBills
              .slice()
              .slice(sliceStart, sliceEnd)
              .map((data) => (
                <Bill key={data._id} data={data} control={controlModal} />
              ))}

          {demoBills[0].billingId === "" &&
            bills
              .slice()
              .reverse()
              .filter(filtering)
              .slice(sliceStart, sliceEnd)
              .map((data) => (
                <Bill key={data._id} data={data} control={controlModal} />
              ))}
        </table>
      </div>
      <div className="pt-4 flex justify-center items-center">
        <Pagination />
      </div>
      {opened && (
        <Modal open={opened} control={controlModal} updateData={updateData} />
      )}
    </>
  );
};

export default Table;
