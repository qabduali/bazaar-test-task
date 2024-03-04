import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IAd } from '../../consts/types';
import classes from './index.module.scss';
import AdCarousel from '../carousel';

interface AdDetailsProps {
  ad: IAd;
  isLiked: boolean;
}

const AdDetails: React.FC<AdDetailsProps> = ({ ad, isLiked }) => {
  const handleLikeClick = () => {};

  return (
    <Box className={classes.adDetails}>
      <div className={classes.carouselWrapper}>
        <AdCarousel images={ad.images} />
      </div>
      <div className={classes.content}>
        <Typography variant="h4" gutterBottom>
          {ad.title}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleLikeClick}
          className={classes.adCard__like}
          size="small"
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
        <div className={classes.location}>
          <Typography variant="body1">{ad.city_name}</Typography>
          <Typography variant="body1">{ad.district_name}</Typography>
        </div>
        <Typography variant="body1">Price: {ad.price}</Typography>
        <div className={classes.description}>
          <Typography variant="body1">{ad.description}</Typography>
        </div>
      </div>
    </Box>
  );
};

export default AdDetails;
