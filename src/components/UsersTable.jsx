import React from 'react'

const UsersTable = ({searchResults, showConfirm, handleEditClick, handleDelete, setUserToDelete, setShowConfirm, userToDelete}) => {
  return (
    <div className="overflow-x-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {searchResults?.map((user) => (
              <tr key={user.id}>
                <td className="text-start px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.name}
                </td>
                <td className="text-start px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="text-start px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.phone}
                </td>
                <td className="text-start px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-600 hover:underline mr-3 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setUserToDelete(user);
                      setShowConfirm(true);
                    }}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>

                  {showConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                      <div className="bg-white rounded shadow-lg p-6 w-96">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                          Confirm Deletion
                        </h2>

                        <p className="text-gray-600 mb-6">
                          Are you sure you want to delete{" "}
                          <strong>{userToDelete?.name}</strong>
                        </p>

                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => handleDelete(userToDelete.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default UsersTable