import React from 'react';
import Link from 'next/link';

/**
 * Renders a list of categories and the number of products in each category. Used for product list
 * view sidebars.
 */
function CategoryList ({ categories, current, className }) {
  return (
    <div className={className}>
      <h3 className="font-size-title font-weight-medium mb-3">Kategorien</h3>
      <ul style={{ 'listStyleType': 'none' }} className="pl-0">
        {categories.map(category => (
          <li key={category.slug}>
            <Link href={`/products/all#${category.slug}`}
              style={{ 'fontWeight': current === category.id && 'bold' }}
              key={category.id} className="pb-2 cursor-pointer font-color-black"
            >
              {category.name}<sup>{category.products}</sup>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList;