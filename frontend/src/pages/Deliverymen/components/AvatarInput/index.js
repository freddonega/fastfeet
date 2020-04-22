import React, { useRef, useEffect, useState } from 'react';
import { MdInsertPhoto } from 'react-icons/md';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, Content } from './styles';
import ProfileAvatar from '~/components/ProfileAvatar';

export default function AvatarInput({ reactAvatar, previewUrl }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
        clearValue() {
          return true;
        },
        setValue() {
          return true;
        },
      });
    }
    setPreview(previewUrl);
  }, [ref, registerField, previewUrl]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="avatar">
        {(preview && <img src={preview} alt="" />) ||
          (!reactAvatar && (
            <Content>
              <MdInsertPhoto size={40} />
              Adicionar foto
            </Content>
          )) || (
            <ProfileAvatar size={150} ratio={2} name={reactAvatar} url="" />
          )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  reactAvatar: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,

  previewUrl: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

AvatarInput.defaultProps = {
  previewUrl: false,
};
