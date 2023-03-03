import JoditEditor from 'jodit-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { camera } from '#/assets/svg/IconSvg';
// import Mutil from '../Multi/Mutil';

export default function CreatePet() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [text, setText] = useState(null);

  const dataType = [
    { value: 'chó', label: 'chó' },
    { value: 'mèo', label: 'mèo' },
    { value: 'khác', label: 'khác' },
  ];
  return (
    <div className="tab-pane">
      <div className="CreateAdmin">
        <form>
          <div className="input-admin">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatarPet">{camera}</label>
                <input type="file" name="" id="avatarPet" hidden />
              </div>
              <br />
              <span>ịij</span>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Ảnh liên quan</label>
            {/* <Mutil mutilImg={hangdleMutilImg} /> */}
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
                rows="5"
                {...register('description', {
                  required: 'Không được bỏ trống!',
                  maxLength: { value: 1000, message: 'Vượt quá ký tự cho phép' },
                })}
              ></textarea>

              {errors.description && <span className="text-danger">{errors.description.message}</span>}
            </div>
            <div className="col-4 input-admin">
              <label htmlFor="">Loại thú cưng</label>
              <Select closeMenuOnSelect={false} options={dataType} />
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Điểm nổi bật</label>
            <JoditEditor value={text} tabIndex={1} onChange={(e) => setText(e)} />
          </div>
          <div className="col-md-4 col-sm-12 btn_submit">
            <input type="submit" value="Hoàn thành" style={{ cursor: 'pointer' }} />
          </div>
        </form>
      </div>
    </div>
  );
}
