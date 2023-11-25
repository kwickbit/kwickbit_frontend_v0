import cn from 'classnames';

export const Info = ({className=""}: {className: string}): JSX.Element => {
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

export const Flow = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="15"
      viewBox="0 0 28 15"
      fill="none"
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M12 6.49L19.53 19.5L4.47 19.5L12 6.49ZM12 2.5L1 21.5L23 21.5L12 2.5ZM13 16.5L11 16.5V18.5H13V16.5ZM13 10.5L11 10.5L11 14.5L13 14.5L13 10.5Z" fill="white"/>
    </svg>    
  )
}

export const CircleClose = ():JSX.Element => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M12 2.5C6.47 2.5 2 6.97 2 12.5C2 18.03 6.47 22.5 12 22.5C17.53 22.5 22 18.03 22 12.5C22 6.97 17.53 2.5 12 2.5ZM12 20.5C7.59 20.5 4 16.91 4 12.5C4 8.09 7.59 4.5 12 4.5C16.41 4.5 20 8.09 20 12.5C20 16.91 16.41 20.5 12 20.5ZM15.59 7.5L12 11.09L8.41 7.5L7 8.91L10.59 12.5L7 16.09L8.41 17.5L12 13.91L15.59 17.5L17 16.09L13.41 12.5L17 8.91L15.59 7.5Z" fill="white"/>
    </svg>    
  )
}

export const YellowWarning = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M1 21.5L23 21.5L12 2.5L1 21.5ZM13 18.5H11V16.5L13 16.5V18.5ZM13 14.5L11 14.5L11 10.5L13 10.5L13 14.5Z" fill="#ECB90D"/>
    </svg>    
  )
}