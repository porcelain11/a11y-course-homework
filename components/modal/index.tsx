import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import SuccessMessage from '../success-message';
import ErrorMessage from '../error-message';
import { orderSchema } from '../../schemas/index';
import FocusTrap from 'focus-trap-react';
import homeStyles from '../../styles/Home.module.css';
import styles from './Modal.module.css';

type ModalProps = {
  isShown: boolean;
  handleClose: () => void;
  product: {
    productName: string;
  };
};

function Modal(props: ModalProps) {
  const [isSubmitFailed, setIsSubmitFailed] = useState(false);
  const { isShown, handleClose, product } = props;
  const [isFormSent, setIsFormSent] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const adressRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleEscapeClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleReset(evt);
        handleClose();
      }

      return;
    };
    document.body.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.body.removeEventListener('keydown', handleEscapeClose);
    };
  }, [handleClose]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isFormSent) {
      timer = setTimeout(() => {
        setIsFormSent(false);
        handleClose();
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isFormSent]);

  useEffect(() => {
    if (isShown && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isShown]);

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = isShown ? 'hidden' : 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isShown]);

  useEffect(() => {
    let timer2: ReturnType<typeof setTimeout>;
    if (isSubmitFailed) {
      timer2 = setTimeout(() => {
        setIsSubmitFailed(false);
      }, 4000);
    }
    return () => {
      clearTimeout(timer2);
    };
  }, [isSubmitFailed]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleReset,
  } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      adress: '',
      pay: 'card',
    },
    validationSchema: orderSchema,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      actions.setSubmitting(false);
      actions.resetForm();
      setIsFormSent(true);
    },
  });

  const handleModalClose = (evt: React.KeyboardEvent | React.MouseEvent) => {
    handleReset(evt);
    handleClose();
  };

  if (!product || !isShown) {
    return null;
  }

  const { productName } = product;

  return (
    <FocusTrap active={isShown}>
      <div className={styles.modal}>
        <div
          className={styles.modalContent}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modalHeading modalSubHeading'
        >
          <button
            ref={closeBtnRef}
            onClick={(evt) => handleModalClose(evt)}
            className={styles.modalCloseBtn}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='15px'
              height='15px'
              viewBox='0 0 15 15'
              version='1.1'
              id='cross'
            >
              <path
                d='M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#10;&#9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#10;&#9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#10;&#9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#10;&#9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z'
              />
            </svg>
            <span className={homeStyles.visuallyHidden}>??????????????</span>
          </button>
          <h2 className={styles.modalHeading} id='modalHeading'>
            {productName}
          </h2>
          <p className={styles.modalText} id='modalSubHeading'>
            ???????????????????? ????????????
          </p>

          <form className={styles.modalForm} onSubmit={handleSubmit} noValidate>
            <span className={styles.clue}>
              ?????? ???????? ?????????????????????? ?????? ????????????????????*
            </span>
            <fieldset>
              <legend>?????? ?? ??????????????</legend>
              <input
                ref={fullnameRef}
                id='fullname'
                type='text'
                name='fullname'
                className={`${styles.modalFormInput} ${
                  errors.fullname && touched.fullname
                    ? `${styles.errorField}`
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullname}
                aria-invalid={
                  errors.fullname && touched.fullname ? true : false
                }
                aria-required={true}
              />
              {errors.fullname && touched.fullname && (
                <div className={styles.errorMessage}>
                  <ErrorMessage>
                    ?????? ?? ?????????????? ???????????? ?????????????????? ???????? ???? ???? ???????????? ??????????????
                  </ErrorMessage>
                </div>
              )}
              {errors.fullname &&
                document.activeElement === fullnameRef.current && (
                  <div className={homeStyles.visuallyHidden}>
                    <ErrorMessage>
                      ?????? ?? ?????????????? ???????????? ?????????????????? ???????? ???? ???? ???????????? ??????????????
                    </ErrorMessage>
                  </div>
                )}
            </fieldset>
            <fieldset>
              <legend>E-mail</legend>
              <input
                ref={emailRef}
                id='email'
                type='email'
                name='email'
                className={`${styles.modalFormInput} ${
                  errors.email && touched.email ? `${styles.errorField}` : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                aria-invalid={errors.email && touched.email ? true : false}
                aria-required={true}
              />
              {errors.email && touched.email && (
                <div className={styles.errorMessage}>
                  <ErrorMessage>
                    ???????????????????? ???????????? ???????????????????? e-mail, ????????????:
                    ivan.ivanov@mail.ru
                  </ErrorMessage>
                </div>
              )}
              {errors.email && document.activeElement === emailRef.current && (
                <div className={homeStyles.visuallyHidden}>
                  <ErrorMessage>
                    ???????????????????? ???????????? ???????????????????? e-mail, ????????????:
                    ivan.ivanov@mail.ru
                  </ErrorMessage>
                </div>
              )}
            </fieldset>
            <fieldset>
              <legend>?????????? ????????????????</legend>
              <span className={styles.clue}>
                ?????????????? ???????????? ???????????????? ?????????? ?? ????????????????
              </span>
              <textarea
                ref={adressRef}
                id='adress'
                name='adress'
                rows={5}
                className={`${styles.modalFormInput} ${
                  errors.adress && touched.adress ? `${styles.errorField}` : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.adress}
                aria-invalid={errors.adress && touched.adress ? true : false}
                aria-required={true}
              />
              {errors.adress && touched.adress && (
                <div className={styles.errorMessage}>
                  <ErrorMessage>
                    ?????????????? ???????????? ???????????????? ?????????? ?? ????????????????, ?????????? ??????????
                    ?????????????????? ???????????? ??????????, ??????????, ?????????????? ?? ??????????????
                  </ErrorMessage>
                </div>
              )}
              {errors.adress && document.activeElement === adressRef.current && (
                <div className={homeStyles.visuallyHidden}>
                  <ErrorMessage>
                    ?????????????? ???????????? ???????????????? ?????????? ?? ????????????????, ?????????? ??????????
                    ?????????????????? ???????????? ??????????, ??????????, ?????????????? ?? ??????????????
                  </ErrorMessage>
                </div>
              )}
            </fieldset>
            <fieldset>
              <legend className={styles.legendPay}>???????????? ????????????</legend>
              <div className={styles.modalFormInputGroup}>
                <label className={styles.modalFormLabel}>
                  <input
                    id='pay-1'
                    type='radio'
                    name='pay'
                    value='card'
                    onChange={handleChange}
                    checked
                    aria-checked={values.pay === 'card'}
                  />{' '}
                  ????????????
                </label>
                <label className={styles.modalFormLabel}>
                  <input
                    id='pay-2'
                    type='radio'
                    name='pay'
                    value='cash'
                    onChange={handleChange}
                    aria-checked={values.pay === 'cash'}
                  />{' '}
                  ??????????????????
                </label>
              </div>
            </fieldset>
            <button
              aria-disabled={isSubmitting}
              disabled={isSubmitting}
              className={`${homeStyles.btn} ${homeStyles.btnInverted} ${styles.modalSubmitBtn}`}
              type='submit'
              onClick={() => {
                if (
                  errors.adress ||
                  errors.email ||
                  errors.fullname ||
                  errors.pay
                ) {
                  setIsSubmitFailed(true);
                }
              }}
            >
              ??????????????????
            </button>
          </form>
          {isSubmitFailed && (
            <div className={styles.subscribeFormSuccessMessage}>
              <div
                className={homeStyles.visuallyHidden}
                role='status'
                aria-live='polite'
              >
                ?????????? ???? ????????????????????, ???? ?????? ???????? ??????????????????
              </div>
            </div>
          )}
          {isFormSent && (
            <div className={styles.successMessage}>
              <SuccessMessage>
                ?????????? ????????????????????, ?????????????? ???? ??????????!
              </SuccessMessage>
            </div>
          )}
        </div>
      </div>
    </FocusTrap>
  );
}

export default Modal;
