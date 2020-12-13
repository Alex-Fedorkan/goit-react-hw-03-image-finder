import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const CustomLoader = () => {
  return (
    <Loader
      type="Hearts"
      color="#00BFFF"
      height={80}
      width={80}
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    />
  );
};

export default CustomLoader;
