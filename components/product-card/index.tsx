import React from 'react';
import { getProperCurrencyMode } from './utils';
import homeStyles from '../../styles/Home.module.css';
import styles from './ProductCard.module.css';

export type ProductCardProps = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  productName: string;
  price: number;
  handler: (id: string) => void;
  likes: number;
  oldPrice?: number;
};

export default function ProductCard(props: ProductCardProps) {
  const {
    id,
    imgSrc,
    imgAlt,
    productName,
    price,
    handler,
    likes,
    oldPrice = null,
  } = props;

  const buyBtnClickHandler = (evt: React.KeyboardEvent | React.MouseEvent) => {
    evt.preventDefault();
    console.log('Товар в корзине');
    handler(id);
  };

  return (
    <article className={styles.productCard} aria-label='Карточка товара'>
      <div className={styles.imgWrapper}>
        <img
          className={styles.productCardImg}
          src={imgSrc}
          alt={imgAlt || 'Изображение товара'}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.productCardLikes}>
          <p>
            {likes} <span className={homeStyles.visuallyHidden}>лайков</span>
          </p>
          <svg
            role='presentation'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            version='1.1'
            id={`Capa_${id}`}
            x='0px'
            y='0px'
            width='40px'
            height='40px'
            viewBox='0 0 45.743 45.743'
            xmlSpace='preserve'
          >
            <g>
              <path d='M34.199,3.83c-3.944,0-7.428,1.98-9.51,4.997c0,0-0.703,1.052-1.818,1.052c-1.114,0-1.817-1.052-1.817-1.052   c-2.083-3.017-5.565-4.997-9.51-4.997C5.168,3.83,0,8.998,0,15.376c0,1.506,0.296,2.939,0.82,4.258   c3.234,10.042,17.698,21.848,22.051,22.279c4.354-0.431,18.816-12.237,22.052-22.279c0.524-1.318,0.82-2.752,0.82-4.258   C45.743,8.998,40.575,3.83,34.199,3.83z' />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        <h3 className={styles.title}>{productName}</h3>
        <div className={styles.price}>
          <p
            style={{
              color: oldPrice ? '#FF0000' : '#000000',
            }}
          >
            <span className={homeStyles.visuallyHidden}>Цена</span>
            {`${price} `}&#8381;
            <span className={homeStyles.visuallyHidden}>
              {getProperCurrencyMode(price)}
            </span>
          </p>
          {oldPrice && (
            <p className={styles.priceOld}>
              <span className={homeStyles.visuallyHidden}>старая цена</span>
              {`${oldPrice} `}&#8381;
              <span className={homeStyles.visuallyHidden}>
                {getProperCurrencyMode(oldPrice)}
              </span>
            </p>
          )}
        </div>
        <button
          type='button'
          className={`${styles.productCardBtn} ${homeStyles.btn} ${homeStyles.btnInverted}`}
          onClick={(evt) => buyBtnClickHandler(evt)}
          aria-label={`Купить ${productName} за ${price} ${getProperCurrencyMode(
            price
          )}`}
        >
          Купить
        </button>
      </div>
    </article>
  );
}
