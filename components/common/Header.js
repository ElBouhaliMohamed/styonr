import React, { Component } from 'react';
import Link from 'next/link';
import Cart from '../cart/Cart';
import commerce from '../../lib/commerce';
import Animation from '../cart/Animation';
import { connect } from 'react-redux'
import { clearCustomer } from '../../store/actions/authenticateActions';
import { withRouter } from 'next/router'

const menuLinks = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Shop',
    link: '/collection'
  },
  {
    name: 'Vision',
    link: '/about'
  },
  {
    name: 'Produktion',
    link: '/about'
  },
  {
    name: 'Kontakt',
    link: '/about'
  }
];

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      playAddToCartAnimation: false,
      loggedIn: false,
      isScolled: true,
    };

    this.header = React.createRef();
    this.logoSection = React.createRef();

    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleAddToCartAnimation = this.toggleAddToCartAnimation.bind(this);
    this.handleAddToCartToggle = this.handleAddToCartToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
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
      this.header.current.classList.add('-translate-y-44');
    } else {
      this.setState({
        isScrolled: false
      })
      this.header.current.classList.remove('-translate-y-44');
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
    const { router } = this.props;
    return (
      <header
        ref={this.header}
        className={`
        fixed top-0 left-0 right-0 z-10 transition-all duration-700 ease-in-out
        ${!isScrolled ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'}
        `}
      >
        <Cart isOpen={showCart} toggle={value => this.toggleCart(value)} />
        <div ref={this.logoSection} className='
        transition-all duration-700 ease-in-out
        flex items-center justify-center py-6 px-4
        '>
          <div className='inline-flex items-center justify-end w-2/4'>
            <Link passHref href="/">
              <a className={`
                text-4xl sm:text-6xl lg:text-9xl
              `}>STYONR</a>
            </Link>
          </div>
          <div className='flex items-center justify-end w-2/4'>
            {process.browser && this.renderLoginLogout()}
          </div>
        </div>
        <div className='flex items-center py-6 px-4'>
          <div className='w-1/3'>
            <Link passHref href="/">
              <a className={`
                text-2xl transition-all duration-700 ease-in-out font-extrabold
                ${!isScrolled ? 'opacity-0' : 'opacity-100'}
              `}>STYONR</a>
            </Link>
          </div>
          <nav className="flex flex-row items-center justify-center space-y-1 w-1/3" aria-label="Sidebar">
            {menuLinks.map((value, index) => {
              return <Link
                passHref href={value.link} key={index}>
                <a
                  className={router.pathname == value.link
                    ? 'flex items-center px-3 py-2 text-md lg:text-lg font-medium rounded-md bg-gray-100 text-gray-900'
                    : 'flex items-center px-3 py-2 text-md lg:text-lg font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                >{value.name}</a>
              </Link>
            })}
          </nav>
          <div className={`
                transition-all duration-700 ease-in-out w-1/3 inline-flex justify-end
                ${!isScrolled ? 'opacity-0' : 'opacity-100'}
              `}>
            {process.browser && this.renderLoginLogout()}
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  state => state,
  { clearCustomer },
)(withRouter(Header));
