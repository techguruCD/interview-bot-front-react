import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils';

import LogoMainImage from '../assets/images/logo-main.png'
import { ReactComponent as AirplaneSVG } from '../assets/images/svgs/airplane.svg'
import { ReactComponent as MenuSVG } from '../assets/images/svgs/menu.svg'
import { ReactComponent as CloseSVG } from '../assets/images/svgs/close.svg'
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';
import { setUser } from '../store/appSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.app.token)
  const user = useSelector(state => state.app.user)
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate()
  const menu = useMemo(() => {
    if (!user) {
      return [
        {
          title: "Home",
          path: "/",
          auth: 'normal'
        },
        {
          title: "About",
          path: "/about",
          auth: 'normal'
        },
        {
          title: "Blog",
          path: "/#blog",
          auth: 'normal'
        },
        {
          title: "Login / Register",
          path: "/signin",
          auth: 'public'
        }
      ]
    }
    if (user.role !== 'ADMIN') {
      return [
        {
          title: "Home",
          path: "/",
          auth: 'normal'
        },
        {
          title: "Profile",
          path: "/profile",
          auth: 'private'
        },
        {
          title: "About",
          path: "/about",
          auth: 'normal'
        },
        {
          title: "Blog",
          path: "/#blog",
          auth: 'normal'
        },
        {
          title: "Logout",
          path: "/signout",
          auth: 'private'
        }
      ]
    } else {
      return [
        {
          title: "Users",
          path: "/admin/users",
          auth: 'private'
        },
        {
          title: "Blogs",
          path: "/admin/blogs",
          auth: 'normal'
        },
        {
          title: "Chatbot",
          path: "/admin/chatbot",
          auth: 'private'
        },
        {
          title: "Setting",
          path: "/admin/setting",
          auth: 'normal'
        },
        {
          title: "Logout",
          path: "/signout",
          auth: 'private'
        }
      ]
    }
  })
  // const router = useRouter();
  // const { userToken } = useGlobalState();
  // const dispatch = useGlobalDispatch();

  let menuItems = menu.map((item) => {
    return item;
  });

  // const navigate = useNavigate();
  const toggleMenu = (force = false) => {
    const navLinks = document.getElementById("navLinks");
    navLinks?.classList.toggle("opacity-0", force);
    navLinks?.classList.toggle("pointer-events-none", force);
    // navLinks?.classList.toggle('hidden', force);
  };

  return (
    <div className="w-full bg-[#F8F9FA]">
      <nav className="max-w-[1200px] relative z-50 flex items-center gap-[30px] px-[20px] mx-[20px] md:mx-auto ">
        <div className="flex items-center gap-[10px]">
          <img src={LogoMainImage} className="w-10" alt="logo" />
          <span className="font-black text-xl">interview bot</span>
        </div>
        <div className="flex items-center flex-1">
          <div
            id="navLinks"
            className="pointer-events-none fixed inset-0 z-[99] list-none items-center bg-black text-gray-700 opacity-0 transition-opacity duration-200 md:pointer-events-auto md:relative md:flex md:bg-transparent md:opacity-100"
          >
            <div className="my-[28px] mx-[23px] md:hidden">
              <div
                className="ml-auto flex h-6 w-6 items-center justify-center"
                onClick={() => toggleMenu(true)}
              >
                <CloseSVG />
              </div>
            </div>
            <ul className="mx-[20px] mt-[3px] flex flex-col justify-center md:mx-[0px] md:mt-[0px] md:flex-row md:items-center">
              {menuItems &&
                menuItems.map((item, index) => {
                  const selected = (item.path === pathname || (item.path === '/signin' && pathname === '/signup'));
                  // alert(selected)
                  return (
                    <li
                      key={index}
                      className={cn({
                        "cursor-pointer border-b-[1px] md:border-transparent md:border-b-[3px] border-[#FFFFFF10]  px-[5px] py-[30px] text-[15px] text-white md:text-black transition duration-300 ease-in hover:text-[#00D5FF] md:py-[25px] md:px-[20px] font-[500]":
                          true,
                        "md:text-[#6355D8] md:border-[#6355D8]": selected,
                      })}
                      onClick={() => {
                        if (item.title === 'Logout') {
                          dispatch(setUser(null))
                          setAuthToken(null)
                          return;
                        } else if (item.title === "Blog") {
                          if (pathname === '/') {
                            const hash = window.location.hash
                            if (hash) {
                              const element = document.querySelector(hash)
                              if (element) element.scrollIntoView({behavior: 'smooth'})
                            }
                          }
                        }
                        navigate(item.path)
                      }}
                      suppressHydrationWarning={true}
                    >
                      {item?.title}
                    </li>
                  );
                })}
            </ul>
          </div>
          <button
            className="ml-auto md:hidden py-[25px]"
            onClick={() => toggleMenu()}
          >
            <MenuSVG />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;