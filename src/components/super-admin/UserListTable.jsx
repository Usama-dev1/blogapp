import React, { useState } from "react";

const UserListTable = () => {
  return (
    <div className="max-w-full mx-auto">
      <div className="relative flex flex-col w-full text-body-text bg-primary">
        <div className="relative mx-4 mt-4 overflow-hidden text-body-text bg-primary">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-body-text">
                User List
              </h3>
            </div>
          </div>
        </div>
        <div className="p-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm  text-muted-text">
                    User
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm  text-muted-text">
                    Role
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm  text-muted-text">
                    Status
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm  text-muted-text">
                    Joined Date
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm  text-muted-text"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                      alt="John Michael"
                      className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-body-text">
                        John Michael
                      </p>
                      <p className="text-sm text-muted-text">
                        john@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-border">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-body-text">
                      Manager
                    </p>
                    <p className="text-sm text-muted-text">Organization</p>
                  </div>
                </td>
                <td className="p-4 border-b border-border">
                  <div className="w-max">
                    <div className="relative grid items-center px-2 py-1 text-xs font-bold text-green-900 uppercase rounded-md  bg-green-500/20">
                      <span>online</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-border">
                  <p className="text-sm text-muted-text">23/04/18</p>
                </td>
                <td className="p-4 border-b border-border">
                  <button className="btn-primary btn-sm">edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="block text-sm text-muted-text">Page 1 of 10</p>
          <div className="flex gap-1">
            <button
              className="rounded border border-border py-2.5 px-3 text-center text-xs font-semibold text-muted-text"
              type="button"
            >
              Previous
            </button>
            <button
              className="rounded border border-border py-2.5 px-3 text-center text-xs font-semibold text-muted-text"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListTable;
