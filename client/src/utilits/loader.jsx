// // components/Loader.js
// const Loader = () => {
//     return (
//       <div className="loader">
//         <p>Loading...</p>
//         {/* You can also use a spinner or any other animation */}
//       </div>
//     );
//   };
  
//   export default Loader;
  
// components/Loader.js
import { useLoading } from './LoadingProvider';

const Loader = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null; // Don't show loader if not loading

  return (
    <div className="loader">
      <p>Loading...</p>
      {/* Your loading spinner or animation can go here */}
    </div>
  );
};

export default Loader;
