import cn from "classnames";

export const Info = ({
  className = "",
}: {
  className: string;
}): JSX.Element => {
  return (
    <>
      <svg
        className={cn(className)}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_138_172)">
          <path
            d="M5 0C2.23627 0 0 2.23646 0 5C0 7.76373 2.23646 10 5 10C7.76373 10 10 7.76354 10 5C10 2.23627 7.76352 0 5 0ZM5 9.21875C2.66811 9.21875 0.78125 7.33174 0.78125 5C0.78125 2.66811 2.66826 0.78125 5 0.78125C7.33189 0.78125 9.21875 2.66826 9.21875 5C9.21875 7.33189 7.33172 9.21875 5 9.21875Z"
            fill="#000000"
          />
          <path
            d="M5 4.18613C4.78426 4.18613 4.60938 4.36101 4.60938 4.57675V7.09224C4.60938 7.30798 4.78426 7.48286 5 7.48286C5.21574 7.48286 5.39062 7.30796 5.39062 7.09222V4.57675C5.39062 4.36101 5.21574 4.18613 5 4.18613Z"
            fill="#000000"
          />
          <path
            d="M5 3.70782C5.29124 3.70782 5.52734 3.47172 5.52734 3.18048C5.52734 2.88924 5.29124 2.65314 5 2.65314C4.70876 2.65314 4.47266 2.88924 4.47266 3.18048C4.47266 3.47172 4.70876 3.70782 5 3.70782Z"
            fill="#000000"
          />
        </g>
        <defs>
          <clipPath id="clip0_138_172">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export const Refresh = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M3.59998 10.7857C4.39455 6.87286 7.85312 3.92857 12 3.92857C14.3365 3.92857 16.4554 4.86372 18.0017 6.38"
        stroke="#171A1F"
        strokeWidth="2.05714"
        strokeMiterlimit="10"
      />
      <path
        d="M15.4286 8.21429L19.7143 3.92857L20.5714 9.07143L15.4286 8.21429Z"
        stroke="#171A1F"
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M15.4286 8.21429L19.7143 3.92857L20.5714 9.07143L15.4286 8.21429Z"
        fill="#171A1F"
      />
      <path
        d="M20.4 14.2143C19.6054 18.1263 16.1469 21.0714 12 21.0714C9.66343 21.0714 7.54458 20.1363 5.99829 18.62"
        stroke="#171A1F"
        strokeWidth="2.05714"
        strokeMiterlimit="10"
      />
      <path
        d="M8.57145 16.7857L4.28573 21.0714L3.42859 15.9286L8.57145 16.7857Z"
        stroke="#171A1F"
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M8.57145 16.7857L4.28573 21.0714L3.42859 15.9286L8.57145 16.7857Z"
        fill="#171A1F"
      />
    </svg>
  );
};

export const Flow = ({
  className = "",
}: {
  className?: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="15"
      viewBox="0 0 28 15"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M27.5168 8.20711C27.9073 7.81658 27.9073 7.18342 27.5168 6.79289L21.1528 0.428932C20.7623 0.0384079 20.1291 0.0384079 19.7386 0.428932C19.3481 0.819456 19.3481 1.45262 19.7386 1.84315L25.3954 7.5L19.7386 13.1569C19.3481 13.5474 19.3481 14.1805 19.7386 14.5711C20.1291 14.9616 20.7623 14.9616 21.1528 14.5711L27.5168 8.20711ZM0 8.5H26.8097V6.5H0V8.5Z"
        fill="#686583"
      />
    </svg>
  );
};

export const Warning = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M12 6.49L19.53 19.5L4.47 19.5L12 6.49ZM12 2.5L1 21.5L23 21.5L12 2.5ZM13 16.5L11 16.5V18.5H13V16.5ZM13 10.5L11 10.5L11 14.5L13 14.5L13 10.5Z"
        fill="white"
      />
    </svg>
  );
};

export const CircleClose = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M12 2.5C6.47 2.5 2 6.97 2 12.5C2 18.03 6.47 22.5 12 22.5C17.53 22.5 22 18.03 22 12.5C22 6.97 17.53 2.5 12 2.5ZM12 20.5C7.59 20.5 4 16.91 4 12.5C4 8.09 7.59 4.5 12 4.5C16.41 4.5 20 8.09 20 12.5C20 16.91 16.41 20.5 12 20.5ZM15.59 7.5L12 11.09L8.41 7.5L7 8.91L10.59 12.5L7 16.09L8.41 17.5L12 13.91L15.59 17.5L17 16.09L13.41 12.5L17 8.91L15.59 7.5Z"
        fill="white"
      />
    </svg>
  );
};

export const YellowWarning = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M1 21.5L23 21.5L12 2.5L1 21.5ZM13 18.5H11V16.5L13 16.5V18.5ZM13 14.5L11 14.5L11 10.5L13 10.5L13 14.5Z"
        fill="#ECB90D"
      />
    </svg>
  );
};

export const CircleRightArrow = ({
  className,
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(className)}
    >
      <circle cx="12" cy="12" r="12" fill="#f1babaa3" />
      <path
        d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z"
        fill="#ef5666"
      />
      <path
        d="m13.707 16.707-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L18.414 12l-4.707 4.707z"
        fill="#ef5666"
      />
      <path d="M6 11h11v2H6z" fill="#ef5666" />
    </svg>
  );
};

export const CircleLeftArrow = ({
  className,
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(className)}
    >
      <circle cx="12" cy="12" r="12" fill="#4ADDB670" />
      <path
        d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z"
        fill="#4ADDB6"
      />
      <path
        d="M10.293 16.707 5.586 12l4.707-4.707 1.414 1.414L8.414 12l3.293 3.293-1.414 1.414z"
        fill="#4ADDB6"
      />
      <path d="M7 11h11v2H7z" fill="#4ADDB6" />
    </svg>
  );
};

export const TransactionModalCloseIcon = ({
  className,
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <circle cx="256" cy="256" r="256" fill="#39BFF070" />
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
        fill="#39BFF0"
      />
    </svg>
  );
};

export const LinkIcon = ({ className }: { className: string }): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M14 2L7.59998 8.4"
        stroke="#171A1F"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.40002 2L14 2L14 7.6"
        stroke="#171A1F"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.2 2L3.2 2C2.88174 2 2.57652 2.12643 2.35147 2.35147C2.12643 2.57652 2 2.88174 2 3.2L2 12.8C2 13.1183 2.12643 13.4235 2.35147 13.6485C2.57652 13.8736 2.88174 14 3.2 14L12.8 14C13.1183 14 13.4235 13.8736 13.6485 13.6485C13.8736 13.4235 14 13.1183 14 12.8V10.8"
        stroke="#171A1F"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CirclePlus = ({
  className,
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M13 7L11 7V11H7L7 13H11V17L13 17V13H17L17 11H13V7ZM12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="#171A1F"
      />
    </svg>
  );
};

export const CircleMinus = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 11L7 13L17 13L17 11L7 11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="#171A1F"
      />
    </svg>
  );
};

export const DownArrowIcon = ({
  className,
}: {
  className: string;
}): JSX.Element => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
      >
        <path
          d="M12 16.5C11.8082 16.5 11.6162 16.4267 11.4698 16.2803L3.9698 8.7803C3.67673 8.48723 3.67673 8.01267 3.9698 7.7198C4.26286 7.42692 4.73742 7.42673 5.0303 7.7198L12 14.6895L18.9698 7.7198C19.2629 7.42673 19.7374 7.42673 20.0303 7.7198C20.3232 8.01286 20.3234 8.48742 20.0303 8.7803L12.5303 16.2803C12.3839 16.4267 12.1919 16.5 12 16.5Z"
          fill="#005D8C"
        />
      </svg>
    </>
  );
};

export const ArrowUpLine = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M8.38461 11.3L8.38461 2.5"
        stroke="#082C22"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9846 6.1L8.38461 2.5L4.78461 6.1"
        stroke="#082C22"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3846 14.5L2.38461 14.5"
        stroke="#082C22"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChevronRight = ({
  className,
  disabled,
}: {
  className: string;
  disabled: boolean;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="10"
      viewBox="0 0 320 512"
      className={cn(className)}
      fill={disabled ? "#686583" : "#21254E"}
    >
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
};

export const ChevronLeft = ({
  className,
  disabled,
}: {
  className: string;
  disabled: boolean;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="10"
      viewBox="0 0 320 512"
      className={cn(className)}
      fill={disabled ? "#686583" : "#21254E"}
    >
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );
};
