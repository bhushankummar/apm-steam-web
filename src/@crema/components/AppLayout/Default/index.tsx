import React, {useEffect, useState} from 'react';
import {Grid} from 'antd';
import AppSidebar from './AppSidebar';
import AppContentView from '../../AppContentView';
import AppFooter from '../components/AppFooter';
import clsx from 'clsx';
import {FooterType} from '@crema/constants/AppEnums';
import {useLayoutContext} from '@crema/context/AppContextProvider/LayoutContextProvider';
import {
  StyledAppLayout,
  StyledAppLayoutMain,
  StyledMainScrollbar,
} from './index.styled';
import {RouterConfigData} from '@crema/types/models/Apps';
import {isEmpty} from '@crema/helpers/Common';

const {useBreakpoint} = Grid;

type Props = {
  routes: React.ReactElement | null;
  routesConfig: RouterConfigData[];
};
const DefaultLayout: React.FC<Props> = ({routes, routesConfig}) => {
  const width = useBreakpoint();
  const [isCollapsed, setCollapsed] = useState(false);
  const {footer, footerType} = useLayoutContext();

  // const onToggleSidebar = () => {
  //   setCollapsed(!isCollapsed);
  // };

  useEffect(() => {
    if (!isEmpty(width)) {
      if (width.xl) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [width]);

  return (
    <StyledAppLayout
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar isCollapsed={isCollapsed} routesConfig={routesConfig} />
      <StyledAppLayoutMain className='app-layout-main'>
        <StyledMainScrollbar>
          <AppContentView routes={routes} />
          <AppFooter />
        </StyledMainScrollbar>
      </StyledAppLayoutMain>
    </StyledAppLayout>
  );
};

export default React.memo(DefaultLayout);
