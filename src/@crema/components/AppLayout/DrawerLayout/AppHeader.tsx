import { Dropdown } from "antd";
import AppLogo from "../components/AppLogo";
import { useIntl } from "react-intl";
import AppLanguageSwitcher from "../../AppLanguageSwitcher";
import AppHeaderMessages from "../../AppHeaderMessages";
import AppNotifications from "../../AppNotifications";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import {
  StyledDrawerLayoutHeader,
  StyledDrawerLayoutHeaderDesk,
  StyledDrawerLayoutHeaderMobile,
  StyledDrawerLayoutHeaderSearch,
} from "./index.styled";
import { StyledDropdownWrapper } from "../index.styled";
import { allowMultiLanguage } from "../../../constants/AppConst";

const items = [
  {key: 1, label: <AppHeaderMessages />},
  {key: 2, label: <AppNotifications />},
  {key: 3, label: <AppLanguageSwitcher />},
];

type AppHeaderProps = {
  showDrawer: () => void;
};

const AppHeader = ({showDrawer}: AppHeaderProps) => {
  const {messages} = useIntl();

  return (
    <StyledDrawerLayoutHeader>
      <a className='trigger' onClick={showDrawer}>
        <AiOutlineMenu />
      </a>
      {/* <AppLogo /> */}
      <StyledDrawerLayoutHeaderSearch
        placeholder={messages['common.searchHere'] as string}
      />
      <StyledDrawerLayoutHeaderDesk>
        {allowMultiLanguage && <AppLanguageSwitcher />}
        <AppHeaderMessages />
        <AppNotifications />
      </StyledDrawerLayoutHeaderDesk>
      <StyledDrawerLayoutHeaderMobile>
        <StyledDropdownWrapper>
          <Dropdown
            menu={{items}}
            overlayClassName='dropdown-wrapper'
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}
          >
            <a
              className='ant-dropdown-link-mobile'
              onClick={(e) => e.preventDefault()}
            >
              <FiMoreVertical />
            </a>
          </Dropdown>
        </StyledDropdownWrapper>
      </StyledDrawerLayoutHeaderMobile>
    </StyledDrawerLayoutHeader>
  );
};

export default AppHeader;
