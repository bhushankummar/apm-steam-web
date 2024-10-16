import React from 'react';
import AppAnimateGroup from '@crema/components/AppAnimateGroup';
import AppInfoView from '@crema/components/AppInfoView';
import {
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
} from './AuthWrapper.styled';
import AppLogo from '@crema/components/AppLayout/components/AppLogo';

type Props = {
  children: React.ReactNode;
};
const AuthWrapper: React.FC<Props> = ({children}) => {
  return (
    <AppAnimateGroup
      type='scale'
      animateStyle={{flex: 1}}
      delay={0}
      interval={10}
      duration={200}
    >
      <StyledAuthWrap key={'wrap'}>
        <StyledAuthCard>
          <StyledAuthMainContent>
            <StyledAuthCardHeader>
              {/* <AppLogo /> */}
            </StyledAuthCardHeader>
            {children}
          </StyledAuthMainContent>
          <StyledAuthWellAction>
            <StyledAuthWelContent>
              <h2>Welcome to APM Steam!</h2>
              <p>
              APM (Admin Panel Management) Steam App is an intuitive and efficient tool designed to streamline the management of administrative tasks for APM Steam platforms
              </p>
            </StyledAuthWelContent>
          </StyledAuthWellAction>
        </StyledAuthCard>
      </StyledAuthWrap>
      <AppInfoView />
    </AppAnimateGroup>
  );
};
export default AuthWrapper;
