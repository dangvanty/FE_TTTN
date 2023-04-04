import JoditEditor from 'jodit-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { camera } from '#/assets/svg/IconSvg';
import Mutil from '../Multi/Mutil';
import { dataTypePet } from '#/constants/constants';
import axiosClient from '#/helper/axiosClient';
import { useToasts } from 'react-toast-notifications';
import { storage } from '#/helper/firebase';
import { useNavigate } from 'react-router-dom';
// import Mutil from '../Multi/Mutil';
const initState = {
  linkImgPet: '',
  nameImgPet: '',
  imgPet: '',
  imgIdPet: '',
  mutilImgPet: '',
  userId: '',
  load: false,
  type: 'khác',
};
export default function CreatePet() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [state, setState] = useState(initState);
  const { linkImgPet, nameImgPet, mutilImgPet, imgPet, imgIdPet, userId, type, load } = state;
  const [text, setText] = useState(null);
  const hangdleMutilImg = (e) => {
    setState({ ...state, mutilImgPet: e });
  };
  useEffect(() => {
    axiosClient
      .get('/users/me')
      .then((res) => {
        setState({ ...state, userId: res.user.id });
      })
      .catch((error) => console.log(error));
  }, []);

  const hangdelimagePet = (e) => {
    setState({
      ...state,
      linkImgPet: URL.createObjectURL(e.target.files[0]),
      nameImgPet: e.target.files[0].name,
      imgPet: e.target.files[0],
    });
  };

  const onchangeType = (e) => {
    setState({ ...state, type: e.value });
  };

  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    setState({ ...state, load: !load });
    addToast('Vui lòng đợi!', {
      appearance: 'info',
      autoDismiss: false,
    });
    await storage.ref(`imagesPet/${imgPet.name}`).put(imgPet);
    const anh = await storage.ref('imagesPet').child(imgPet.name).getDownloadURL();
    var imgpet = [];
    for (let i = 0; i < mutilImgPet.length; i++) {
      await storage.ref(`imagesPet/${mutilImgPet[i].name}`).put(mutilImgPet[i]);
      var imgPets = await storage.ref('imagesPet').child(mutilImgPet[i].name).getDownloadURL();
      imgpet.push({ link: imgPets });
    }
    console.log('he', {
      name: data.name,
      price: data.price,
      description: data.description,
      text: text,
      avatar: anh,
      type: type,
      userId: userId,
      imgpet,
      status: 0,
    });
    axiosClient
      .post(`/pets`, {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        text: text,
        avatar: anh,
        type: type,
        userId: userId,
        imgpet,
        checkAdmin: 1,
        status: 0,
      })
      .then((ok) => {
        console.log(':::::ok', ok);
        addToast('Gửi yêu cầu bán thú thành công!', {
          appearance: 'success',
          autoDismiss: false,
        });
        window.location.reload();
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="tab-pane">
      <div className="CreateAdmin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatarPet">{camera}</label>
                <input type="file" name="" id="avatarPet" hidden onChange={hangdelimagePet} />
              </div>
              {linkImgPet ? (
                <img src={linkImgPet} className="img-update" height="150px" width="250px" alt="" />
              ) : imgIdPet ? (
                <img src={imgIdPet} className="img-update" height="150px" width="250px" alt="" />
              ) : (
                ''
              )}
              <br />
              <span>{nameImgPet}</span>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Ảnh liên quan</label>
            <Mutil mutilImg={hangdleMutilImg} />
          </div>
          <div className="input-admin">
            <label htmlFor="">Tiêu đề</label>
            <input
              type="text"
              {...register('name', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
              })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>
          <div className="row">
            <div className="col-6 input-admin">
              <label htmlFor="">Giá</label>
              <input
                type="number"
                {...register('price', {
                  required: 'Không được bỏ trống!',
                  maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
                })}
              />
              {errors.price && <span className="text-danger">{errors.price.message}</span>}
            </div>
            <div className="col-6 input-admin">
              <label htmlFor="">Số lượng</label>
              <input
                type="number"
                {...register('quantity', {
                  required: 'Không được bỏ trống!',
                  maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
                })}
              />
              {errors.quantity && <span className="text-danger">{errors.quantity.message}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-8 input-admin">
              <label htmlFor="">Mô tả</label>
              <textarea
                name=""
                id=""
                rows="2.5"
                style={{ resize: 'auto' }}
                {...register('description', {
                  required: 'Không được bỏ trống!',
                  maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
                })}
              ></textarea>

              {errors.description && <span className="text-danger">{errors.description.message}</span>}
            </div>
            <div className="col-4 input-admin">
              <label htmlFor="">Loại thú cưng</label>
              <Select closeMenuOnSelect={false} options={dataTypePet} onChange={onchangeType} />
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Điểm nổi bật</label>
            <JoditEditor tabIndex={1} onChange={(e) => setText(e)} />
          </div>
          <div className="col-md-4 col-sm-12 btn_submit">
            <input type="submit" disabled={load} value="Hoàn thành" style={{ cursor: 'pointer' }} />
          </div>
        </form>
      </div>
    </div>
  );
}
