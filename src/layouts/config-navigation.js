import SvgColor from "components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "사용자 관리",
    path: "/user",
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/products",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
  {
    title: "test",
    path: "/test",
    icon: icon("ic_user"),
  },
];

export default navConfig;
