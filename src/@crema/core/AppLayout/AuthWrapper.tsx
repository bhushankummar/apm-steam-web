import React from 'react';
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
  StyledMainAuthScrollbar,
} from './AuthWrapper.styled';
import AppLogo from '@crema/components/AppLayout/components/AppLogo';
import AppAnimateGroup from '@crema/components/AppAnimateGroup';
import AppInfoView from '@crema/components/AppInfoView';

type Props = {
  children: React.ReactNode;
};
const AuthWrapper: React.FC<Props> = ({children}) => {
  return (
    <StyledAuth>
      <StyledMainAuthScrollbar>
        <AppAnimateGroup
          type='scale'
          animateStyle={{flex: 1}}
          delay={0}
          style={{height: '100%'}}
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
                  APM Steam App is an intuitive and efficient tool designed to streamline the management of administrative tasks for APM Steam platforms
                  </p>
                </StyledAuthWelContent>
              </StyledAuthWellAction>
            </StyledAuthCard>
          </StyledAuthWrap>
          <AppInfoView />
        </AppAnimateGroup>
      </StyledMainAuthScrollbar>
    </StyledAuth>
  );
};

export default AuthWrapper;
