export const getDiscountPrice = (price, discount = 0) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};
// get product cart quantity
export const getProductCartQty = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.id === product.id &&
      (single?.selectedProductColor ? single?.selectedProductColor === color : true) &&
      (single?.selectedProductSize ? single?.selectedProductSize === size : true),
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.id === product.id && single.selectedProductColor === color && single.selectedProductSize === size,
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter((product) => product.category.filter((single) => single === category)[0])
    : products;

  if (type && type === 'new') {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === 'bestSeller') {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === 'saleItems') {
    const saleItems = finalProducts.filter((single) => single.discount && single.discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === 'category') {
      return products.filter((product) => product?.Category?.name === sortValue);
    }
    if (sortType === 'tag') {
      return products.filter((product) => product?.tag.filter((single) => single === sortValue)[0]);
    }
    if (sortType === 'typePet') {
      return products.filter((product) => product?.type === sortValue);
    }
    if (sortType === 'color') {
      return products.filter(
        (product) => product?.variation && product?.variation.filter((single) => single.color === sortValue)[0],
      );
    }
    if (sortType === 'size') {
      return products.filter(
        (product) =>
          product?.variation &&
          product?.variation.filter((single) => single.size.filter((single) => single.name === sortValue)[0])[0],
      );
    }
    if (sortType === 'filterSort') {
      let sortProducts = [...products];
      if (sortValue === 'default') {
        return sortProducts;
      }
      if (sortValue === 'priceHighToLow') {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === 'priceLowToHigh') {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get unique element
const getUniqueElemArray = (array) => {
  let uniqueElemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return uniqueElemArray;
};
const getUniqueElemArrayCategory = (array) => {
  let uniqueElemArray = Array.from(new Set(array.map((item) => item?.id))).map((id) => {
    return array.find((item) => item?.id === id);
  });
  return uniqueElemArray;
};

// get unique categories
export const getUniqueCategories = (products) => {
  let productCategories = [];
  let productsTypes = [];
  products &&
    products.map((product) => {
      productCategories.push(product?.Category);
      productsTypes.push(product?.type);
    });

  const uniqueProductCategories = productCategories[0]
    ? getUniqueElemArrayCategory(productCategories)
    : getUniqueElemArray(productsTypes);
  return uniqueProductCategories;
};

// get unique tags
export const getUniqueTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const uniqueProductTags = getUniqueElemArray(productTags);
  return uniqueProductTags;
};

// get unique sizes
export const getProductsUniqueSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const uniqueProductSizes = getUniqueElemArray(productSizes);
  return uniqueProductSizes;
};

// get product unique sizes
export const getUniqueSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const uniqueProductSizes = getUniqueElemArray(productSizes);
  return uniqueProductSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    '.sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button',
  );
  filterButtons.forEach((elem) => {
    elem.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
};

//setlayout
export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll('.shop-tab button');
  gridSwitchBtn.forEach((elem) => {
    elem.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
};
