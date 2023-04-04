import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { camera } from '#/assets/svg/IconSvg';
import { multilanguage } from 'redux-multilanguage';
import { storage } from '#/helper/firebase';
import axiosClient from '#/helper/axiosClient';
import { useToasts } from 'react-toast-notifications';

function EditInformation({ strings, user }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState(null);
  const [male, setMale] = useState(null);
  useEffect(() => {
    setUserData(user);
    setState({
      ...state,
      imgId: user?.avatar,
    });

    if (user) {
      setMale(user?.male);
      reset({
        address: user?.address,
        phone: user?.phone,
        firstName: user?.firstName,
        lastName: user?.lastName,
        male: user?.male,
      });
      setState({
        ...state,
        imgId: user?.avatar,
      });
    }
  }, [user]);
  const [state, setState] = useState({
    linkImg: '',
    nameImg: '',
    img: '',
    imgId: '',
  });
  const { linkImg, nameImg, img, imgId } = state;
  console.log('user:::::', userData);
  const hangdelimage = (e) => {
    console.log('hello');
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const changeRadio = (e) => {
    setUserData({ ...userData, male: +e.target.value });
    setMale(+e.target.value);
  };
  const { addToast } = useToasts();
  const onSubmit = async (data) => {
    if (user) {
      if (img !== '') {
        await storage.ref(`imagesUser/${img.name}`).put(img);
        const anh = await storage.ref('imagesUser').child(img.name).getDownloadURL();
        await axiosClient
          .put('/users/me', {
            avatar: anh,
            address: data.address,
            phone: data.phone,
            male: male,
            firstName: data.firstName,
            lastName: data.lastName,
          })
          .then((ok) => {
            addToast('Cập nhật thông tin thành công!', { appearance: 'success', autoDismiss: true });
            window.location.reload();
          });
      } else {
        await axiosClient
          .put('/users/me', {
            address: data.address,
            phone: data.phone,
            male: male,
            firstName: data.firstName,
            lastName: data.lastName,
          })
          .then((ok) => {
            addToast('Cập nhật thông tin thành công!', { appearance: 'success', autoDismiss: true });
            window.location.reload();
          });
      }
    }
  };
  return (
    <div className="tab-pane">
      <div className="CreateAdmin d-flex justify-content-center">
        <form style={{ width: '70%' }} onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">{strings['avatar']}</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatar">{camera}</label>
                <input type="file" name="" id="avatar" hidden onChange={hangdelimage} />
              </div>

              {linkImg ? (
                <img src={linkImg} className="img-update" height="150px" alt="" />
              ) : imgId ? (
                <img src={imgId} className="img-update" height="150px" alt="" />
              ) : (
                ''
              )}
              <br />
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">{strings['firstName']}</label>
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
            <label htmlFor="">{strings['lastName']}</label>
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
            <label htmlFor="">{strings['gender']}</label>
            <div className="d-flex">
              <input
                type="radio"
                className="input-radio"
                value={1}
                checked={male === 1}
                onClick={(e) => changeRadio(e)}
              />
              <label>{strings['male']}</label>
              <input
                type="radio"
                className="input-radio"
                value={0}
                checked={male === 0}
                onClick={(e) => changeRadio(e)}
              />
              <label>{strings['female']}</label>
              <input
                type="radio"
                className="input-radio"
                value={2}
                checked={male === 2}
                onClick={(e) => changeRadio(e)}
              />
              <label>{strings['different']}</label>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">{strings['address']}</label>
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
            <label htmlFor="">{strings['phone']}</label>
            <input
              type="number"
              {...register('phone', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 10, message: 'điện thoại không đúng định dạng' },
                minLength: { value: 10, message: 'điện thoại không đúng định dạng' },
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

export default multilanguage(EditInformation);
