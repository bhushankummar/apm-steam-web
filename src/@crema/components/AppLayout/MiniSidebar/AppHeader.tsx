import { Dropdown } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import AppLogo from "../components/AppLogo";
import { useIntl } from "react-intl";
import AppLanguageSwitcher from "../../AppLanguageSwitcher";
import AppHeaderMessages from "../../AppHeaderMessages";
import AppNotifications from "../../AppNotifications";
import {
  StyledAppHeaderMini,
  StyledAppHeaderMiniSecDesktop,
  StyledAppHeaderMiniSecMobile,
  StyledHeaderSearchMini,
} from "./index.styled";
import { StyledDropdownWrapper } from "../index.styled";
import { allowMultiLanguage } from "../../../constants/AppConst";

const items = [
  {key: 1, label: <AppHeaderMessages />},
  {key: 2, label: <AppNotifications />},
  {key: 3, label: <AppLanguageSwitcher />},
];

const AppHeader = () => {
  const {messages} = useIntl();

  return (
    <StyledAppHeaderMini className='app-header-mini'>
      {/* <AppLogo /> */}

      <StyledHeaderSearchMini
        placeholder={messages['common.searchHere'] as string}
      />
      <StyledAppHeaderMiniSecDesktop>
        {allowMultiLanguage && <AppLanguageSwitcher />}
        <AppHeaderMessages />
        <AppNotifications />
      </StyledAppHeaderMiniSecDesktop>
      <StyledAppHeaderMiniSecMobile>
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
      </StyledAppHeaderMiniSecMobile>
    </StyledAppHeaderMini>
  );
};

export default AppHeader;
