import SvgColor from "components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`${process.env.PUBLIC_URL}/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const data = {
  index: {
    title: "dashboard",
    path: "/",
    icon: icon("ic_analytics"),
    srcPath: "test",
  },
  "sample-user": {
    title: "사용자 관리 샘플",
    path: "/user/sample",
    icon: icon("ic_user"),
    srcPath: "sample-user",
  },
  products: {
    title: "product",
    path: "/products",
    icon: icon("ic_cart"),
    srcPath: "test",
  },
  blog: {
    title: "blog",
    path: "/blog",
    icon: icon("ic_blog"),
    srcPath: "test",
  },
  user: {
    title: "사용자 관리",
    path: "/user",
    icon: icon("ic_user"),
    srcPath: "user",
  },
};

export default data;
