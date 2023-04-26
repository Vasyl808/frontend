import Header from '../Header/Header';
import Routers from '../../routers/Routers';
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../UI/ScrollToTopButton'

const Layout = () => {
    return (
        <>
            <Header/>
            <div>
                <Routers/>
                <ScrollToTopButton/>
            </div>
            <Footer/>
        </>
    )
}

export default Layout