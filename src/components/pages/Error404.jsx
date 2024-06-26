import error from '../../assets/error404.png'
import { Link } from 'react-router-dom';
const Error404 = () => {
    return (
        <section className='mainSection text-center'>
            <img src = {error} className='img-error' alt="error 404"/>
            <div>
                <Link className='btn btn-primary mb-5 'to="/">Volver al menú</Link>
            </div>
        </section>
    );
};

export default Error404;