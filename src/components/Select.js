import React, { useRef, useEffect } from "react";
import {ReactComponent as ArrowDownSVG} from "../assets/images/svgs/arrowdown.svg";

const OutsideDetector = ({
  children,
  onOutsideClick: handleOutsideClick,
}) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        handleOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return <div ref={wrapperRef}>{children}</div>;
};

const getTitleFromValue = (data, value) => {
  return data.find((item) => item.value === value)?.title || "";
};

const Select = ({
  data,
  current,
  placeholder = "Choose one",
  onChange: handleChange,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <OutsideDetector onOutsideClick={() => setOpen(false)}>
      <div x-data="select" className={`${className} relative w-[30rem]`}>
        <button
          onClick={() => setOpen(!open)}
          className={`${open && "ring-blue-600"
            } flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300`}
        >
          <span>{getTitleFromValue(data, current) || placeholder}</span>
          <div className="text-gray-600">
            <ArrowDownSVG width={14} className="mr-2" />
          </div>
        </button>

        {open && (
          <ul className="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300">
            {data &&
              data.map((item, index) => (
                <li
                  className="cursor-pointer select-none p-2 hover:bg-gray-200"
                  onClick={() => {
                    setOpen(false);
                    handleChange(item.value);
                  }}
                  key={index}
                >
                  {item.title}
                </li>
              ))}
          </ul>
        )}
      </div>
    </OutsideDetector>
  );
};

export default Select;
