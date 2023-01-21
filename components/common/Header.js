import React, { Component } from 'react';
import { connect } from 'react-redux'
import { clearCustomer } from '../../store/actions/authenticateActions';
import Image from 'next/image';
import Link from 'next/link';
import Cart from '../cart/Cart';
import commerce from '../../lib/commerce';
import Animation from '../cart/CartIcon';
import Navigation from './Navigation';
import Portal from './atoms/Portal';
import ClientOnly from './atoms/ClientOnly';
import MobileNavigation from './MobileNavigation';
import Logo from '../../public/logo.png'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      playAddToCartAnimation: false,
      loggedIn: false,
      isScrolled: false,
    };

    this.header = React.createRef();

    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleAddToCartAnimation = this.toggleAddToCartAnimation.bind(this);
    this.handleAddToCartToggle = this.handleAddToCartToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);

    this.setState({
      loggedIn: commerce.customer.isLoggedIn(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);
  }

  toggleCart() {
    const { showCart } = this.state;
    this.setState({
      showCart: !showCart,
    });
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

  animate() {
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
          {this.renderCartButton()}
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

  renderCartButton() {
    const { cart } = this.props;

    return (
      <div
        className="relative flex flex-row-reverse cursor-pointer"
        onClick={this.toggleCart}
      >
        <Animation totalItems={cart.total_items} isStopped={this.state.playAddToCartAnimation} />
      </div>
    )
  }

  render() {
    const { showCart, isScrolled, loggedIn } = this.state;
    const { currentBreakpoint } = this.props;
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
        <div className='flex items-center justify-center py-6 container mx-auto'>
          <div className='w-1/3 hidden md:block'>
            <Navigation />
          </div>
          <div className='w-1/3 flex justify-center'>
            <Link passHref href="/" className={`
                text-6xl transition-all duration-700 ease-in-out font-extrabold uppercase text-primary
              `}>
                <Image src={Logo} width={350} height={247} alt="logo" />
            </Link>
          </div>
          <div className={`
            transition-all duration-700 ease-in-out 
            w-1/3 hidden md:inline-flex items-center justify-end
            gap-3
          `}>
            {typeof window !== 'undefined' && this.renderLoginLogout()}
            {!loggedIn && this.renderCartButton()}
          </div>
        </div>

        {/* {
          (typeof window !== 'undefined') &&
          <Portal nodeID='modals'>
            <MobileNavigation>
            </MobileNavigation>
          </Portal>
        } */}
      </header>
    )
  }
}

export default connect(
  (state) => ({
    currentBreakpoint: state.currentBreakpoint,
    cart: state.cart,
    loading: state.loading
  }),
  { clearCustomer },
)(Header);
