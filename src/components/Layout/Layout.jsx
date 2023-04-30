import Header from '../Header/Header';
import Routers from '../../routers/Routers';
import Footer from '../Footer/Footer';
import ScrollToTopButton from './ScrollToTopButton'
import Notification from './Notification';
const Layout = () => {
    return (
        <>
            <Header/>
            <div>
                <Routers/>
                <Notification/>
                <ScrollToTopButton/>
            </div>
            <Footer/>
        </>
    )
}

export default Layout