import { Link } from 'react-router-dom'
import '../index.css'
import Logo from '../assets/logo.png'

function NavBar() {


    return <header>
        <nav className='flex justify-between items-center navbar h-16 px-4'>
            <div><img src={Logo} alt='Logo' className='h-25' /></div>
            <div className='flex justify-self-end space-x-7'>
                <Link to="/"><h2 className='text-black'>Home</h2></Link>
                <Link to="/favorites">
                    <h2 className='text-black'>Favorites</h2>
                </Link>
            </div>
        </nav>
    </header>
}

export default NavBar