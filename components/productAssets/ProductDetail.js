import React, { Component } from 'react';
import ReviewStars from './ReviewStars';
import VariantSelector from '../productAssets/VariantSelector';
import { animateScroll as scroll } from 'react-scroll';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';

class ProductDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOptions: [],
      voluntaryPrice: 0
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
  }

  componentDidMount() {
    this.setSelectedOptions();
    this.setVoluntaryPrice();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.product || prevProps.product.id !== this.props.product.id) {
      // Product was changed, reset selected variant group options
      this.setSelectedOptions();
      this.setVoluntaryPrice();
    }
  }

  /**
   * Update price with minimum base pricing
   */
  setVoluntaryPrice(price) {
    this.setState((_, props) => ({
      voluntaryPrice: Math.max(props.product.price.raw, price || 0)
    }))
  }

  /**
   * Work out which options should be selected by which variant groups
   */
  setSelectedOptions() {
    this.setState((_, props) => ({
      selectedOptions: {
        // Assign the first option as the selected value for each variant
        ...props.product.variant_groups.reduce((acc, variantGroup) => ({
          ...acc,
          [variantGroup.id]: variantGroup.options[0].id,
        }), {}),
      },
    }));
  }

  /**
   * Handle click to scroll to review section
   */
  handleReviewClick() {
    const section = document.querySelector('#reviews');

    if (section) {
      scroll.scrollTo(section.offsetTop - 130, {
        smooth: 'easeInOutQuint'
      });
    }
  }

  /**
   * On selecting variant
   */
  handleSelectOption(variantGroupId, optionId) {
    this.setState({
      selectedOptions: {
        ...this.state.selectedOptions,
        [variantGroupId]: optionId,
      },
    });
  }

  /**
   * Get price of selected option
   */
  getPrice() {
    const {
      price: { raw: base },
      variant_groups: variantGroups,
      conditionals: { is_pay_what_you_want }
    } = this.props.product;
    const { selectedOptions, voluntaryPrice } = this.state;

    if ((!selectedOptions || typeof selectedOptions !== 'object') && !is_pay_what_you_want) {
      return base;
    }

    if (is_pay_what_you_want) {
      console.log('Returning voluntaryPrice', voluntaryPrice);
      return voluntaryPrice;
    }

    const options = Object.entries(selectedOptions);
    return base + options.reduce((acc, [variantGroup, option]) => {
      const variantDetail = variantGroups.find(candidate => candidate.id === variantGroup);
      if (!variantDetail) {
        return acc;
      }
      const optionDetail = variantDetail.options.find(candidate => candidate.id === option);
      if (!optionDetail) {
        return acc;
      }

      return acc + optionDetail.price.raw;
    }, 0);
  }

  /**
   * Get symbol of formatted price
   */
  getCurrencySymbol(priceFormattedWithSymbol) {
    return priceFormattedWithSymbol.substring(1, 0);
  }

  /**
   * Add to Cart
   */
  handleAddToCart() {
    const { product } = this.props
    const { selectedOptions } = this.state;
    this.props.dispatch(addToCart(product.id, 1, selectedOptions))
  }

  render() {
    const {
      name,
      description,
      price,
      variant_groups: variantGroups,
      conditionals: { is_pay_what_you_want }
    } = this.props.product;
    const soldOut = this.props.product.is.sold_out;
    const priceSymbol = this.getCurrencySymbol(price.formatted_with_symbol);
    const { selectedOptions, voluntaryPrice } = this.state;
    const reg = /(<([^>]+)>)/ig;

    return (
      <div>
        {/* Product Summary */}
        <div onClick={this.handleReviewClick} className="cursor-pointer">
          <ReviewStars count={4.5} />
        </div>
        <p className="text-sm font-family-secondary mt-2 mb-2">
          {name}
        </p>
        <div className="mb-4 pb-3 font-size-subheader">{(description || '').replace(reg, '')}</div>

        {/* Product Variant */}
        <div className="d-sm-block">
          <VariantSelector
            className="mb-3"
            variantGroups={variantGroups}
            onSelectOption={this.handleSelectOption}
            selectedOptions={selectedOptions}
          />
        </div>

        { is_pay_what_you_want &&
        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
          Pay What You Want
        </label>}
        <div className='flex items-center py-4 gap-2'>
          {/* Pay What You Want */}
          { is_pay_what_you_want &&
           <div className='block w-1/2'>
            <div className="relative rounded-md shadow-sm group">
              <input
                type="number"
                name="price"
                id="price"
                className="
                block w-full h-56 border-gray-300 pl-3 pr-4
                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                disabled:cursor-not-allowed disabled:text-gray-500
                "
                placeholder={price.raw}
                value={voluntaryPrice}
                onChange={(e) => this.setVoluntaryPrice(e.target.value)}
                disabled={soldOut}
                aria-describedby="price-currency"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 hover:pr-10">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  EURO
                </span>
              </div>
            </div>
          </div>}

          {/* Add to Cart & Price */}
          <div className={`flex ${ is_pay_what_you_want ? 'w-1/2' : 'w-full' }`}>
            <button onClick={this.handleAddToCart} disabled={soldOut}
              className="h-48 bg-black text-white pl-3 pr-4 flex items-center flex-grow-1" type="button">
              <span className="flex-grow-1 mr-3 text-center">
                {soldOut ? 'Sold out' : 'Add to cart'}
              </span>
              <span className="border-left border-white pl-3">
                {priceSymbol}{this.getPrice()}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(ProductDetail);
