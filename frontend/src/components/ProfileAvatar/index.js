import React from 'react';
import PropTypes from 'prop-types';
import Avatar, { getRandomColor } from 'react-avatar';
import { darken } from 'polished';

// import { Container } from './styles';

export default function ProfileAvatar({ name, url, size, ratio }) {
  const avatarBackgroundColors = [
    '#F4EFFC',
    '#FCF4EE',
    '#EBFBFA',
    '#FFEEF1',
    '#F4F9EF',
    '#FCFCEF',
  ];

  const avatarTextColors = avatarBackgroundColors.map((avatar) =>
    darken(0.4, avatar)
  );
  return (
    <Avatar
      className={url && 'hasBg'}
      src={url}
      name={name}
      facebook-id="invalidfacebookusername"
      size={size}
      color={getRandomColor(name, avatarBackgroundColors)}
      fgColor={getRandomColor(name, avatarTextColors)}
      textSizeRatio={ratio}
      style={{
        marginRight: '10px',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
      }}
      round
    />
  );
}

ProfileAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
  ratio: PropTypes.number,
};

ProfileAvatar.defaultProps = {
  size: 35,
  ratio: 0,
};
