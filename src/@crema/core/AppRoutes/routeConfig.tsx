import { Color } from "antd/es/color-picker";
import { FaTools } from "react-icons/fa";

const routesConfig = [
  {
    id: "dashboards",
    title: "Admin Application",
    messageId: "sidebar.application",
    type: "group",
    children: [
      {
        id: "agent-listing",
        title: "Agent",
        icon: <FaTools />,
        messageId: "sidebar.Admin.agent",
        url: "/apps/admin/technician-listing",
      },
      {
        id: "logout",
        title: "Logout",
        messageId: "sidebar.Admin.logout",
        url: "/apps/logout",
      },
      // {
      //         id: "Logs",
      //         title: "Logs Details",
      //         messageId: "sidebar.pages.user.userLogs",
      //         icon: <RiShieldUserLine />,
      //         url: "user",
      //         type: "collapse",
      //         children: [
      //           {
      //             id: "logs",
      //             title: "logs",
      //             messageId: "sidebar.pages.user.logs",
      //             url: "/apps/admin/error/logs",
      //           },
      //           {
      //             id: "errorLogs",
      //             title: "errorLogs",
      //             messageId: "sidebar.pages.user.errorLogs",
      //             url: "/apps/admin/logs",
      //           },
    
      //         ],
      //       },
    ],
  },

];
export default routesConfig;
