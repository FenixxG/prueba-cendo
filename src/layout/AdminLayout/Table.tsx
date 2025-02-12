import type React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { FiFileText } from "react-icons/fi";

interface TableColumn<T> {
    header: string
    accessor: keyof T
    cell?: (item: T) => React.ReactNode
}

interface TableProps<T> {
    data: T[]
    columns: TableColumn<T>[]
    onEdit?: (item: T) => void
    onView?: (item: T) => void
    onDelete?: (item: T) => void
}

export function Table<T extends { [key: string]: any }>({ data, columns, onEdit, onView, onDelete }: TableProps<T>) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                        {(onEdit || onView || onDelete) && (
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {column.cell ? column.cell(item) : item[column.accessor]}
                                </td>
                            ))}
                            {(onEdit || onView || onDelete) && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        {onEdit && (
                                            <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800">
                                                <FaEdit size={18} />
                                            </button>
                                        )}
                                        {onView && (
                                            <button onClick={() => onView(item)} className="text-gray-600 hover:text-gray-800">
                                                <FiFileText size={18} />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800">
                                                <FaTrash size={18} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

