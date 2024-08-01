import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div> <nav className="bg-gray-800 text-white p-4">
    <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
                <span className="font-semibold text-xl">User Management System</span>
            </div>
            <div className="hidden md:block">
                <ul className="flex space-x-4">
                    <li><a href="#home" className="hover:text-gray-300">Home</a></li>
                    <li><a href="#users" className="hover:text-gray-300">Users</a></li>
                    <li><a href="#users" className="hover:text-gray-300">Logout</a></li>
                </ul>
            </div>
           
        </div>
    </div>
</nav></div>
  )
}

export default Navbar