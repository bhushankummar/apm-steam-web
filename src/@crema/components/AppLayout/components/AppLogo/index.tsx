import React from 'react';
import {useSidebarContext} from '@crema/context/AppContextProvider/SidebarContextProvider';
import {StyledAppLogo} from './index.styled';
import companyLogo from "../../../../../assets/images/apmLogo.png"; // Replace with your actual path to the logo

type AppLogoProps = {
  hasSidebarColor?: boolean;
};
const AppLogo: React.FC<AppLogoProps> = ({hasSidebarColor}) => {
  const {sidebarColorSet} = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <img src={companyLogo} alt='crema-logo' />
      ) : (
        <img src={companyLogo} alt='crema-logo' />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;
