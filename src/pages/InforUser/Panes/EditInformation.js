import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { camera } from '#/assets/svg/IconSvg';

export default function EditInformation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="tab-pane">
      <div className="CreateAdmin d-flex justify-content-center">
        <form style={{ width: '70%' }} onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="input-admin">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatar">{camera}</label>
                <input type="file" name="" id="avatar" hidden />
              </div>

              <img src="/assets/img/icon-img/logo.jpg" className="img-update" height="150px" width="250px" alt="" />
              <br />
              <span>hi</span>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Họ người dùng</label>
            <input
              type="text"
              {...register('firstName', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
              })}
            />
            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Tên người dùng</label>
            <input
              type="text"
              {...register('lastName', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
              })}
            />
            {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Giới tính</label>
            <input
              type="text"
              placeholder="Nam hoặc Nữ"
              {...register('male', {
                required: 'Không được bỏ trống!',
                validate: (value) => value === 'Nam' || value === 'Nữ' || 'Nam hoặc Nữ',
              })}
            />
            {errors.male && <span className="text-danger">{errors.male.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              {...register('address', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 500, message: 'Vượt quá ký tự cho phép' },
              })}
            />
            {errors.address && <span className="text-danger">{errors.address.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Điện thoại</label>
            <input
              type="number"
              {...register('phone', {
                required: 'Không được bỏ trống!',
              })}
            />
            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
          </div>
          <div className="btn_submit" style={{ width: '50%' }}>
            <input type="submit" value="Sửa user" style={{ cursor: 'pointer' }} />
          </div>
        </form>
      </div>
    </div>
  );
}
