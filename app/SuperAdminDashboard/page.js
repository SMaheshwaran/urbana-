"use client";
import PressableCard from "@/Components/Cards";
import { useEffect, useState } from "react";
export default function SuperAdminDashBoard() {
  const [AdminList, setAdminList] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [UnapprovedAdmin, setUnapprovedAdmin] = useState(false);
  const [data, setData] = useState([]);
  const handleFirst = () => {
    setAdminList(true);
    setUnapprovedAdmin(false);
  };
  const handleSecond = () => {
    setAdminList(false);
    setUnapprovedAdmin(true);
  };
  const getData = async () => {
    try {
      const res = await fetch("/api/SuperAdminDashboard");
      const dataRes = await res.json();
      setData(dataRes);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    getData();
    console.log(data);
    setLoaded(true);
  }, []);

  const approvedAdmin = async (id) => {
    try {
      const res = await fetch("/api/SuperAdminDashboard", {
        method: "PATCH",
        body: JSON.stringify({
          _id: id,
        }),
      });
      if (res.ok) {
        console.log("approved");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen items-center mt-7 ">
      <div className="flex h-fit gap-[100px] ">
        <PressableCard text="Admins list" onClick={handleFirst} />
        <PressableCard text="Unapproved Admins" onClick={handleSecond} />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[100px]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loaded ? (
              data.map((d, i) => (
                <tr
                  key={d._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{d.name}</td>
                  <td className="px-6 py-4">{d.username}</td>

                  <td className="px-6 py-4">
                    {d.approved ? (
                      "approved"
                    ) : (
                      <button
                        type="button"
                        className="bg-blue-300 px-10 py-4 border text-black"
                        onClick={() => approvedAdmin(d._id)}
                      >
                        approve now
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div>No data</div>
            )}
            {/* <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">Gray</td>
              <td className="px-6 py-4">Gray</td>

              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Red</td>
              <td className="px-6 py-4">Red</td>

              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
