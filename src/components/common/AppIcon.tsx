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

export const StellarLogo = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="27"
      viewBox="0 0 105 27"
      fill="none"
    >
      <g clipPath="url(#clip0_1_4)">
        <mask
          id="mask0_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="108"
          height="27"
        >
          <path
            d="M106.907 0.276001H-0.954681V26.526H106.907V0.276001Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_1_4)">
          <path
            d="M14.828 0.325005C16.6233 0.325005 18.3609 0.668004 20.0048 1.34C20.8772 1.697 21.7136 2.152 22.4922 2.684L22.3264 2.768L20.1922 3.825C18.5628 2.943 16.7098 2.481 14.828 2.481C14.7992 2.481 14.7703 2.481 14.7415 2.481C13.2923 2.495 11.8791 2.775 10.5453 3.314C9.21142 3.86 8.01456 4.637 6.99074 5.631C4.89984 7.668 3.74624 10.37 3.74624 13.24C3.74624 13.709 3.77508 14.178 3.83997 14.647L3.8616 14.794L3.99859 14.724L22.4201 5.603L26.2342 3.713L30.553 1.571V3.993L26.1045 6.198L23.9198 7.276L4.50329 16.901L4.41677 16.95L3.42179 17.44L2.41239 17.937V17.93L2.31866 17.972L-0.911423 19.575V17.153L0.184499 16.614C1.10017 16.159 1.64813 15.221 1.56882 14.22C1.54719 13.891 1.53277 13.562 1.53277 13.233C1.53277 11.49 1.88606 9.796 2.57822 8.2C3.24875 6.66 4.20768 5.281 5.42617 4.091C6.64466 2.908 8.06503 1.97 9.65123 1.319C11.2879 0.668004 13.0327 0.325005 14.828 0.325005Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask1_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="108"
          height="27"
        >
          <path
            d="M106.903 0.473H-0.958282V26.723H106.903V0.473Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_1_4)">
          <path
            d="M30.5566 7.431V9.853L29.4607 10.392C28.545 10.847 27.9971 11.785 28.0764 12.786C28.1052 13.115 28.1124 13.451 28.1124 13.78C28.1124 15.523 27.7591 17.217 27.067 18.813C26.3965 20.353 25.4375 21.732 24.219 22.922C23.0005 24.112 21.573 25.043 19.994 25.694C18.3573 26.366 16.6125 26.709 14.8172 26.709C13.0219 26.709 11.2843 26.366 9.64042 25.694C8.7608 25.33 7.92444 24.875 7.14576 24.343L9.35202 23.251L9.43854 23.209C11.068 24.091 12.9282 24.56 14.8172 24.56C14.846 24.56 14.8677 24.56 14.8965 24.56C16.3457 24.553 17.7589 24.273 19.0927 23.727C20.4266 23.181 21.6234 22.404 22.6473 21.41C24.7382 19.38 25.8918 16.671 25.8918 13.801C25.8918 13.332 25.8629 12.856 25.798 12.387L25.7764 12.24L25.6394 12.31L7.20344 21.417L3.38935 23.307L-0.915024 25.435V23.013L3.51913 20.815L5.70376 19.737L30.5566 7.431Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask2_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="108"
          height="27"
        >
          <path
            d="M106.989 0.376503H-0.872787V26.6265H106.989V0.376503Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask2_1_4)">
          <path
            d="M52.885 9.3015H50.448C49.8352 7.2925 47.8164 6.6205 46.0139 6.6205C44.6367 6.6205 42.2214 7.2155 42.2214 9.1545C42.2214 10.6875 43.4759 11.4505 45.127 11.8075L47.1963 12.2625C49.9289 12.8365 53.2022 13.8375 53.2022 17.3305C53.2022 20.7255 49.9505 22.5175 46.4032 22.5175C42.1926 22.5175 39.5321 20.2915 39.0634 16.8265H41.5292C41.9979 19.2205 43.7211 20.4595 46.4537 20.4595C49.0853 20.4595 50.6138 19.2415 50.6138 17.5405C50.6138 15.7205 49.0132 14.9575 46.7709 14.4815L44.5574 14.0265C42.1205 13.5015 39.6546 12.1855 39.6546 9.2945C39.6546 5.9975 43.2236 4.5625 46.1076 4.5625C49.316 4.5695 52.1928 5.9555 52.885 9.3015Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask3_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="109"
          height="27"
        >
          <path
            d="M107.019 0.389999H-0.842926V26.64H107.019V0.389999Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask3_1_4)">
          <path
            d="M58.7766 6.137V9.364H61.2857V11.107H58.7766V18.73C58.7766 20.067 58.8775 20.403 60.1537 20.403H61.2857V22.223H59.6634C57.1255 22.223 56.5343 21.67 56.5343 18.996V11.107H54.4434V9.364H56.5343V6.137H58.7766Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask4_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="109"
          height="27"
        >
          <path
            d="M107.048 0.4375H-0.813477V26.6875H107.048V0.4375Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask4_1_4)">
          <path
            d="M68.9 20.6745C70.8684 20.6745 71.9499 19.8135 72.5194 18.5465H74.8339C74.221 20.7725 72.1229 22.5855 68.9 22.5855C64.711 22.5855 62.3966 19.6665 62.3966 15.8655C62.3966 11.7985 65.2013 9.1945 68.8207 9.1945C72.8583 9.1945 75.2953 12.4915 74.9997 16.5585H64.8047C64.9129 19.3305 66.9317 20.6745 68.9 20.6745ZM72.642 14.6965C72.5915 12.8765 71.1928 11.0635 68.8279 11.0635C66.8308 11.0635 65.0355 12.1135 64.8408 14.6965H72.642Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask5_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="109"
          height="27"
        >
          <path
            d="M107.069 0.373001H-0.79245V26.623H107.069V0.373001Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask5_1_4)">
          <path
            d="M77.1476 22.206V4.874H79.39V22.206H77.1476Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask6_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="109"
          height="27"
        >
          <path
            d="M107.089 0.373001H-0.772888V26.623H107.089V0.373001Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask6_1_4)">
          <path
            d="M82.1638 22.206V4.874H84.4061V22.206H82.1638Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask7_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="109"
          height="27"
        >
          <path
            d="M107.112 0.442001H-0.749695V26.692H107.112V0.442001Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask7_1_4)">
          <path
            d="M95.4605 14.365V14.057C95.4605 11.712 94.1051 10.928 92.454 10.928C90.6082 10.928 89.5267 11.908 89.4258 13.483H87.1114C87.3349 10.711 89.844 9.157 92.4323 9.157C96.0734 9.157 97.7245 10.851 97.7029 14.463L97.6812 17.424C97.6596 19.573 97.7822 21.057 98.0273 22.275H95.7634C95.6913 21.799 95.6192 21.274 95.5903 20.504C94.7756 21.82 93.3985 22.583 91.0624 22.583C88.575 22.583 86.5057 21.246 86.5057 18.88C86.4985 15.849 90.017 14.96 95.4605 14.365ZM88.986 18.838C88.986 20.056 89.9449 20.868 91.5455 20.868C93.6364 20.868 95.6336 19.937 95.6336 16.899V16.087C91.5671 16.493 88.986 17.067 88.986 18.838Z"
            fill="#0F0F0F"
          />
        </g>
        <mask
          id="mask8_1_4"
          style={{maskType:"luminance"}}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="109"
          height="27"
        >
          <path
            d="M107.139 0.438004H-0.722412V26.688H107.139V0.438004Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask8_1_4)">
          <path
            d="M105.877 11.589C103.808 11.589 102.777 12.716 102.777 15.537V22.278H100.535V9.412H102.727V11.659C103.39 10.203 104.745 9.391 106.469 9.342C106.692 9.342 106.887 9.342 107.132 9.363V11.68C106.663 11.638 106.245 11.589 105.877 11.589Z"
            fill="#0F0F0F"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_4">
          <rect width="105" height="27" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
