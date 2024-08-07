import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { StaffUserServices } from '../../services/authservices';
import { jwtDecode } from 'jwt-decode';


const Menu = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [checkPermission, setCheckPermission] = useState(null);

  const userdetails = async () => {
    try {
      const response = await StaffUserServices.UserDetails();
      setCheckPermission(response?.is_hod);
      const token = localStorage.getItem('Token');
      const decoded = jwtDecode(token);

      if (decoded.user_type === "1"  && !decoded.is_super_admin) {
        setMenu(adminUserWindows);
      } else if (decoded.user_type === "2") {
        setMenu(checkPermission ? teacherUserWindows : teacherUserWindows);
      } else if (response?.is_hod && decoded.user_type === "2") {
        setMenu(HodsUserWindows);
      } else if (decoded.user_type === "3") {
        setMenu(studentUserWindows);
      }else if (decoded.is_super_admin) {
        setMenu(SuperWindows);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [SuperWindows, setSuperWindows] = useState([
    ['DashBoard', '/dashboard'],
    ['Manage', '/admin/users/'],
  ]);

  const [HodsUserWindows, setHodsUserWindows] = useState([
    ['Home', '/manage'],
    ['Profile', '/users/profilecard'],
    ['ClassRoom', '/users/staff/classrooms'],
    ['Blog/Connect', '/users/blogpost'],
    ['Staffs & Students Leave Requests', '/users/leaverequestapprovel'],
    ['Leave Request', '/users/leaverequest'],
  ]);

  const [teacherUserWindows, setTeacherUserWindows] = useState([
    ['Home', '/manage'],
    ['Profile', '/users/profilecard'],
    ['ClassRooms', '/users/staffs/classrooms'],
    ['Subjects', '/users/subjects'],
    ['Blog/Connect', '/users/blogpost'],
    ['Leave Request', '/users/leaverequest'],
  ]);

  const [adminUserWindows, setAdminUserWindows] = useState([
    ['Home', '/manage'],
    ['Courses', '/users/admin/addcourse'],
    ['Staffs', '/users/admin/addstaff'],
    ['Subjects', '/users/admin/addsubject'],
    ['Students', '/users/admin/addstudent'],
    ['Sessions', '/users/admin/addsession'],
    ['Assign Principal', '/users/addteacher'],
    ['Manage U I', '/users/manageui'],
    ['Set Vision & Mission', '/users/vision&mission'],
  ]);

  const [studentUserWindows, setStudentUserWindows] = useState([
    ['Home', '/manage'],
    ['Profile', '/users/profilecard'],
    ['Subjects', '/users/subjects'],
    ['Blog/Connect', '/users/blogpost'],
    ['Attendence', '/users/attendance'],
    ['Leave Request', '/users/leaverequest'],
  ]);

  const [menu, setMenu] = useState([]);
  console.log(menu)


  useEffect(() => {
    userdetails()
  }, [adminUserWindows, teacherUserWindows, studentUserWindows]);



  // Animation configuration for the window
  const windowAnimation = useSpring({
    opacity: showWindow ? 1 : 0,
    transform: `translateX(${showWindow ? 0 : -100}%)`, // Use translateX for horizontal movement
  });

  return (
    <div className="absolute bg-indigo-950 ">
      <button
        onClick={() => setShowWindow(!showWindow)}
        className="absolute top-2 left-4 bg-white p-2 rounded-full cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-indigo-950"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <animated.div
        style={{ ...windowAnimation, width: showWindow ? '25%' : '0%' }}
        className="bg-transparent p-6 text-white rounded-md absolute top-16 left-4 right-5 h-[500px] z-40"
      >
        {menu.map((s, index) => (
          <NavLink key={index} to={s[1]}>
            <div
              key={s}
              className="w-48 mt-3 p-2  bg-gray-600 opacity-90 text-white text-center text-sm font-semibold rounded-md shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            >
              <div className="">{s[0]}</div>
            </div>
          </NavLink>
        ))}
      </animated.div>
    </div>
  );
};

export default Menu;
