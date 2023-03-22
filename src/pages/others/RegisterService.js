import SectionTitle from '#/components/section-title/SectionTitle';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Fragment } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { useForm } from 'react-hook-form';
import { MetaTags } from 'react-meta-tags';
import { useLocation } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import Select from 'react-select';
import { useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
const data = [
  { value: 1, label: 'gà' },
  { value: 2, label: 'chó' },
  { value: 3, label: 'bò' },
];
function RegisterService({ strings }) {
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [serviceDefault, setServiceDefault] = useState(null);
  const [date, setDate] = useState(new Date());
  return (
    <Fragment>
      <MetaTags>
        <title>{strings['register_service']}</title>
        <meta name="description" content="register service of store" />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{strings['register_service']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="contact-area pt-50 pb-100">
          <div className="container">
            <div className="register-border">
              <div className="register-title">
                <SectionTitle titleText={strings['register_service']} positionClass="text-center" />
              </div>
              <div className="form">
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                  <div className="input-admin">
                    <label htmlFor="">{strings['your_name']}</label>
                    <input
                      type="text"
                      {...register('name', {
                        required: strings['put_something_here'],
                        maxLength: {
                          value: 255,
                          message: strings['over_char_to_permitted'],
                        },
                      })}
                    />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                  </div>
                  <div className="input-admin">
                    <label htmlFor="">{strings['phone_number']}</label>
                    <input
                      type="text"
                      {...register('phone', {
                        required: strings['put_something_here'],
                        pattern: {
                          value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                          message: strings['not_valid_phone'],
                        },
                      })}
                    />
                    {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                  </div>
                  <div className="input-admin">
                    <label htmlFor="">Email:</label>
                    <input
                      type="text"
                      {...register('email', {
                        required: strings['put_something_here'],
                        pattern: {
                          value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                          message: strings['invalid_email'],
                        },
                      })}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                  </div>
                  <div className="input-admin">
                    <label htmlFor="">{strings['address']}</label>
                    <input
                      type="text"
                      {...register('address', {
                        required: strings['put_something_here'],
                        maxLength: {
                          value: 255,
                          message: strings['over_char_to_permitted'],
                        },
                      })}
                    />
                    {errors.address && <span className="text-danger">{errors.address.message}</span>}
                  </div>
                  <div className="wrapper-input row">
                    <div className="input-admin col-lg-6 col-md-12">
                      <label htmlFor="">{strings['type_service']}</label>
                      {/* {serviceDefault !== null ? (
                      <Select
                        closeMenuOnSelect={false}
                        defaultValue={serviceDefault}
                        // onChange={onchangeTypeService}
                        options={data}
                      />
                    ) : (
                      ''
                    )} */}
                      <Select
                        closeMenuOnSelect={false}
                        // onChange={onchangeTypePet}
                        defaultValue={[{ value: 'chó', label: 'chó' }]}
                        options={[{ value: 'chó', label: 'chó' }]}
                      />
                    </div>
                    <div className="input-admin col-lg-6 col-md-12">
                      <label htmlFor="">{strings['type_pet']}</label>
                      <Select
                        closeMenuOnSelect={false}
                        // onChange={onchangeTypePet}
                        defaultValue={[{ value: 'chó', label: 'chó' }]}
                        options={[{ value: 'chó', label: 'chó' }]}
                      />
                    </div>
                  </div>
                  <div className="wrapper-input row">
                    <div className="input-admin col-lg-6 col-md-12">
                      <label htmlFor="">{strings['type_weight']}</label>
                      <Select
                        closeMenuOnSelect={false}
                        // onChange={onchangeWeight}
                        defaultValue={[{ value: 1, label: '15kg - 20kg' }]}
                        options={[{ value: 1, label: '15kg - 20kg' }]}
                      />
                    </div>
                    <div className="input-admin col-lg-6 col-md-12">
                      <label htmlFor="">{strings['date_book']}</label>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label=""
                          inputFormat="MM/dd/yyyy"
                          minDate={new Date().setDate(new Date().getDate() + 1)}
                          value={date}
                          onChange={(e) => setDate(e)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="input-admin">
                    <label htmlFor="">{strings['note']}</label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder={strings['note_for_service']}
                      {...register('note', {
                        required: strings['put_something_here'],
                        maxLength: {
                          value: 500,
                          message: strings['over_char_to_permitted'],
                        },
                      })}
                    ></textarea>
                    {errors.note && <span className="text-danger">{errors.note.message}</span>}
                  </div>
                  <div className="input-admin" style={{ marginTop: '20px' }}>
                    <button className="btn-service" type="submit">
                      GỬI YÊU CẦU
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}

RegisterService.prototype = {
  strings: PropTypes.object,
};

export default multilanguage(RegisterService);
