import { Avatar } from "antd";
import IntlMessages from "@crema/helpers/IntlMessages";

import {
  StyledFooterAction,
  StyledUserFooterHireBtn,
  StyledUserFooterRemoveBtn,
  StyledUserStandardCard,
  StyledUserStandardCardAvatar,
  StyledUserStandardCardHeader,
  StyledUserStandardChip,
  StyledUserStandardContent,
  StyledUserStandardFooter,
  StyledUserStandardInner,
  StyledUserStandardPara,
} from "./index.styled";
import { UserList } from "@crema/types/models/Apps";

const ListItem = ({ user }: { user: UserList }) => {
  return (
    <StyledUserStandardCard className="item-hover">
      <StyledUserStandardInner>
        <StyledUserStandardCardHeader>
          <StyledUserStandardCardAvatar>
            <Avatar src={user.image} />
          </StyledUserStandardCardAvatar>
          <h3 className="text-truncate">{user.name}</h3>
          <StyledUserStandardChip>{`@${user.charge}/Hour`}</StyledUserStandardChip>
        </StyledUserStandardCardHeader>

        <StyledUserStandardContent>
          {/* <StyledUserStandardContentHeader>
            <StyledUserStandardContentHeaderContact>
              <StyledUserStandardContactItem>
                <MailOutlined />
                <span>{user.email}</span>
              </StyledUserStandardContactItem>

              <StyledUserStandardContactItem>
                <GlobalOutlined />
                <span>{user.website}</span>
              </StyledUserStandardContactItem>

              <StyledUserStandardContactItem>
                <PhoneOutlined />
                <span>{user.phone}</span>
              </StyledUserStandardContactItem>
            </StyledUserStandardContentHeaderContact>

            <StyledUserStandardHeaderSocial>
              <StyledUserStandardHeaderSocialItem>
                <FaFacebookF className="pointer" />
              </StyledUserStandardHeaderSocialItem>
              <StyledUserStandardHeaderSocialItem>
                <LinkedinOutlined className="pointer" />
              </StyledUserStandardHeaderSocialItem>
              <StyledUserStandardHeaderSocialItem>
                <InstagramOutlined className="pointer" />
              </StyledUserStandardHeaderSocialItem>
              <StyledUserStandardHeaderSocialItem>
                <TwitterOutlined className="pointer" />
              </StyledUserStandardHeaderSocialItem>
            </StyledUserStandardHeaderSocial>
          </StyledUserStandardContentHeader> */}

          <StyledUserStandardPara>{user.information}</StyledUserStandardPara>

          <StyledUserStandardFooter>
            <div className="user-standard-footer-chip-view">
              {user.skills.map((skill, index) => {
                return (
                  <span
                    key={index}
                    // className={clsx('user-morden-footer-chip', {dark :  theme.palette.type === 'dark'})}
                    className="user-standard-footer-chip"
                  >
                    {skill}
                  </span>
                );
              })}
            </div>

            <StyledFooterAction>
              <StyledUserFooterHireBtn type="primary">
                <IntlMessages id="common.hire" />
              </StyledUserFooterHireBtn>
              <StyledUserFooterRemoveBtn>
                <IntlMessages id="mailApp.remove" />
              </StyledUserFooterRemoveBtn>
            </StyledFooterAction>
          </StyledUserStandardFooter>
        </StyledUserStandardContent>
      </StyledUserStandardInner>
    </StyledUserStandardCard>
  );
};

export default ListItem;
