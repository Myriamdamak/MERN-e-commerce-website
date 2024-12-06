import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,  // Correct prop validation
};

export default Layout;
