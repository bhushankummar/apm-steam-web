import React from 'react';
import { NavLink } from 'react-router-dom';

type AppNavLinkProps = {
  activeClassName: string;
  className: string;
  [x: string]: any;
};

const AppNavLink = React.forwardRef<HTMLAnchorElement, Omit<AppNavLinkProps, 'ref'>>(
  ({ activeClassName, className, ...rest }, ref) => {
    return (
      <NavLink
        ref={ref}
        to={rest.to}
        {...rest}
        className={({ isActive }) =>
          isActive ? `${activeClassName} ${className}` : className
        }
      />
    );
  }
);

export default AppNavLink;
