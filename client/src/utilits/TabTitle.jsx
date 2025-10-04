import { Helmet } from "react-helmet";

const TabTitle = ({ title }) => {
  return (
    <Helmet>
      <title>JS Builders  - {title}</title>
    </Helmet>
  );
};

export default TabTitle;
