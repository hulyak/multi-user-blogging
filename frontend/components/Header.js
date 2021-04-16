import { useState } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

const Header = (props) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>Sign In</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {/* {JSON.stringify(isAuth())} */}
            {isAuth() && (
              <NavItem>
                <NavLink
                  onClick={() => signout(() => router.replace(`/signin`))}
                  style={{ cursor: 'pointer' }}
                >
                  Sign out
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
