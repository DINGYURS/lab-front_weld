// 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
import { addIcon } from "@iconify/vue/dist/offline";

// 本地菜单图标，后端在路由的 icon 中返回对应的图标字符串并且前端在此处使用 addIcon 添加即可渲染菜单图标
// @iconify-icons/ep
import Lollipop from "@iconify-icons/ep/lollipop";
import HomeFilled from "@iconify-icons/ep/home-filled";
// @iconify-icons/ri
import Search from "@iconify-icons/ri/search-line";
import InformationLine from "@iconify-icons/ri/information-line";
import Operation from "@iconify-icons/ep/operation";
import DataLine from "@iconify-icons/ep/data-line";
import PieChart from "@iconify-icons/ep/pie-chart";
import Odometer from "@iconify-icons/ep/odometer";
import Stopwatch from "@iconify-icons/ep/stopwatch";
import PriceTag from "@iconify-icons/ep/price-tag";
import Setting from "@iconify-icons/ep/setting";
import SetUp from "@iconify-icons/ep/set-up";
import User from "@iconify-icons/ep/user";
import AlarmClock from "@iconify-icons/ep/alarm-clock";
import Calendar from "@iconify-icons/ep/calendar";
import Notebook from "@iconify-icons/ep/notebook";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import School from "@iconify-icons/ep/school";
import Files from "@iconify-icons/ep/files";
import CollectionTag from "@iconify-icons/ep/collection-tag";
import Watch from "@iconify-icons/ep/watch";
import List from "@iconify-icons/ep/list";
import NotificationLine from "@iconify-icons/ri/notification-line";
import AccountCircleLine from "@iconify-icons/ri/account-circle-line";
import GroupLine from "@iconify-icons/ri/group-line";
import ContactsLine from "@iconify-icons/ri/contacts-line";
import FilePaper2Line from "@iconify-icons/ri/file-paper-2-line";
import InstanceLine from "@iconify-icons/ri/instance-line";
import PhoneLine from "@iconify-icons/ri/phone-line";
import Book2Line from "@iconify-icons/ri/book-2-line";
import LineChartLine from "@iconify-icons/ri/line-chart-line";
import ZoomIn from "@iconify-icons/ep/zoom-in";
import Tickets from "@iconify-icons/ep/tickets";

addIcon("ep:lollipop", Lollipop);
addIcon("ep:home-filled", HomeFilled);

addIcon("ri:search-line", Search);
addIcon("ri:information-line", InformationLine);

addIcon("operation", Operation);
addIcon("dataLine", DataLine);
addIcon("pieChart", PieChart);
addIcon("odometer", Odometer);
addIcon("stopwatch", Stopwatch);
addIcon("priceTag", PriceTag);
addIcon("setting", Setting);
addIcon("setUp", SetUp);
addIcon("user", User);
addIcon("alarmClock", AlarmClock);
addIcon("calendar", Calendar);
addIcon("notebook", Notebook);
addIcon("officeBuilding", OfficeBuilding);
addIcon("school", School);
addIcon("files", Files);
addIcon("collectionTag", CollectionTag);
addIcon("watch", Watch);
addIcon("list", List);
addIcon("notificationLine", NotificationLine);
addIcon("accountCircleLine", AccountCircleLine);
addIcon("groupLine", GroupLine);
addIcon("contactsLine", ContactsLine);
addIcon("filePaper2Line", FilePaper2Line);
addIcon("instanceLine", InstanceLine);
addIcon("phoneLine", PhoneLine);
addIcon("book2Line", Book2Line);
addIcon("lineChartLine", LineChartLine);
addIcon("zoomIn", ZoomIn);
addIcon("tickets", Tickets);
