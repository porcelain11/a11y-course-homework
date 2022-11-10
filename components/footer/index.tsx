import React, { useState, useEffect, useRef } from 'react';
import SuccessMessage from '../success-message';
import ErrorMessage from '../error-message';
import { useFormik } from 'formik';
import { basicSchema } from '../../schemas/index';
import homeStyles from '../../styles/Home.module.css';
import styles from './Footer.module.css';

export default function Footer() {
  const [isFormSent, setIsFormSent] = useState(false);
  const consentRef = useRef<HTMLInputElement>(null);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      consent: false,
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      actions.setSubmitting(false);
      actions.resetForm();
      if (consentRef.current) {
        consentRef.current.checked = !consentRef.current.checked;
      }
      setIsFormSent(true);
    },
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isFormSent) {
      timer = setTimeout(() => {
        setIsFormSent(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isFormSent]);

  return (
    <footer className={styles.footer} role='contentinfo'>
      <section
        className={styles.footerGroup}
        aria-labelledby='socialsHeading'
        role='region'
      >
        <h3 className={styles.footerTitle} id='socialsHeading'>
          Соц. сети
        </h3>
        <ul className={styles.socialsList}>
          <li className={styles.socialItem}>
            <a href='/' className={styles.socialItemLink}>
              <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='#121212'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M19.8824 0C30.8631 0 39.7647 8.90163 39.7647 19.8824C39.7647 30.8631 30.8631 39.7647 19.8824 39.7647C8.90163 39.7647 0 30.8631 0 19.8824C0 8.90163 8.90163 0 19.8824 0ZM23.1232 21.2084C22.9779 21.073 22.8907 21.0712 22.7429 21.2039C22.3074 21.5947 21.8574 21.9698 21.4113 22.3491C20.3566 23.2458 18.9125 23.2364 17.8755 22.3331C17.4341 21.9485 16.98 21.5778 16.5403 21.1914C16.4169 21.0831 16.3413 21.0801 16.2174 21.1945C14.0663 23.1782 11.9107 25.1571 9.75779 27.1389C9.70396 27.1884 9.61223 27.2235 9.63664 27.3382H29.6671C29.6503 27.2231 29.5792 27.188 29.5278 27.1404L27.5933 25.3535C26.1018 23.9733 24.6093 22.5943 23.1232 21.2084ZM31.2595 13.9816C31.174 13.9436 31.1199 14.0441 31.0614 14.0942C28.8627 15.9762 26.6675 17.862 24.4635 19.7379C24.2777 19.896 24.3008 19.9725 24.4615 20.1199C25.8921 21.4331 27.3161 22.7534 28.7425 24.0711C29.4944 24.7658 30.2497 25.4571 30.9986 26.1551C31.1387 26.2859 31.204 26.2762 31.254 26.0892C31.3049 25.8989 31.3087 25.7069 31.3087 25.5137L31.3085 17.0903L31.3069 14.2019C31.3069 14.1259 31.3431 14.0189 31.2595 13.9816ZM8.07296 13.9831L8.03379 13.9953C7.90595 14.0629 7.96805 14.3196 7.96785 14.4943C7.96588 16.3229 7.96667 18.1517 7.96667 19.9803C7.96667 21.7365 7.96519 23.4924 7.96834 25.2485C7.96874 25.4818 7.9834 25.716 8.00997 25.9475C8.02198 26.0526 8.02159 26.2021 8.1393 26.237C8.23053 26.2639 8.29716 26.1399 8.36714 26.0756C10.5324 24.0852 12.695 22.0921 14.8638 20.1056C15.0151 19.967 15.0287 19.8934 14.8659 19.7549C12.7171 17.9277 10.5742 16.0934 8.42629 14.265C8.30091 14.1582 8.16371 13.9264 8.03379 13.9953L8.07296 13.9831ZM19.6418 12.4265L9.8057 12.4271C9.63416 12.4271 9.46124 12.4244 9.295 12.479C9.23536 12.4986 9.15062 12.4948 9.13704 12.5688C9.12582 12.6295 9.19855 12.6574 9.24038 12.6934C9.54253 12.9531 9.84566 13.2118 10.1484 13.4707C13.077 15.9757 16.0046 18.4815 18.9349 20.9845C19.4994 21.4666 19.8276 21.4548 20.3897 20.973C23.3834 18.4067 26.3788 15.8421 29.3735 13.2768C29.6429 13.0459 29.9106 12.813 30.1927 12.5694C29.952 12.4197 29.7128 12.4274 29.478 12.4274C22.9206 12.4262 16.3631 12.4263 9.8057 12.4271L19.6418 12.4265Z'
                />
              </svg>
              <span className={homeStyles.visuallyHidden}>Почта</span>
            </a>
          </li>
          <li className={styles.socialItem}>
            <a href='/' className={styles.socialItemLink}>
              <svg
                width='41'
                height='40'
                viewBox='0 0 41 40'
                fill='#121212'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M20.5 0C31.4807 0 40.3824 8.90163 40.3824 19.8824C40.3824 30.8631 31.4807 39.7647 20.5 39.7647C9.51931 39.7647 0.617676 30.8631 0.617676 19.8824C0.617676 8.90163 9.51931 0 20.5 0ZM30.1823 10.6687C29.9845 10.6973 29.7364 10.6954 29.5169 10.7724C29.2521 10.8654 28.9904 10.9671 28.7298 11.0719L27.9495 11.3898C27.6644 11.5053 27.3844 11.6329 27.0993 11.7484C26.5572 11.9682 26.0123 12.1816 25.47 12.401C25.179 12.5188 24.8914 12.6455 24.6012 12.7653C24.0715 12.9841 23.5405 13.1995 23.011 13.4188C22.7264 13.5367 22.4457 13.6639 22.1602 13.7795C21.7465 13.9471 21.3288 14.105 20.9151 14.2728C20.6184 14.3933 20.3273 14.5276 20.0305 14.6478L18.7173 15.1681C18.4436 15.279 18.1758 15.4043 17.9022 15.5155C17.3151 15.754 16.7256 15.9865 16.1379 16.2236C15.8919 16.3228 15.6491 16.4306 15.4027 16.5288C14.8363 16.7545 14.2683 16.976 13.7014 17.2005C13.3985 17.3204 13.096 17.4415 12.7943 17.5642C12.3806 17.7325 11.9677 17.9029 11.5546 18.0724C11.2701 18.1892 10.9862 18.3075 10.7009 18.4225C10.169 18.6368 9.63632 18.8491 9.1038 19.062C8.77812 19.1922 8.45082 19.319 8.12646 19.4525C7.6524 19.6475 7.17024 19.8298 6.77755 20.1718C6.60333 20.3235 6.4501 20.4963 6.42271 20.7345C6.39164 21.0045 6.60069 21.3623 6.87394 21.4742C7.16362 21.5928 7.46589 21.6826 7.76484 21.7785C8.52519 22.0222 9.28421 22.2703 10.0486 22.5011C10.5813 22.6619 11.1218 22.7977 11.6593 22.9432C12.1491 23.0757 12.6408 23.0936 13.144 23.0057C13.5643 22.9322 13.9416 22.7876 14.2935 22.5469C14.8388 22.1739 15.402 21.826 15.955 21.4636C16.5084 21.1008 17.0585 20.7333 17.6101 20.3678C18.0754 20.0593 18.5409 19.7513 19.0059 19.4425C19.4912 19.1201 19.977 18.7985 20.4606 18.4738C20.8359 18.2217 21.2065 17.9631 21.5821 17.7117C22.196 17.3007 22.8057 16.8828 23.4299 16.4875C23.8759 16.2051 24.3217 15.9182 24.8534 15.7937C25.002 15.7588 25.1552 15.7452 25.2173 15.8519C25.2768 15.9542 25.2832 16.1396 25.2271 16.2436C25.0751 16.5248 24.9099 16.812 24.6914 17.043C24.1984 17.5644 23.6748 18.058 23.155 18.5542C22.5124 19.1674 21.8638 19.7747 21.2128 20.3793C20.3373 21.1925 19.4545 21.9981 18.5799 22.8124C18.2251 23.1427 17.8558 23.4641 17.545 23.8321C17.2897 24.1343 17.2293 24.5038 17.4133 24.8945C17.5382 25.1601 17.729 25.3617 17.9518 25.5337C18.456 25.923 18.9708 26.2994 19.4851 26.676C19.7569 26.875 20.0333 27.0684 20.3137 27.2557C20.8077 27.5857 21.3055 27.9102 21.8032 28.235L23.2383 29.1661C23.6422 29.4298 24.0377 29.7067 24.4484 29.9597C24.817 30.1868 25.1899 30.4129 25.582 30.5953C25.9022 30.7442 26.2536 30.8279 26.591 30.9409C27.0096 31.0812 27.4286 31.0742 27.8142 30.8647C28.2771 30.6132 28.5175 30.1753 28.6368 29.6922C28.75 29.2333 28.7991 28.759 28.8733 28.2912C28.9099 28.0601 28.9351 27.8275 28.9731 27.5967C29.0599 27.0706 29.1523 26.5456 29.2403 26.0197L29.33 25.4321C29.3952 25.0486 29.4698 24.6665 29.5298 24.2823C29.5927 23.8791 29.6355 23.4729 29.7008 23.07C29.8149 22.3658 29.9414 21.6634 30.0586 20.9597C30.096 20.7347 30.1141 20.5066 30.1513 20.2816C30.2376 19.7613 30.3348 19.2426 30.4184 18.7219C30.4812 18.3311 30.5255 17.9377 30.5855 17.5463C30.6761 16.9541 30.7742 16.3629 30.8669 15.7709C30.9226 15.4151 30.9737 15.0585 31.0274 14.7024C31.1204 14.0858 31.2172 13.4696 31.3058 12.8524C31.3451 12.5788 31.3608 12.3021 31.4008 12.0287C31.4487 11.7018 31.3809 11.3955 31.2156 11.1198C30.9953 10.7521 30.6156 10.688 30.1823 10.6687Z'
                />
              </svg>
              <span className={homeStyles.visuallyHidden}>Телеграм</span>
            </a>
          </li>
          <li className={styles.socialItem}>
            <a href='/' className={styles.socialItemLink}>
              <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='#121212'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M20.1176 0C31.0984 0 40 8.90163 40 19.8824C40 30.8631 31.0984 39.7647 20.1176 39.7647C9.13692 39.7647 0.235291 30.8631 0.235291 19.8824C0.235291 8.90163 9.13692 0 20.1176 0ZM23.0914 7.75896C19.4413 7.75896 16.9426 9.92833 16.9426 13.9124V17.3455H12.8142V22.0006H16.9426V33.9456H21.8793V22.0006H25.997L26.6135 17.3455H21.8793V14.3733C21.8793 13.0255 22.2638 12.107 24.2487 12.107L26.7803 12.1061V7.9425C26.3423 7.88575 24.8396 7.75896 23.0914 7.75896Z'
                />
              </svg>
              <span className={homeStyles.visuallyHidden}>Фейсбук</span>
            </a>
          </li>
        </ul>
      </section>
      <section
        className={styles.footerGroup}
        aria-labelledby='subscribe'
        role='region'
      >
        <h3 className={styles.footerTitle} id='subscribe'>
          Подписка на новости
        </h3>

        <form
          className={styles.subscribeForm}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.subscribeFormFieldsGroup}>
            <label className={styles.emailLabel}>
              {' '}
              <span>E-mail</span>
              <input
                id='email'
                className={`${styles.subsribe} ${
                  errors.email && touched.email
                    ? `${homeStyles.errorField}`
                    : ''
                }`}
                type='email'
                name='email'
                aria-invalid={errors.email && touched.email ? true : false}
                aria-required={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>
            <label className={styles.consentLabel}>
              <input
                id='consent'
                type='checkbox'
                name='consent'
                onChange={handleChange}
                onBlur={handleBlur}
                ref={consentRef}
                // value={values.consent}
                aria-invalid={errors.consent && touched.consent ? true : false}
                aria-checked={values.consent === true}
                aria-required={true}
              />
              <span>Согласен на обработку персональх данных</span>
            </label>
          </div>

          {errors.email && touched.email && (
            <div className={styles.subscribeFormErrorMessage}>
              <ErrorMessage>{errors.email}</ErrorMessage>
            </div>
          )}

          {errors.consent && touched.consent && (
            <div className={styles.subscribeFormErrorMessage}>
              <ErrorMessage>{errors.consent}</ErrorMessage>
            </div>
          )}

          {isFormSent && (
            <div className={styles.subscribeFormSuccessMessage}>
              <SuccessMessage>
                Форма отправлена, спасибо, что подписались на нашу рассылку!
              </SuccessMessage>
            </div>
          )}

          <button
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className={`${styles.subscribeFormBtn} ${homeStyles.btn} ${homeStyles.btnInverted}`}
            type='submit'
          >
            Подписаться
          </button>
        </form>
      </section>
    </footer>
  );
}
