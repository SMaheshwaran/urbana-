"use client";

import { useEffect, useState } from "react";
export default function UserDashboard() {
  const [name, setName] = useState({
    username: "",
  });
  const [data, setData] = useState();
  const [gotEndPoint, setGotEndPoint] = useState(false);
  const [approved, setApproved] = useState(false);
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    const currentEndpoint =
      typeof window !== "undefined" ? window.location.pathname : "";
    // console.log(currentEndpoint);
    const endpoint = currentEndpoint.split("/").pop();
    console.log(endpoint);
    setName({ ...name, username: endpoint });
    setGotEndPoint(true);
  }, []);

  useEffect(() => {
    console.log(name);
    const getNotifyData = async () => {
      try {
        const res = await fetch("/api/UserDashboard", {
          method: "POST",
          body: JSON.stringify(name),
        });
        console.log("response", res);
        if (res.ok) {
          console.log("okay");

          const notification = await res.json();
          console.log(notification);
          setData(notification);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (gotEndPoint) {
      getNotifyData();
    }
  }, [gotEndPoint, approved, denied]);

  const handleApprove = async (id) => {
    console.log("summ");
    console.log(id);
    try {
      const res = await fetch("/api/NotifyUser", {
        method: "PATCH",
        body: JSON.stringify({
          _id: id,
        }),
      });
      if (res.ok) {
        console.log("approved");
        setApproved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeny = async (id) => {
    try {
      const res = await fetch("/api/UserDashboard", {
        method: "PATCH",
        body: JSON.stringify({
          _id: id,
        }),
      });
      if (res.ok) {
        console.log("approved");
        setDenied(false);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("sds");
    console.log(id);
  };

  return (
    <div className="w-full h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[150px]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Notification
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, i) => (
                <tr
                  key={d._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {d.notificationType === 3
                      ? "You have a visitor"
                      : d.notificationType === 2
                      ? "You have a product delivery"
                      : "You have a food delivery"}
                  </td>
                  <td className="px-6 py-4">{d.timeOfNotification}</td>
                  <td className="px-6 py-4">{d.Message}</td>
                  <td className="px-6 py-4">
                    {d.Approved ? (
                      "Approved"
                    ) : d.Denied ? (
                      "Denied"
                    ) : (
                      <div className="flex justify-around gap-4">
                        <button
                          type="button"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
                          onClick={() => handleApprove(d._id)}
                        >
                          Approve
                        </button>
                        <div>OR</div>
                        <button
                          type="button"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleDeny(d._id)}
                        >
                          Denied
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
