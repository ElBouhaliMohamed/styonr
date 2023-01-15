import React, { Component } from 'react';
import { connect } from 'react-redux'
import { clearCustomer } from '../../store/actions/authenticateActions';
import Link from 'next/link';
import Cart from '../cart/Cart';
import commerce from '../../lib/commerce';
import Animation from '../cart/Animation';
import Navigation from './Navigation';
import Portal from './atoms/Portal';
import ClientOnly from './atoms/ClientOnly';
import MobileNavigation from './MobileNavigation';
import { SHOPE_NAME } from '../../utils/constants'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      playAddToCartAnimation: false,
      loggedIn: false,
      isScrolled: false,
      showMobileMenu: false,
    };

    this.header = React.createRef();

    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleMobileMenu = this.handleMobileMenu.bind(this);
    this.activateMobileMenu = this.activateMobileMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleAddToCartAnimation = this.toggleAddToCartAnimation.bind(this);
    this.handleAddToCartToggle = this.handleAddToCartToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    this.activateMobileMenu();
    window.addEventListener('resize', this.handleMobileMenu);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);

    this.setState({
      loggedIn: commerce.customer.isLoggedIn(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleMobileMenu);
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
      showMobileMenu: !state.showMobileMenu,
    }));
  }

  handleScroll() {
    window.requestAnimationFrame(this.animate);
  }

  handleMobileMenu() {
    window.requestAnimationFrame(this.activateMobileMenu);
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
    if (isMobile) {
      this.header.current?.classList.add('mobile-header');
    } else {
      this.header.current?.classList.remove('mobile-header');
      this.setState(_ => ({
        showMobileMenu: false,
      }));
    }
  }

  animate() {
    const { currentBreakpoint } = this.props;
    const isMobile = currentBreakpoint === 'sm'

    this.activateMobileMenu();

    if (isMobile) {
      return;
    }

    if (window.scrollY > 10) {
      this.setState({
        isScrolled: true
      })
      this.header.current?.classList.add('animate-header');
    } else {
      this.setState({
        isScrolled: false
      })
      this.header.current?.classList.remove('animate-header');
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
            <img alt='Account' src="/icon/user.svg" className='w-32' />
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
      <Link className="text-black font-semibold text-md" href="/login">
        Login
      </Link>
    );
  }

  render() {
    const { showCart, isScrolled, showMobileMenu, loggedIn } = this.state;
    const { currentBreakpoint, cart } = this.props;
    const isScrolledAndAllowed = currentBreakpoint === 'sm' || isScrolled;
    return (
      <header
        ref={this.header}
        className={`
        fixed top-0 left-0 right-0 z-10 transition-all duration-700 ease-in-out
        ${!isScrolledAndAllowed ? 'bg-white/20' : 'bg-white/80 backdrop-blur-md border-b border-slate-100'}
        `}
      >
        <ClientOnly>
          <Portal nodeID='modals'>
            <Cart isOpen={showCart} toggle={value => this.toggleCart(value)} />
          </Portal>
        </ClientOnly>
        <div className='
        transition-all duration-700 ease-in-out
        flex items-center justify-center py-6 px-4
        '>
          <div className='inline-flex items-center justify-center'>
            <Link className={`
                text-4xl sm:text-6xl lg:text-9xl font-bold uppercase text-primary
              `} passHref href="/">
              {SHOPE_NAME}
            </Link>
          </div>
        </div>
        <div className='flex items-center py-6 px-4'>
          {
            isScrolledAndAllowed &&
            <button onClick={this.toggleMobileMenu} className='sm:hidden bg-transparent'>
              <img src="/icon/menu.svg" className='w-10' />
            </button>
          }
          <div className='w-1/3'>
            <Link passHref href="/" className={`
                text-2xl transition-all duration-700 ease-in-out font-extrabold uppercase text-primary
                ${!isScrolledAndAllowed ? 'opacity-0' : 'opacity-100'}
              `}>{SHOPE_NAME}
            </Link>
          </div>
          <Navigation className='hidden md:block' />
          <div className={`
            transition-all duration-700 ease-in-out 
            w-full md:w-1/3 inline-flex items-center justify-end
            gap-3
          `}>
            {typeof window !== 'undefined' && this.renderLoginLogout()}
            {!loggedIn && <div
              className="relative flex flex-row-reverse cursor-pointer"
              onClick={this.toggleCart}
            >
              <Animation isStopped={this.state.playAddToCartAnimation} />
              <div className="absolute text-xs font-bold">
                {cart.total_items}
              </div>
            </div>}
          </div>
        </div>

        {
          (typeof window !== 'undefined' && showMobileMenu) &&
          <Portal nodeID='modals'>
            <MobileNavigation toggleMobileMenu={this.toggleMobileMenu} />
          </Portal>
        }
      </header>
    )
  }
}

export default connect(
  (state) => ({
    currentBreakpoint: state.currentBreakpoint,
    cart: state.cart
  }),
  { clearCustomer },
)(Header);
