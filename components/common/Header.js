import React, { Component } from 'react';
import Link from 'next/link';
import Cart from '../cart/Cart';
import commerce from '../../lib/commerce';
import Animation from '../cart/Animation';
import { connect } from 'react-redux'
import { clearCustomer } from '../../store/actions/authenticateActions';
import Navigation from './Navigation';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      playAddToCartAnimation: false,
      loggedIn: false,
      isScrolled: false,
      showMobile: false,
    };

    this.header = React.createRef();
    this.logoSection = React.createRef();

    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.activateMobileMenu = this.activateMobileMenu.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleAddToCartAnimation = this.toggleAddToCartAnimation.bind(this);
    this.handleAddToCartToggle = this.handleAddToCartToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    this.activateMobileMenu();
    window.addEventListener('resize', this.activateMobileMenu);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);

    this.setState({
      loggedIn: commerce.customer.isLoggedIn(),
    });
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.activateMobileMenu);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);
  }

  toggleCart() {
    const { showCart } = this.state;
    this.setState({
      showCart: !showCart,
    });
  }

  toggleMobileMenu() {
    this.setState(state => ({
      showCart: !state.showMobile,
    }));
  }

  handleScroll() {
    window.requestAnimationFrame(this.animate);
  }

  handleLogout() {
    this.props.clearCustomer();
    this.setState({
      loggedIn: false,
    });
  }

  activateMobileMenu() {
    const { currentBreakpoint } = this.props;
    const isMobile = currentBreakpoint === 'sm'
    console.log('Is Mobile')
    if(isMobile) {
      this.header.current.classList.add('mobile-header');
    } else {
      this.header.current.classList.remove('mobile-header');
    }
  }

  animate() {
    const { currentBreakpoint } = this.props;
    const isMobile = currentBreakpoint === 'sm'

    if(isMobile) {
      return;
    }

    if (window.scrollY > 10) {
      this.setState({
        isScrolled: true
      })
      this.header.current.classList.add('animate-header');
    } else {
      this.setState({
        isScrolled: false
      })
      this.header.current.classList.remove('animate-header');
    }
  }

  /**
   * Toggle add to cart animation to true
   */
  toggleAddToCartAnimation() {
    const { playAddToCartAnimation } = this.state;

    this.setState({ playAddToCartAnimation: !playAddToCartAnimation });
  }

  /**
   * Call toggle of add to cart animation and set time out to false
   */
  handleAddToCartToggle() {
    this.toggleAddToCartAnimation();
    setTimeout(() => {
      this.toggleAddToCartAnimation();
    }, 3000)
  }

  renderLoginLogout() {
    const { customer, cart } = this.props;
    const { loggedIn } = this.state;

    if (loggedIn) {
      return (
        <div className="flex items-center gap-3">
          <div
            className="relative cursor-pointer"
            onClick={this.toggleCart}
          >
            <div className="absolute text-xs -translate-x-1 font-bold">
              {cart.total_items}
            </div>
            <Animation isStopped={this.state.playAddToCartAnimation} />
          </div>
          {customer && customer.firstname && (
            <span className="font-extralight">
            </span>
          )}
          <Link passHref href="/account">
            <a>
              <img alt='Account' src="/icon/user.svg" className='w-32' />
            </a>
          </Link>
          <button
            type="button"
            onClick={this.handleLogout}
          >
            <img alt='Logout' src="/icon/logout.svg" className='w-32' />
          </button>
        </div>
      );
    }

    return (
      <Link href="/login">
        <a className="font-color-black login">
          Login
        </a>
      </Link>
    );
  }

  render() {
    const { showCart, isScrolled } = this.state;
    const { currentBreakpoint } = this.props;
    const isScrolledAndAllowed = currentBreakpoint === 'sm' || isScrolled

    return (
      <header
        ref={this.header}
        className={`
        fixed top-0 left-0 right-0 z-10 transition-all duration-700 ease-in-out
        ${!isScrolledAndAllowed ? 'bg-white/20' : 'bg-white/80 backdrop-blur-md border-b border-slate-100'}
        `}
      > 
        <Cart isOpen={showCart} toggle={value => this.toggleCart(value)} />
        <div ref={this.logoSection} className='
        transition-all duration-700 ease-in-out
        flex items-center justify-center py-6 px-4
        '>
          <div className='inline-flex items-center justify-center'>
            <Link passHref href="/">
              <a className={`
                text-4xl sm:text-6xl lg:text-9xl uppercase
              `}>styonr</a>
            </Link>
          </div>
        </div>
        <div className='flex items-center py-6 px-4'>
          { isScrolledAndAllowed &&
          <button className='sm:hidden bg-transparent'>
            <img src="/icon/menu.svg" className='w-10' />
          </button>
          }
          <div className='w-1/3'>
            <Link passHref href="/">
              <a className={`
                text-2xl transition-all duration-700 ease-in-out font-extrabold
                ${!isScrolledAndAllowed ? 'opacity-0' : 'opacity-100'}
              `}>STYONR</a>
            </Link>
          </div>
          <Navigation className='hidden md:block' />
          <div className={`
                transition-all duration-700 ease-in-out w-full md:w-1/3 inline-flex justify-end
              `}>
            {process.browser && this.renderLoginLogout()}
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  (state) => ({
    currentBreakpoint: state.currentBreakpoint
  }),
  { clearCustomer },
)(Header);
