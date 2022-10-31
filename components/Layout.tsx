import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { SSRProvider } from 'react-bootstrap';
// import Preloader from './Preloader'

export default function Layout({ children }: any) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {/* <Preloader show={loaded ? false : true} /> */}
            <SSRProvider>
                <Navbar />
                {children}
                <Footer />
            </SSRProvider>
        </>
    )
}